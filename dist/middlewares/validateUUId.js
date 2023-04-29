"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const validateUUId = (req, res, next) => {
    const params = req.params;
    const fields = Object.keys(params);
    const regex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$");
    fields.every((param) => {
        if (param.includes("id"))
            if (regex.test(params[param])) {
                return true;
            }
            else {
                res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid id" });
                return false;
            }
    });
    next();
};
exports.default = validateUUId;
//# sourceMappingURL=validateUUId.js.map