import express from "express";
import { initDbConnection } from "./db/connect";
import { initRouters } from "./routes/initRouters";
import { initLog4js, getLoggers } from "./utils/log4js.init";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

initLog4js();

const loggers = getLoggers();

loggers.app.info("Starting application....");
loggers.out.info("Starting application....");

initDbConnection();

const app = express();
const port = process.env.API_PORT || 3000;
app.use(express.json());
app.use(cors());

initRouters(app);

app.listen(port, () => {
  loggers.out.info(`API listening at http://localhost:${port}`);
  return loggers.app.info(`API listening at http://localhost:${port}`);
});

