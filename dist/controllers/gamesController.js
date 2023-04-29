"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gamesService_1 = __importDefault(require("../services/gamesService"));
const playersService_1 = __importDefault(require("../services/playersService"));
const statusCode_1 = __importDefault(require("../utils/statusCode"));
const log4js_init_1 = require("../utils/log4js.init");
const loggers = (0, log4js_init_1.getLoggers)();
const getGames = (req, res) => {
    gamesService_1.default
        .getGames()
        .then((games) => {
        loggers.app.info("Players retrieved successfully");
        res.status(statusCode_1.default.OK).json(games);
    })
        .catch((err) => {
        loggers.app.error(`Error while getting games - err : ${err}}`);
        res
            .status(statusCode_1.default.INTERNAL_SERVER_ERROR)
            .json({ message: "Error while getting game" });
    });
};
const createGame = (req, res) => {
    const game = res.locals.game;
    gamesService_1.default
        .createGame(game)
        .then((newGame) => {
        loggers.app.info(`Game created successfully ${newGame}`);
        res.status(statusCode_1.default.CREATED).json(newGame);
    })
        .catch((err) => {
        loggers.app.error(`Game not created for ${game} - err : ${err}`);
        console.log(err);
        res.status(statusCode_1.default.INTERNAL_SERVER_ERROR).json({ message: "Error while creating" });
    });
};
const deleteGame = (req, res) => {
    const id = req.params.id;
    gamesService_1.default
        .deleteGame(id)
        .then((game) => {
        loggers.app.info(`Game deleted successfully ${game}`);
        res.status(statusCode_1.default.OK).json(game);
    })
        .catch((err) => {
        loggers.app.error(`Game not deleted for ${id} - err : ${err}}`);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while deleteing : " + err });
    });
};
const updateGame = (req, res) => {
    const id = req.params.id;
    const game = req.body;
    console.log(id, game);
    gamesService_1.default
        .updateGame(id, game)
        .then((updatedGame) => {
        loggers.app.info("Game updated successfully %s", updatedGame);
        res.status(statusCode_1.default.OK).json(updatedGame);
    })
        .catch((err) => {
        loggers.app.error("Error while updating game %s", err);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while updating : " + err });
    });
};
const addPlayerGame = (req, res) => {
    // const id: string = req.params.id;
    // const idPlayer: string = res.locals.player;
    // gameService
    //   .addPlayerGame(id, idPlayer)
    //   .then((updatedGame: Game) => {
    //     loggers.app.info("Player added successfully %s", updatedGame);
    //     res.status(statusCode.OK).json(updatedGame);
    //   })
    //   .catch((err) => {
    //     loggers.app.error("Error while adding player %s", err);
    //     res
    //       .status(statusCode.BAD_REQUEST)
    //       .json({ message: "Error while adding player : " + err });
    //   });
};
const goalScored = (req, res) => {
    const id = req.params.id;
    const goal = req.body;
    playersService_1.default.addAGoal(goal.idPlayer)
        .then(response => {
        gamesService_1.default.scoreGoal(id, goal.team).then((updatedGame) => {
            loggers.app.info("Goal scored successfully %s", updatedGame);
            res.status(statusCode_1.default.OK).json(updatedGame);
        })
            .catch((err) => {
            loggers.app.error("Error while scoring goal %s", err);
            res
                .status(statusCode_1.default.BAD_REQUEST)
                .json({ message: "Error while scoring goal : " + err });
        });
    })
        .catch(err => {
        loggers.app.error("Error while scoring goal %s", err);
        res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: "Error while scoring goal : " + err });
    });
};
const getActiveGame = (req, res) => {
    gamesService_1.default.getActiveGame().then(game => {
        res.status(statusCode_1.default.OK).json(game);
    }).catch(err => {
        res.status(statusCode_1.default.NO_CONTENT).json({ "err": "No active game" });
    });
};
exports.default = { getGames, createGame, deleteGame, updateGame, addPlayerGame, goalScored, getActiveGame };
//# sourceMappingURL=gamesController.js.map