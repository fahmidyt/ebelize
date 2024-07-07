import express, { type Request, type Response } from "express";

const route = express.Router();

route.get("/", function index(req: Request, res: Response) {
  let responseData = {
    message: "Ebelize API v1",
    maintaner: "fahmidyt, <fmidyt@mail.com>",
    source: "https://github.com/fahmidyt/ebelize",
  };

  res.status(200).json(responseData);
});

route.get("/health", function health(req: Request, res: Response) {
  let responseData = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),

    nodeVersion: process.version,
    platform: process.platform,

    status: "UP",
    message: "Ebelize API v1 is up and running!",
  };

  res.status(200).json(responseData);
});

export default route;
