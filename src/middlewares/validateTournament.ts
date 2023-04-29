import { NextFunction, Response, Request } from "express";
import Tournament from "../models/tournament.model";
import statusCode from "../utils/statusCode";
import { getLoggers } from "../utils/log4js.init";
import { ValidationError, validate } from "class-validator";
import { plainToClass } from "class-transformer";

const loggers = getLoggers();

const validateTournament = (req: Request, res: Response, next: NextFunction) => {
  
  const tournament: Tournament = plainToClass(Tournament, req.body);
  
  validate(tournament, { skipMissingProperties: true, skipUndefinedProperties: true } ).then((errors: ValidationError[]) => {    
    if (errors.length > 0) {
      res.status(statusCode.BAD_REQUEST).json({ message: "Invalid tournament" });
      loggers.app.error("Error while validating tournament %s", tournament);
      loggers.out.error("Error while validating tournament %s", tournament);
      return;
    } else {
      res.locals.tournament = tournament;
      next();
    }
  });
};

export default validateTournament;
