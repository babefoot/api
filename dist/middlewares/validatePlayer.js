"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_model_1 = __importDefault(require("../models/player.model"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const log4js_init_1 = require("../utils/log4js.init");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const loggers = (0, log4js_init_1.getLoggers)();
const validatePlayer = (req, res, next) => {
    const player = (0, class_transformer_1.plainToClass)(player_model_1.default, req.body);
    (0, class_validator_1.validate)(player, { skipMissingProperties: true, skipUndefinedProperties: true }).then((errors) => {
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid player" });
            loggers.app.error("Error while getting game %s", player);
            loggers.out.error("Error while getting game %s", player);
            return;
        }
        else {
            res.locals.player = player;
            next();
        }
    });
};
exports.default = validatePlayer;
//# sourceMappingURL=validatePlayer.js.map