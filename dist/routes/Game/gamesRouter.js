"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gamesController_1 = __importDefault(require("../../controllers/gamesController"));
const validateGame_1 = __importDefault(require("../../middlewares/validateGame"));
const validateUUId_1 = __importDefault(require("../../middlewares/validateUUId"));
const routerGame = express_1.default.Router();
routerGame.get("/", gamesController_1.default.getGames);
routerGame.delete("/:id", validateUUId_1.default, gamesController_1.default.deleteGame);
routerGame.post("/", validateGame_1.default, gamesController_1.default.createGame);
routerGame.put("/:id", validateUUId_1.default, gamesController_1.default.updateGame);
routerGame.post("/:id/player/:idPlayer/assign", validateUUId_1.default, gamesController_1.default.addPlayerGame);
routerGame.post("/:id/scoregoal", validateUUId_1.default, gamesController_1.default.goalScored);
routerGame.get("/doing", gamesController_1.default.getActiveGame);
exports.default = routerGame;
//# sourceMappingURL=gamesRouter.js.map