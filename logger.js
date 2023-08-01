import { createLogger, format, transports, config } from "winston";
const { combine, timestamp, json } = format;

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
  custom: 4,
};

config.addColors(customLevels);

const logger = createLogger({
  level: customLevels,
  level: "warn",
  format: combine(timestamp(), json()),
  transports: [new transports.File({ filename: "error.log" })],
});

export default logger;
