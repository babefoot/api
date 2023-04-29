"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playersController_1 = __importDefault(require("../../controllers/playersController"));
const validatePlayer_1 = __importDefault(require("../../middlewares/validatePlayer"));
const validateUUId_1 = __importDefault(require("../../middlewares/validateUUId"));
const routerPlayer = express_1.default.Router();
routerPlayer.get("/", playersController_1.default.getPlayers);
routerPlayer.delete("/:id", validateUUId_1.default, playersController_1.default.deletePlayer);
routerPlayer.post("/", validatePlayer_1.default, playersController_1.default.createPlayer);
routerPlayer.put("/:id", validateUUId_1.default, validatePlayer_1.default, playersController_1.default.updatePlayer);
exports.default = routerPlayer;
//# sourceMappingURL=playersRouter.js.map