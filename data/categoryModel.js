import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

export const Category = sequelize.define(
  "category",
  {
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
    timestamps: true,
  }
);

export async function getCategoryByName(categoryName) {
  return Category.findOne({ where: { categoryName } });
}

export async function createCategory(categoryName) {
  const newCategory = await Category.create({ categoryName });
  return { id: newCategory.dataValues.id, categoryName };
}
