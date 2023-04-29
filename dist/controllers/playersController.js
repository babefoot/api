"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playersService_1 = __importDefault(require("../services/playersService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const log4js_init_1 = require("../utils/log4js.init");
const loggers = (0, log4js_init_1.getLoggers)();
const getPlayers = (req, res) => {
    playersService_1.default
        .getPlayers()
        .then((players) => {
        loggers.app.info("Players retrieved successfully");
        res.status(statusCode_1.default.OK).json(players);
    })
        .catch((err) => {
        loggers.app.error(`Error while getting players - err : ${err}}`);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ message: "Error while getting players" });
    });
};
const createPlayer = (req, res) => {
    const player = req.body;
    playersService_1.default
        .createPlayer(player)
        .then((newPlayer) => {
        loggers.app.info(`Player created successfully ${newPlayer}`);
        res.status(statusCode_1.default.CREATED).json(newPlayer);
    })
        .catch((err) => {
        loggers.app.error(`Player not created for ${player} - err : ${err}`);
        res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid player" });
    });
};
const deletePlayer = (req, res) => {
    const id = req.params.id;
    playersService_1.default
        .deletePlayer(id)
        .then((player) => {
        loggers.app.info(`Player deleted successfully ${player}`);
        res.status(statusCode_1.default.OK).json(player);
    })
        .catch((err) => {
        loggers.app.error(`Player not deleted for ${id} - err : ${err}}`);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while deleteing : " + err });
    });
};
const updatePlayer = (req, res) => {
    const id = req.params.id;
    const player = req.body;
    playersService_1.default
        .updatePlayer(id, player)
        .then((updatedPlayer) => {
        loggers.app.info("Player updated successfully %s", updatedPlayer);
        res.status(statusCode_1.default.OK).json(updatedPlayer);
    })
        .catch((err) => {
        loggers.app.error("Error while updating player %s", err);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while updating : " + err });
    });
};
exports.default = { getPlayers, createPlayer, deletePlayer, updatePlayer };
//# sourceMappingURL=playersController.js.map