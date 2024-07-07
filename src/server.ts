import "@utils/console";

import App from "./core/App";

function server() {
  const app = App.create();

  app.listen();
}

server();
