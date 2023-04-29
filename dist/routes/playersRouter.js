"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playersController_1 = __importDefault(require("../controllers/playersController"));
const routerPlayer = express_1.default.Router();
routerPlayer.get("/", playersController_1.default.getPlayers);
routerPlayer.post("/", playersController_1.default.createPlayer);
routerPlayer.delete("/", playersController_1.default.deletePlayer);
exports.default = routerPlayer;
//# sourceMappingURL=playersRouter.js.map