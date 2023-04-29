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
    const result = yield connect_1.pool.query("SELECT * FROM players");
    return result.rows;
});
exports.getPlayers = getPlayers;
const createPlayer = (player) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connect_1.pool.query("INSERT INTO players (name, age, team) VALUES ($1, $2, $3) RETURNING *", [player.name, player.age, player.team]);
    return result.rows[0];
});
exports.default = { getPlayers: exports.getPlayers, createPlayer };
//# sourceMappingURL=playersService.js.map