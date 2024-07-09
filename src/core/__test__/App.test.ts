import App from "../App";
import db from "@/database";
import { env } from "@/config/env";

jest.mock<typeof import("@config/env")>("@/config/env", () => {
  // Require the original module to not be mocked...
  const originalModule =
    jest.requireActual<typeof import("@/config/env")>("@/config/env");

  return {
    ...originalModule,
    __esModule: true,
    env: {
      ...originalModule.env,
      SEQUELIZE_CONNECTION: "postgres",
      SEQUELIZE_DATABASE: "ebelize",
      SEQUELIZE_SYNC: false,
    },
  };
});

jest.mock("@/database", () => ({
  __esModule: true,
  default: {
    sequelize: {
      authenticate: jest.fn().mockResolvedValue(true),
      sync: jest.fn().mockResolvedValue(true),
    },
  },
}));

jest.mock("express", () => {
  const APP = { use: jest.fn(), listen: jest.fn() };

  return {
    __esModule: true,
    default: () => APP,
  };
});

jest.mock(
  "@core/plugins",
  () => {
    const PLUGIN_LIST = [
      "authExtractor",
      "compression",
      "cors",
      "helmet",
      "json",
      "parameterPollution",
      "rateLimit",
      "requestIp",
      "staticPath",
      "urlencoded",
      "userAgent",
    ] as const;

    return PLUGIN_LIST.reduce((acc, plugin) => {
      acc[plugin] = plugin;
      return acc;
    }, {} as Record<(typeof PLUGIN_LIST)[number], string>);
  },
  { virtual: true }
);
jest.mock("@routes/index", () => "routes", { virtual: true });

describe("App", function () {
  let _app: App;

  beforeEach(() => {
    jest.spyOn(console.app, "info");
    _app = new App();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize App successfully", function () {
    expect(_app).toBeDefined();

    expect(console.app.info).toHaveBeenCalledWith("Initializing App...");
    expect(console.app.info).toHaveBeenCalledWith(
      "App initialized successfully!"
    );
  });

  it("should initialize plugins", function () {
    expect(_app).toBeDefined();
    expect(_app.__app.use).toHaveBeenCalledWith("helmet");
    expect(_app.__app.use).toHaveBeenCalledWith("cors");
    expect(_app.__app.use).toHaveBeenCalledWith("json");
    expect(_app.__app.use).toHaveBeenCalledWith("compression");
    expect(_app.__app.use).toHaveBeenCalledWith("urlencoded");
    expect(_app.__app.use).toHaveBeenCalledWith("staticPath");
    expect(_app.__app.use).toHaveBeenCalledWith("parameterPollution");
    expect(_app.__app.use).toHaveBeenCalledWith("requestIp");
    expect(_app.__app.use).toHaveBeenCalledWith("userAgent");
    expect(_app.__app.use).toHaveBeenCalledWith("authExtractor");
    expect(_app.__app.use).toHaveBeenCalledWith("rateLimit");
  });

  it("should initialize routes", function () {
    expect(_app).toBeDefined();
    expect(_app.__app.use).toHaveBeenCalledWith("routes");
  });

  it("should listen to the port", function () {
    expect(_app).toBeDefined();

    _app.listen();
    expect(_app.__app.listen).toHaveBeenCalledWith(8000, expect.any(Function));

    _app = new App(3000);
    _app.listen();
    expect(_app.__app.listen).toHaveBeenCalledWith(3000, expect.any(Function));
  });

  it("should create an instance of App", function () {
    const app = App.create(2056);
    expect(app).toBeInstanceOf(App);

    app.listen();
    expect(app.__app.listen).toHaveBeenCalledWith(2056, expect.any(Function));
  });

  it("should initialize database", async function () {
    jest.spyOn(db.sequelize, "authenticate").mockClear();
    jest.spyOn(db.sequelize, "sync").mockClear();

    new App();
    expect(db.sequelize.authenticate).toHaveBeenCalled();
    expect(db.sequelize.sync).not.toHaveBeenCalled();
  });

  it("should sync database", async function () {
    jest.spyOn(db.sequelize, "authenticate").mockClear();
    jest.spyOn(db.sequelize, "sync").mockClear();

    jest.replaceProperty(env, "SEQUELIZE_SYNC", true);
    await _app.__initDatabase();

    expect(db.sequelize.sync).toHaveBeenCalled();
  });
});
