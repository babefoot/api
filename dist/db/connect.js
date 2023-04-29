"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.initDbConnection = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
const log4js_init_1 = require("../utils/log4js.init");
dotenv_1.default.config();
const loggers = (0, log4js_init_1.getLoggers)();
const pool = new pg_1.default.Pool({
    user: process.env.POSTGRE_USER,
    host: process.env.POSTGRE_HOST,
    database: process.env.POSTGRE_DATABASE,
    password: process.env.POSTGRE_PASS,
    port: +process.env.POSTGRE_PORT,
});
exports.pool = pool;
const initDbConnection = () => {
    loggers.app.info("Connecting to database....");
    loggers.out.info("Connecting to database....");
    const timeout = setTimeout(() => {
        pool.end();
        loggers.app.error("Connection timed out");
        loggers.out.error("Connection timed out");
    }, +process.env.POSTGRE_TIMEOUT);
    pool.connect((err) => {
        clearTimeout(timeout);
        if (err) {
            loggers.app.error("connection error", err.stack);
        }
        else {
            loggers.app.info("Connected successfully");
            loggers.out.info("Connected successfully");
        }
    });
};
exports.initDbConnection = initDbConnection;
//# sourceMappingURL=connect.js.map