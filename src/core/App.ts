import type { Application } from "express";

import { blue } from "colorette";
import express from "express";
import routes from "@routes/index";

import {
  compression,
  cors,
  helmet,
  json,
  parameterPollution,
  rateLimit,
  staticPath,
  urlencoded,
  userAgent,
} from "@core/plugins";

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
    this.APP.use(userAgent);
    this.APP.use(rateLimit);
  }

  private initDatabase() {}

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

  public __testInitializePlugins() {
    if (process.env.NODE_ENV !== "test")
      throw new Error("This method is only available in the test environment");

    this.initializePlugins();
  }

  public __testInitDatabase() {
    if (process.env.NODE_ENV !== "test")
      throw new Error("This method is only available in the test environment");

    this.initDatabase();
  }

  public __testInitRoutes() {
    if (process.env.NODE_ENV !== "test")
      throw new Error("This method is only available in the test environment");

    this.initRoutes();
  }
}
