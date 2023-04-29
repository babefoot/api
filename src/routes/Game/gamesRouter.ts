import express from "express";
import gamesController from "../../controllers/gamesController";

import validateGameModel from "../../middlewares/validateGame";

import validateUUId from "../../middlewares/validateUUId";

const routerGame: express.Router = express.Router();

routerGame.get("/", gamesController.getGames);
routerGame.delete("/:id", validateUUId, gamesController.deleteGame);
routerGame.post("/", validateGameModel, gamesController.createGame);
routerGame.put(
  "/:id",
  validateUUId,
  gamesController.updateGame
);
routerGame.post("/:id/player/:idPlayer/assign", validateUUId, gamesController.addPlayerGame);
routerGame.post("/:id/scoregoal", validateUUId, gamesController.goalScored);
routerGame.get("/doing", gamesController.getActiveGame);



export default routerGame;
