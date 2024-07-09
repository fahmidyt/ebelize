import type { Application } from "express";

import { blue } from "colorette";
import express from "express";
import routes from "@routes/index";
import db from "@/database";

import {
  authExtractor,
  compression,
  cors,
  helmet,
  json,
  parameterPollution,
  rateLimit,
  requestIp,
  staticPath,
  urlencoded,
  userAgent,
} from "@core/plugins";
import { env } from "@/config/env";

export default class App {
  private readonly APP: Application;

  private readonly PORT: number;

  constructor(port: number = 8000) {
    console.app.info("Initializing App...");

    this.APP = express();
    this.PORT = port;

    this.initializePlugins();

    this.initDatabase();

    this.initRoutes();

    console.app.info("App initialized successfully!");
  }

  private initializePlugins() {
    this.APP.use(helmet);
    this.APP.use(cors);
    this.APP.use(json);
    this.APP.use(compression);
    this.APP.use(urlencoded);
    this.APP.use(staticPath);
    this.APP.use(parameterPollution);
    this.APP.use(requestIp);
    this.APP.use(userAgent);
    this.APP.use(authExtractor);
    this.APP.use(rateLimit);
  }

  private async initDatabase() {
    const dbDialect = blue(env.SEQUELIZE_CONNECTION);
    const dbName = blue(env.SEQUELIZE_DATABASE);

    try {
      await db.sequelize.authenticate();
      console.app.info(`Connected to ${dbDialect} database: ${dbName}`);

      if (env.SEQUELIZE_SYNC) {
        console.app.warn("Syncing database...");
        await db.sequelize.sync();
        console.app.info("Database synced successfully!");
      }
    } catch (error) {
      console.app.error(
        `Unable to connect to ${dbDialect} database: ${dbName}`
      );
      console.app.error(error);
    }
  }

  private initRoutes() {
    this.APP.use(routes);
  }

  public listen() {
    const host = blue(`http://localhost:${this.PORT}/`);

    this.APP.listen(this.PORT, () => {
      console.app.info(`App is running on ${host}`);
    });
  }

  public static create(port?: number) {
    return new App(port);
  }

  public async __initDatabase() {
    if (process.env.NODE_ENV !== "test")
      throw new Error("This method is only available in the test environment");

    return this.initDatabase();
  }

  get __app() {
    if (process.env.NODE_ENV !== "test")
      throw new Error("This method is only available in the test environment");

    return this.APP;
  }
}
