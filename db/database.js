import { Sequelize } from "sequelize";
import { config } from "../config.js";

// Sequelize 인스턴스 생성(Mysql과는 달리 sequelize는 pool을 자동으로 생성해주기에 따로 pool 생성 코드 필요 없음)
export const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: "mysql",
  }
);
