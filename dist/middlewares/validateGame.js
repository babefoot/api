"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_model_1 = __importDefault(require("../models/game.model"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const log4js_init_1 = require("../utils/log4js.init");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const loggers = (0, log4js_init_1.getLoggers)();
const validateGame = (req, res, next) => {
    const game = (0, class_transformer_1.plainToClass)(game_model_1.default, req.body, { exposeUnsetFields: false });
    console.log(game);
    (0, class_validator_1.validate)(game, { skipNullProperties: true }).then((errors) => {
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid game" });
            loggers.app.error("Error while getting game %s", game);
            loggers.out.error("Error while getting game %s", errors);
            return;
        }
        else {
            res.locals.game = game;
            next();
        }
    });
};
exports.default = validateGame;
//# sourceMappingURL=validateGame.js.map