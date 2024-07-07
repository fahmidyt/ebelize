import * as colorette from "colorette";

// define custom console object
interface AppConsole {
  info: (...args: any[]) => void;
  log: (...args: any[]) => void;
  error: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  fatal: (...args: any[]) => void;
}

// augment global console object
declare global {
  interface Console {
    app: AppConsole;
  }
}

type Color =
  | "black"
  | "red"
  | "green"
  | "yellow"
  | "blue"
  | "magenta"
  | "cyan"
  | "white"
  | "gray";

interface CustomConsoleProps {
  prefix?: string;
  color?: Color;
  args: any[];

  fn?: (...args: any[]) => void;
}

// custom console function
function customConsole({
  prefix = "APP",
  color = "black",
  args,
  fn = console.log,
}: CustomConsoleProps) {
  const date = new Date().toLocaleString();
  const coloredPrefix = colorette[color];

  fn(coloredPrefix(`[${date}] ${prefix}:`), ...args);
}

// define custom console object
const AppConsole: AppConsole = {
  info: (...args: any[]) =>
    customConsole({ args, color: "green", prefix: "INFO", fn: console.info }),
  log: (...args: any[]) => customConsole({ args, color: "blue" }),
  error: (...args: any[]) =>
    customConsole({ args, color: "red", prefix: "ERROR", fn: console.error }),
  warn: (...args: any[]) =>
    customConsole({ args, color: "yellow", prefix: "WARN", fn: console.warn }),
  fatal: (...args: any[]) =>
    customConsole({ args, color: "red", prefix: "FATAL", fn: console.error }),
};

// augment global console object
console.app = AppConsole;
