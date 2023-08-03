import SQ from "sequelize";
import { sequelize } from "../db/database.js";

const DataTypes = SQ.DataTypes;

export const Categories = sequelize.define(
  "categories",
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: SQ.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: SQ.NOW,
      onUpdate: SQ.NOW,
    },
  },
  {
    timestamps: true,
  }
);

export async function getCategoryByName(categoryName) {
  return Categories.findOne({ where: { categoryName } });
}

export async function createCategory(categoryName) {
  return Categories.create(categoryName).then((data) => data.dataValues.id);
}
