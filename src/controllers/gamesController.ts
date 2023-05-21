import { Request, Response, response } from "express";
import gameService from "../services/gamesService";
import playersService from "../services/playersService";
import statusCode from "../utils/statusCode";
import Game from "../models/game.model";
import { getLoggers } from "../utils/log4js.init";
import GameDTO from "../DTO/gameDTO";

const loggers = getLoggers();

const getGames = (req: Request, res: Response) => {  
  gameService
    .getGames()
    .then((games: Game[]) => {
      loggers.app.info("Players retrieved successfully");
      res.status(statusCode.OK).json(games);
    })
    .catch((err) => {
      loggers.app.error(`Error while getting games - err : ${err}}`);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while getting game" });
    });
};

const createGame = (req: Request, res: Response) => {
  const game: GameDTO = res.locals.game;  
  gameService
    .createGame(game)
    .then((newGame: Game) => {
      loggers.app.info(`Game created successfully ${newGame}`);
      res.status(statusCode.CREATED).json(newGame);
    })
    .catch((err) => {
      loggers.app.error(`Game not created for ${game} - err : ${err}`);
      console.log(err);
      
      res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Error while creating" });
    });
};

const deleteGame = (req: Request, res: Response) => {
  const id: string = req.params.id;
  gameService
    .deleteGame(id)
    .then((game: Game) => {
      loggers.app.info(`Game deleted successfully ${game}`);
      res.status(statusCode.OK).json(game);
    })
    .catch((err) => {
      loggers.app.error(`Game not deleted for ${id} - err : ${err}}`);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while deleteing : " + err });
    });
};

const updateGame = (req: Request, res: Response) => {
  const id: string = req.params.id;
  const game: Game = req.body;
  console.log(id, game);
  
  gameService
    .updateGame(id, game)
    .then((updatedGame: Game) => {
      loggers.app.info("Game updated successfully %s", updatedGame);
      res.status(statusCode.OK).json(updatedGame);
    })
    .catch((err) => {
      loggers.app.error("Error while updating game %s", err);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while updating : " + err });
    });
};

const addPlayerGame = (req: Request, res: Response) => {
  // const id: string = req.params.id;
  // const idPlayer: string = res.locals.player;
  // gameService
  //   .addPlayerGame(id, idPlayer)
  //   .then((updatedGame: Game) => {
  //     loggers.app.info("Player added successfully %s", updatedGame);
  //     res.status(statusCode.OK).json(updatedGame);
  //   })
  //   .catch((err) => {
  //     loggers.app.error("Error while adding player %s", err);
  //     res
  //       .status(statusCode.BAD_REQUEST)
  //       .json({ message: "Error while adding player : " + err });
  //   });
};


const goalScored = (req: Request, res: Response) => {
  const id: string = req.params.id;
  const goal = req.body;
  playersService.addAGoal(goal.scorers)
  .then(response => {
    gameService.scoreGoal(id, goal.team).then((updatedGame: Game) => {
      loggers.app.info("Goal scored successfully %s", updatedGame);
      res.status(statusCode.OK).json(updatedGame);
    })
    .catch((err) => {
      loggers.app.error("Error while scoring goal %s", err);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while scoring goal : " + err });
    });
  })
  .catch(err => {
    loggers.app.error("Error while scoring goal %s", err);
    res
      .status(statusCode.BAD_REQUEST)
      .json({ message: "Error while scoring goal : " + err });
  }
  );
}



const getActiveGame = (req: Request, res: Response) => {
  console.log("state");
  
  gameService.getActiveGame().then(game => {
    res.status(statusCode.OK).json(game)
  }).catch(err => {
    res.status(statusCode.NO_CONTENT).json({ "err" : "No active game"})
  })
}


const endgame = (req: Request, res: Response) => {


  console.log("endgame");

  const id_game = req.params.id;
  gameService.endGame(id_game).then( success =>
    res.status(statusCode.OK).json(success)
  ).catch(err => {
    res.status(statusCode.BAD_REQUEST).json({"err" : err})
  }
  )
}

const winGame = (req: Request, res: Response) => {

  const id_player = req.body.id_players;

  gameService.addWinToPlayer( id_player).then( success =>
    res.status(statusCode.OK).json(success)
  ).catch(err => {
    console.log(err);
    
    res.status(statusCode.BAD_REQUEST).json({"err" : err})
  }
  )
}



export default { getGames, createGame, deleteGame, updateGame, addPlayerGame, goalScored, getActiveGame, endgame, winGame };
