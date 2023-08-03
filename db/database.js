import SQ from "sequelize";
import { config } from "../config.js";
import mysql from "mysql2";

const { host, user, database, password } = config.db;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

const pool = mysql.createPool({
  host,
  user,
  database,
  password,
});

export const db = pool.promise();
