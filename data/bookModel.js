import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { Categories } from "./categoryModel.js";

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
        model: Categories,
        key: "id",
      },
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
