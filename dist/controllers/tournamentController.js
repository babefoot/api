"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tournamentService_1 = __importDefault(require("../services/tournamentService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const log4js_init_1 = require("../utils/log4js.init");
const loggers = (0, log4js_init_1.getLoggers)();
const getTournament = (req, res) => {
    tournamentService_1.default
        .getTournaments()
        .then((tournaments) => {
        loggers.app.info("tournaments retrieved successfully");
        res.status(statusCode_1.default.OK).json(tournaments);
    })
        .catch((err) => {
        loggers.app.error(`Error while getting tournaments - err : ${err}}`);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ message: "Error while getting tournaments" });
    });
};
const createTournament = (req, res) => {
    const tournament = req.body;
    tournamentService_1.default
        .createTournament(tournament)
        .then((idNewTournament) => {
        loggers.app.info(`tournament created successfully ${idNewTournament}`);
        res.status(statusCode_1.default.CREATED).json(idNewTournament);
    })
        .catch((err) => {
        loggers.app.error(`tournament not created for ${tournament} - err : ${err}`);
        res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid tournament" });
    });
};
const deleteTournament = (req, res) => {
    const id = req.params.id;
    tournamentService_1.default
        .deleteTournament(id)
        .then((tournament) => {
        loggers.app.info(`tournament deleted successfully ${tournament}`);
        res.status(statusCode_1.default.OK).json(tournament);
    })
        .catch((err) => {
        loggers.app.error(`tournament not deleted for ${id} - err : ${err}}`);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while deleteing : " + err });
    });
};
const updateTournament = (req, res) => {
    const id = req.params.id;
    const tournament = req.body;
    tournamentService_1.default
        .updateTournament(id, tournament)
        .then((updatedtournament) => {
        loggers.app.info("tournament updated successfully %s", updatedtournament);
        res.status(statusCode_1.default.OK).json(updatedtournament);
    })
        .catch((err) => {
        loggers.app.error("Error while updating tournament %s", err);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while updating : " + err });
    });
};
const activeTournament = (req, res) => {
    tournamentService_1.default
        .activeTournament()
        .then((tournament) => {
        loggers.app.info(`tournament retrieved successfully ${tournament}`);
        res.status(statusCode_1.default.OK).json(tournament);
    })
        .catch((err) => {
        loggers.app.error(`Error while getting tournament - err : ${err}}`);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ message: "Error while getting tournament" });
    });
};
exports.default = { getTournament, createTournament, deleteTournament, updateTournament, activeTournament };
//# sourceMappingURL=tournamentController.js.map