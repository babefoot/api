import playersService from "../services/playersService";
import { Request, Response, response } from "express";
import statusCode from "../utils/statusCode";
import Player from "../models/player.model";
import { getLoggers } from "../utils/log4js.init";

const loggers = getLoggers();

const getPlayers = (req: any, res: any) => {
  playersService
    .getPlayers()
    .then((players: Player[]) => {
      loggers.app.info("Players retrieved successfully");
      res.status(statusCode.OK).json(players);
    })
    .catch((err) => {
      loggers.app.error(`Error while getting players - err : ${err}}`);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while getting players" });
    });
};

const createPlayer = (req: any, res: any) => {
  const player = req.body;
  playersService
    .createPlayer(player)
    .then((newPlayer: Player) => {
      loggers.app.info(`Player created successfully ${newPlayer}`);
      res.status(statusCode.CREATED).json(newPlayer);
    })
    .catch((err) => {
      loggers.app.error(`Player not created for ${player} - err : ${err}`);
      res.status(statusCode.BAD_REQUEST).json({ message: "Invalid player" });
    });
};

const deletePlayer = (req: any, res: any) => {
  const id = req.params.id;
  playersService
    .deletePlayer(id)
    .then((player: Player) => {
      loggers.app.info(`Player deleted successfully ${player}`);
      res.status(statusCode.OK).json(player);
    })
    .catch((err) => {
      loggers.app.error(`Player not deleted for ${id} - err : ${err}}`);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while deleteing : " + err });
    });
};

const updatePlayer = (req: any, res: any) => {
  const id = req.params.id;
  const player = req.body;
  playersService
    .updatePlayer(id, player)
    .then((updatedPlayer: Player) => {
      loggers.app.info("Player updated successfully %s", updatedPlayer);
      res.status(statusCode.OK).json(updatedPlayer);
    })
    .catch((err) => {
      loggers.app.error("Error while updating player %s", err);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while updating : " + err });
    });
};


const loginAdmin = (req: Request, res: Response) => {

  const password = req.body.password;
  playersService.login(password).then(ans => res.status(statusCode.OK).send(ans))
  .catch((err) => {
    loggers.app.error("Error while login %s", err);
    res
      .status(statusCode.BAD_REQUEST)
      .json({ message: "Error while loign : " + err });
  });
}


const getPlayerByCardId = (req: any, res: any) => {
  const cardId = req.params.cardId;
  console.log(cardId);
  
  playersService
    .getPlayerByCardId(cardId)
    .then((player: Player) => {
      loggers.app.info(`Player retrieved successfully ${player}`);
      res.status(statusCode.OK).json(player);
    })
    .catch((err) => {
      loggers.app.error(`Player not retrieved for ${cardId} - err : ${err}}`);
      res.status(statusCode.BAD_REQUEST)
        .json({ message: "Error while getting player : " + err });
    });
};

export default { getPlayers, createPlayer, deletePlayer, updatePlayer, loginAdmin, getPlayerByCardId };
