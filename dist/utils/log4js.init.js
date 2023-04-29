"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggers = exports.initLog4js = void 0;
const log4js_1 = __importDefault(require("log4js"));
const initLog4js = () => {
    log4js_1.default.configure({
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
exports.initLog4js = initLog4js;
const getLoggers = () => {
    return {
        app: log4js_1.default.getLogger("app"),
        out: log4js_1.default.getLogger("out"),
    };
};
exports.getLoggers = getLoggers;
//# sourceMappingURL=log4js.init.js.map