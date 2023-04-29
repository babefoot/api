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
const playersService_1 = __importDefault(require("../services/playersService"));
const statusCode_1 = __importDefault(require("../../utils/statusCode"));
const getPlayers = (req, res) => {
    playersService_1.default.getPlayers().then((players) => {
        res.status(statusCode_1.default.OK).json(players);
    });
};
const createPlayer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const player = req.body;
    if (player) {
        console.log("player is valid");
        const newPlayer = playersService_1.default.createPlayer(player);
        res.status(statusCode_1.default.CREATED).json(newPlayer);
    }
    else {
        console.log("player is invalid");
        res.status(statusCode_1.default.BAD_REQUEST).json({ message: "Invalid player" });
    }
});
exports.default = { getPlayers, createPlayer };
//# sourceMappingURL=playersController.js.map