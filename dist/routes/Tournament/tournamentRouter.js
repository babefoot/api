"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tournamentController_1 = __importDefault(require("../../controllers/tournamentController"));
const validatePlayer_1 = __importDefault(require("../../middlewares/validatePlayer"));
const validateUUId_1 = __importDefault(require("../../middlewares/validateUUId"));
const routerTournament = express_1.default.Router();
routerTournament.get("/", tournamentController_1.default.getTournament);
routerTournament.delete("/:id", validateUUId_1.default, tournamentController_1.default.deleteTournament);
routerTournament.post("/", validatePlayer_1.default, tournamentController_1.default.createTournament);
routerTournament.put("/:id", validateUUId_1.default, validatePlayer_1.default, tournamentController_1.default.updateTournament);
routerTournament.get("/doing", tournamentController_1.default.activeTournament);
exports.default = routerTournament;
//# sourceMappingURL=tournamentRouter.js.map