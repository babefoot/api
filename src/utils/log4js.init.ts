import log4js from "log4js";

const initLog4js = (): void => {
  log4js.configure({
    appenders: {
      out: { type: "stdout" },
      app: { type: "file", filename: "logs.log" },
    },
    categories: {
      default: { appenders: ["out"], level: "trace" },
      app: { appenders: ["app"], level: "trace" },
    },
  });
};

const getLoggers = (): any => {
  return {
    app: log4js.getLogger("app"),
    out: log4js.getLogger("out"),
  };
};

export { initLog4js, getLoggers };
