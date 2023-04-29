import pg from "pg";
import dotenv from "dotenv";
import { getLoggers } from "../utils/log4js.init";

dotenv.config();
const loggers = getLoggers();

const pool = new pg.Pool({
  user: process.env.POSTGRE_USER,
  host: process.env.POSTGRE_HOST,
  database: process.env.POSTGRE_DATABASE,
  password: process.env.POSTGRE_PASS,
  port: +process.env.POSTGRE_PORT,
});

const initDbConnection = (): void => {
  loggers.app.info("Connecting to database....");
  loggers.out.info("Connecting to database....");

  const timeout = setTimeout(() => {
    pool.end();
    loggers.app.error("Connection timed out");
    loggers.out.error("Connection timed out");
  }, +process.env.POSTGRE_TIMEOUT);


  pool.connect((err): void => {
    clearTimeout(timeout);
    if (err) {
      loggers.app.error("connection error", err.stack);
    } else {
      loggers.app.info("Connected successfully");
      loggers.out.info("Connected successfully");
    }
  });
};

export { initDbConnection, pool };
