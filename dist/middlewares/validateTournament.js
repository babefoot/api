"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tournament_model_1 = __importDefault(require("../models/tournament.model"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const log4js_init_1 = require("../utils/log4js.init");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const loggers = (0, log4js_init_1.getLoggers)();
const validateTournament = (req, res, next) => {
    const tournament = (0, class_transformer_1.plainToClass)(tournament_model_1.default, req.body);
    (0, class_validator_1.validate)(tournament, { skipMissingProperties: true, skipUndefinedProperties: true }).then((errors) => {
        if (errors.length > 0) {
            res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid tournament" });
            loggers.app.error("Error while validating tournament %s", tournament);
            loggers.out.error("Error while validating tournament %s", tournament);
            return;
        }
        else {
            res.locals.tournament = tournament;
            next();
        }
    });
};
exports.default = validateTournament;
//# sourceMappingURL=validateTournament.js.map