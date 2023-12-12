import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l o",
      colorize: true,
    },
  },
});

export default logger;
