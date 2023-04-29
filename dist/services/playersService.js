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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayers = void 0;
const connect_1 = require("../db/connect");
const getPlayers = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM player";
    const result = yield connect_1.pool.query(query);
    return result.rows;
});
exports.getPlayers = getPlayers;
const createPlayer = (player) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO player (id, firstname, lastname, nb_buts, nb_matchs_won, card_id) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
    const result = yield connect_1.pool.query(query, [
        player.firstname,
        player.lastname,
        0,
        0,
        player.card_id,
    ]);
    return result.rows[0];
});
const deletePlayer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM player WHERE id = $1 RETURNING *";
    const result = yield connect_1.pool.query(query, [id]);
    return result.rows[0];
});
const updatePlayer = (id, player) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE player SET firstname = $1, lastname = $2, nb_buts = $3, nb_matchs_won = $4, card_id = $5 WHERE id = $6 RETURNING *";
    const result = yield connect_1.pool.query(query, [
        player.firstname,
        player.lastname,
        player.nb_buts,
        player.nb_matchs_won,
        player.card_id,
        id,
    ]);
    return result.rows[0];
});
const addAGoal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE player SET nb_buts += 1 WHERE id = ? RETURNING *";
    const result = yield connect_1.pool.query(query, [
        id,
    ]);
    return result.rows[0];
});
exports.default = { getPlayers: exports.getPlayers, createPlayer, deletePlayer, updatePlayer, addAGoal };
//# sourceMappingURL=playersService.js.map