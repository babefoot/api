import { NextFunction, Response, Request } from "express";
import Game from "../models/game.model";
import statusCode from "../utils/statusCode";
import { getLoggers } from "../utils/log4js.init";
import { ValidationError, validate } from "class-validator";
import { plainToClass } from "class-transformer";

const loggers = getLoggers();

const validateGame = (req: Request, res: Response, next: NextFunction) => {
  
  const game: Game = plainToClass(Game, req.body, {exposeUnsetFields: false});
  console.log(game);
  
  
  validate(game, { skipNullProperties: true}).then((errors: ValidationError[]) => {        
    if (errors.length > 0) {
      res.status(statusCode.BAD_REQUEST).json({ message: "Invalid game" });
      loggers.app.error("Error while getting game %s", game);
      loggers.out.error("Error while getting game %s", errors);
      return;
    } else {
      res.locals.game = game;
      next();
    }
  });
};

export default validateGame;
