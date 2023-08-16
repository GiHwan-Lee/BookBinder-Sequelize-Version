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
