import express from "express";
import controller from "../../controllers/tournamentController";
import validateTournamentModel from "../../middlewares/validatePlayer";
import validateUUId from "../../middlewares/validateUUId";

const routerTournament = express.Router();

routerTournament.get("/", controller.getTournament);
routerTournament.delete("/:id", validateUUId, controller.deleteTournament);
routerTournament.post("/", validateTournamentModel, controller.createTournament);
routerTournament.put(
  "/:id",
  validateUUId,
  validateTournamentModel,
  controller.updateTournament
);

routerTournament.get(
  "/doing",
  controller.activeTournament
);

export default routerTournament;
