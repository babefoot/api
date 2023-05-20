import express from "express";
import controller from "../../controllers/playersController";
import validatePlayerModel from "../../middlewares/validatePlayer";
import validateUUId from "../../middlewares/validateUUId";

const routerPlayer = express.Router();

routerPlayer.get("/", controller.getPlayers);
routerPlayer.delete("/:id", validateUUId, controller.deletePlayer);
routerPlayer.post("/", validatePlayerModel, controller.createPlayer);
routerPlayer.put(
  "/:id",
  validateUUId,
  validatePlayerModel,
  controller.updatePlayer
);

routerPlayer.post("/login", controller.loginAdmin)
routerPlayer.get("/card/:cardId", controller.getPlayerByCardId)


export default routerPlayer;
