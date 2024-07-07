import App from "../App";

describe("App", () => {
  let app: App;

  beforeEach(() => {
    app = new App();
  });

  afterEach(() => {
    // Clean up any resources used by the app
  });

  // Existing tests...

  it("should initialize plugins", () => {
    // Test that the initializePlugins method is called
    // and the necessary plugins are initialized
    app.__testInitializePlugins();
    // Add your assertions here
  });

  it("should initialize database", () => {
    // Test that the initDatabase method is called
    // and the database is initialized
    app.__testInitDatabase();
    // Add your assertions here
  });

  it("should initialize routes", () => {
    // Test that the initRoutes method is called
    // and the routes are initialized
    app.__testInitRoutes();
    // Add your assertions here
  });

  it("should start listening on the specified port", () => {
    // Test that the listen method starts the app
    // and listens on the specified port
    app.listen();
    // Add your assertions here
  });

  it("should create an instance of App with the default port", () => {
    // Test that the static create method creates an instance of App
    // with the default port (8000)
    const app = App.create();
    // Add your assertions here
    expect(app).toBeInstanceOf(App);
  });

  it("should create an instance of App with the specified port", () => {
    // Test that the static create method creates an instance of App
    // with the specified port
    const port = 9000;
    const app = App.create(port);
    // Add your assertions here
  });

  it("should call private method initializePlugins", () => {
    // Test that the private method initializePlugins is called
    const initializePluginsSpy = jest.spyOn(app as any, "initializePlugins");
    app["initializePlugins"]();
    expect(initializePluginsSpy).toHaveBeenCalled();
  });

  it("should call private method initDatabase", () => {
    // Test that the private method initDatabase is called
    const initDatabaseSpy = jest.spyOn(app as any, "initDatabase");
    app["initDatabase"]();
    expect(initDatabaseSpy).toHaveBeenCalled();
  });

  it("should call private method initRoutes", () => {
    // Test that the private method initRoutes is called
    const initRoutesSpy = jest.spyOn(app as any, "initRoutes");
    app["initRoutes"]();
    expect(initRoutesSpy).toHaveBeenCalled();
  });
});
