import { NextFunction, Response, Request } from "express";
import Player from "../models/player.model";
import statusCode from "../utils/statusCode";
import { getLoggers } from "../utils/log4js.init";
import { ValidationError, validate } from "class-validator";
import { plainToClass } from "class-transformer";

const loggers = getLoggers();

const validatePlayer = (req: Request, res: Response, next: NextFunction) => {
  
  const player: Player = plainToClass(Player, req.body);
  
  validate(player, { skipMissingProperties: true, skipUndefinedProperties: true } ).then((errors: ValidationError[]) => {    
    if (errors.length > 0) {
      res.status(statusCode.BAD_REQUEST).json({ message: "Invalid player" });
      loggers.app.error("Error while getting game %s", player);
      loggers.out.error("Error while getting game %s", player);
      return;
    } else {
      res.locals.player = player;
      next();
    }
  });
};

export default validatePlayer;
