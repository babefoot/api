"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGames = void 0;
const class_transformer_1 = require("class-transformer");
const connect_1 = require("../db/connect");
const game_model_1 = __importDefault(require("../models/game.model"));
const getGames = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM game";
    const result = yield connect_1.pool.query(query);
    return result.rows;
});
exports.getGames = getGames;
const createGame = (game) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("game", game.nb_player, game.date);
    const query = "INSERT INTO game (nb_player, date) VALUES ($1, $2) RETURNING *";
    const result = yield connect_1.pool.query(query, [game.nb_player, game.date]);
    console.log("result", result);
    return result.rows[0];
});
const deleteGame = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM game WHERE id = $1 RETURNING *";
    const result = yield connect_1.pool.query(query, [id]);
    return result.rows[0];
});
const updateGame = (id, game) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "UPDATE game SET ";
    const props = Object.entries(game);
    props.forEach(([key, value], index) => {
        query += `${key}=${value}`;
        if (index !== props.length - 1)
            query += ",";
    });
    query += ` WHERE id = $1;`;
    console.log(query);
    const result = yield connect_1.pool.query(query, [id]);
    return result.rows[0];
});
const addPlayerGame = (id, player) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO player (id, name, score, fk_game) VALUES (DEFAULT, $1, DEFAULT, $2) RETURNING *";
});
const scoreGoal = (id, team) => __awaiter(void 0, void 0, void 0, function* () {
    let query = "";
    if (team === "r") {
        query =
            "UPDATE game SET score_team_red = score_team_red + 1 WHERE id = $1 RETURNING *";
    }
    else if (team === "b") {
        query =
            "UPDATE game SET score_team_red = score_team_blue + 1 WHERE id = $1 RETURNING *";
    }
    const result = yield connect_1.pool.query(query, [id]);
    return result;
});
const getActiveGame = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM game WHERE state LIKE '2'";
    const result = yield connect_1.pool.query(query);
    const game = (0, class_transformer_1.plainToClass)(game_model_1.default, result.rows[0]);
    return game;
});
exports.default = { getGames: exports.getGames, createGame, deleteGame, updateGame, addPlayerGame, scoreGoal, getActiveGame };
//# sourceMappingURL=gamesService.js.map