"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = exports.initDbConnection = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.POSTGRE_HOST);
const pool = new pg_1.default.Pool({
    user: process.env.POSTGRE_USER,
    host: process.env.POSTGRE_HOST,
    database: process.env.POSTGRE_DATABASE,
    password: process.env.POSTGRE_PASS,
    port: +process.env.POSTGRE_PORT,
});
exports.pool = pool;
const initDbConnection = () => {
    console.log("Connecting to database....");
    pool.connect((err) => {
        if (err) {
            console.error("connection error", err.stack);
        }
        else {
            console.log("Connected");
        }
    });
};
exports.initDbConnection = initDbConnection;
//# sourceMappingURL=connect.js.map