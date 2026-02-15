const winston = require("winston");
const path = require("path");
const moment = require("moment-timezone");

// Current folder: src/utils
//use src/logging
const currentDir = path.resolve(__dirname, '../logging');

// Path for log files
const loggingDir = path.resolve(currentDir);

// Custom log format with timestamp
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Set your timezone
const timeZone = "Europe/Berlin";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz(timeZone).format("YYYY-MM-DD HH:mm:ss")
    }),
    customFormat
  ),
  transports: [
    // Console output
    new winston.transports.Console({ level: "debug" }),

    // Info log file
    new winston.transports.File({
      filename: path.join(loggingDir, "test_run.log"),
      level: "info",
      maxsize: 300 * 1024, // 300 KB
      maxFiles: 5
    }),

    // Error log file
    new winston.transports.File({
      filename: path.join(loggingDir, "test_error.log"),
      level: "error",
      maxsize: 100 * 1024, // 100 KB
      maxFiles: 5
    })
  ]
});

export default logger;
