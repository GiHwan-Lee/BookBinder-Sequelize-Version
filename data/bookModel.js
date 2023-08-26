import SQ from "sequelize";
import { sequelize } from "../db/database.js";
// Category 모델을 불러와서 Book 모델과 연관 관계를 설정하기 위해 사용합니다.
import { Category } from "./categoryModel.js";

const DataTypes = SQ.DataTypes;

// Book 데이터 모델을 정의합니다.
export const Books = sequelize.define(
  "books",
  {
    // 각 필드의 데이터 타입, 제약 조건 등을 설정합니다.
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    bookTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    salesQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      // Category 모델을 참조하는 외래 키 설정
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: true, // createdAt과 updatedAt 필드를 자동으로 생성합니다.
  }
);

// 모든 책들의 목록과 전체 책 수를 가져오는 함수
export async function getAllBooks() {
  const { count, rows } = await Books.findAndCountAll();
  return {
    total: count,
    products: rows,
  };
}

// 새로운 책을 DB에 추가하는 함수
export async function createBook(bookData) {
  const newBook = await Books.create(bookData);
  return newBook.id;
}

// 주어진 카테고리 ID에 해당하는 책들의 목록과 총 수를 반환하는 함수
export async function getByCategory(categoryId) {
  const { count, rows } = await Books.findAndCountAll({
    where: { categoryId },
  });
  return {
    total: count,
    books: rows,
  };
}

// 특정 책 이름으로 해당 책의 정보를 가져오는 함수
export async function getByTitle(bookName) {
  return Books.findOne({ where: { bookTitle: bookName } });
}

// 주어진 출판사에 해당하는 책들의 목록과 총 수를 반환하는 함수
export async function getByPublisher(publisherName) {
  const { count, rows } = await Books.findAndCountAll({
    where: { publisher: publisherName },
  });
  return {
    total: count,
    books: rows,
  };
}

// 주어진 카테고리 ID에 해당하는 책들의 총 판매 수를 반환하는 함수
export async function getTotalSalesByCategoryId(categoryId) {
  const totalSales = await Books.sum("salesQuantity", {
    where: { categoryId },
  });
  return totalSales || null;
}

// 주어진 카테고리 ID에 해당하는 책들의 총 재고 수를 반환하는 함수
export async function getTotalStockByCategoryId(categoryId) {
  const totalStock = await Books.sum("productCount", {
    where: { categoryId },
  });
  return totalStock || null;
}

// 판매 수를 기준으로 상위 세 개의 책을 반환하는 함수
export async function getTopThree() {
  return Books.findAll({
    order: [["salesQuantity", "DESC"]],
    limit: 3,
  });
}

// 주어진 책 제목과 출판 연도에 해당하는 책의 판매 수를 업데이트하는 함수
export async function updateSalesQuantity(bookName, publicationYear, newSales) {
  const [affectedCount] = await Books.update(
    { salesQuantity: newSales },
    { where: { bookTitle: bookName, publicationYear } }
  );

  // 실제로 하나 이상의 행이 변경되었을 때만 true가 되어 return을 하도록 만들기 위해 생성한 코드
  // 즉 잘 수정이 되었을 때만 return이 된다.
  return affectedCount > 0;
}

// 주어진 책 제목과 출판 연도에 해당하는 책의 재고 수를 업데이트하는 함수
export async function updateProductCount(bookName, publicationYear, newStock) {
  const [affectedCount] = await Books.update(
    { productCount: newStock },
    { where: { bookTitle: bookName, publicationYear } }
  );
  return affectedCount > 0;
}

// 주어진 책 제목과 출판 연도에 해당하는 책을 DB에서 삭제하는 함수
export async function deleteBookByTitleAndYear(bookName, publicationYear) {
  const affectedCount = await Books.destroy({
    where: { bookTitle: bookName, publicationYear },
  });
  return affectedCount > 0;
}
