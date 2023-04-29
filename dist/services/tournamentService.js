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
exports.getTournaments = void 0;
const connect_1 = require("../db/connect");
const queryBuilder_1 = require("../utils/queryBuilder");
const getTournaments = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM tournament";
    const result = yield connect_1.pool.query(query);
    return result.rows;
});
exports.getTournaments = getTournaments;
const createTournament = (tournament) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "INSERT INTO tournament (start_date, times_per_match, goals_per_match, state) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
    const result = yield connect_1.pool.query(query, [
        tournament.start_date,
        tournament.times_per_match,
        tournament.goals_per_match,
        0
    ]);
    return result.rows[0].id;
});
const deleteTournament = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "DELETE FROM tournament WHERE id = $1 RETURNING *";
    const result = yield connect_1.pool.query(query, [id]);
    return result.rows[0];
});
const updateTournament = (id, tournament) => __awaiter(void 0, void 0, void 0, function* () {
    const query = (0, queryBuilder_1.queryBuilder)(queryBuilder_1.requestType.UPDATE, "tournament", tournament, id);
    const result = yield connect_1.pool.query(query);
    return result.rows[0];
});
const activeTournament = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT * FROM tournament INNERJOIN game ON n   WHERE state=2";
    const result = yield connect_1.pool.query(query);
    return result.rows[0];
});
exports.default = { getTournaments: exports.getTournaments, createTournament, deleteTournament, updateTournament, activeTournament };
//# sourceMappingURL=tournamentService.js.map