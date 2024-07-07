import helmet, { type HelmetOptions } from "helmet";

const helmetOptions: HelmetOptions = {
  hsts: true,
  xssFilter: true,
  noSniff: true,
  frameguard: {
    action: "deny",
  },
};

export default helmet(helmetOptions);
