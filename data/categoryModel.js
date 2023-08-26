import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

// Sequelize를 사용하여 카테고리 테이블의 스키마를 정의하고 테이블을 생성하고 MySQL 프로그램과 연결을 시켜줍니다.
// 이를 통해 sequelize의 메소드들을 사용하여 db에 CRUD를 할 수 있게 됩니다.
export const Category = sequelize.define(
  "category",
  {
    // 각 필드의 데이터 타입, 제약 조건 등을 설정합니다.
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true, // 이 속성은 createdAt과 updatedAt 타임스탬프를 자동으로 생성해줍니다.
  }
);

// 카테고리 이름을 기반으로 데이터베이스에서 카테고리를 검색하는 함수
// Sequelize의 findOne 메서드를 사용하여 검색합니다.
export async function getCategoryByName(categoryName) {
  return Category.findOne({ where: { categoryName } });
}

// 새 카테고리를 데이터베이스에 추가하는 함수
// 추가된 카테고리의 ID와 이름을 반환합니다.
export async function createCategory(categoryName) {
  const newCategory = await Category.create({ categoryName });
  return { id: newCategory.dataValues.id, categoryName };
}
