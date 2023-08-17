import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { Category } from "./categoryModel.js";

const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

export const Books = sequelize.define(
  "books",
  {
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
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export async function getAllBooks() {
  const { count, rows } = await Books.findAndCountAll();
  return {
    total: count,
    products: rows,
  };
}

export async function createBook(bookData) {
  const newBook = await Books.create(bookData);
  return newBook.id;
}

export async function getByCategory(categoryId) {
  const { count, rows } = await Books.findAndCountAll({
    where: { categoryId },
  });
  return {
    total: count,
    books: rows,
  };
}

export async function getByTitle(bookName) {
  return Books.findOne({ where: { bookTitle: bookName } });
}

export async function getByPublisher(publisherName) {
  const { count, rows } = await Books.findAndCountAll({
    where: { publisher: publisherName },
  });
  return {
    total: count,
    books: rows,
  };
}

export async function getTotalSalesByCategoryId(categoryId) {
  const totalSales = await Books.sum("salesQuantity", {
    where: { categoryId },
  });
  return totalSales || null;
}

export async function getTotalStockByCategoryId(categoryId) {
  const totalStock = await Books.sum("productCount", {
    where: { categoryId },
  });
  return totalStock || null;
}

export async function getTopThree() {
  return Books.findAll({
    order: [["salesQuantity", "DESC"]],
    limit: 3,
  });
}

export async function updateSalesQuantity(bookName, publicationYear, newSales) {
  const [affectedCount] = await Books.update(
    { salesQuantity: newSales },
    { where: { bookTitle: bookName, publicationYear } }
  );
  return affectedCount > 0;
}

export async function updateProductCount(bookName, publicationYear, newStock) {
  const [affectedCount] = await Books.update(
    { productCount: newStock },
    { where: { bookTitle: bookName, publicationYear } }
  );
  return affectedCount > 0;
}

export async function deleteBookByTitleAndYear(bookName, publicationYear) {
  const affectedCount = await Books.destroy({
    where: { bookTitle: bookName, publicationYear },
  });
  return affectedCount > 0;
}
