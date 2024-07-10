import "reflect-metadata";

import { env } from "@/config/env";
import { Sequelize, type SequelizeOptions } from "sequelize-typescript";

const sequelizeOptions: SequelizeOptions = {
  dialect: env.SEQUELIZE_CONNECTION,
  host: env.SEQUELIZE_HOST,
  port: env.SEQUELIZE_PORT,
  database: env.SEQUELIZE_DATABASE,
  username: env.SEQUELIZE_USERNAME,
  password: env.SEQUELIZE_PASSWORD,
  timezone: env.SEQUELIZE_TIMEZONE,
  logging: env.SEQUELIZE_LOGGING,
  models: [__dirname + "/models"],
};

function initDatabase() {
  try {
    const sequelize = new Sequelize(sequelizeOptions);
    return { sequelize };
  } catch (error: any) {
    console.app.error("Unable to intialize sequelize:", error.message);
    process.exit(1);
  }
}

const db = initDatabase();

export default db;
