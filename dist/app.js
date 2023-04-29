"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_1 = require("./db/connect");
const initRouters_1 = require("./routes/initRouters");
const log4js_init_1 = require("./utils/log4js.init");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, log4js_init_1.initLog4js)();
const loggers = (0, log4js_init_1.getLoggers)();
loggers.app.info("Starting application....");
loggers.out.info("Starting application....");
(0, connect_1.initDbConnection)();
const app = (0, express_1.default)();
const port = process.env.API_PORT || 3000;
app.use(express_1.default.json());
(0, initRouters_1.initRouters)(app);
app.listen(port, () => {
    loggers.out.info(`API listening at http://localhost:${port}`);
    return loggers.app.info(`API listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map