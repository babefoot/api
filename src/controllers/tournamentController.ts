import tournamentService from "../services/tournamentService";
import statusCode from "../utils/statusCode";
import tournament from "../models/tournament.model";
import { getLoggers } from "../utils/log4js.init";
import Tournament from "../models/tournament.model";

const loggers = getLoggers();

const getTournament = (req: any, res: any) => {
  tournamentService
    .getTournaments()
    .then((tournaments: Tournament[]) => {
      loggers.app.info("tournaments retrieved successfully");
      res.status(statusCode.OK).json(tournaments);
    })
    .catch((err) => {
      loggers.app.error(`Error while getting tournaments - err : ${err}}`);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while getting tournaments" });
    });
};

const createTournament = (req: any, res: any) => {
  const tournament = req.body;
  tournamentService
    .createTournament(tournament)
    .then((idNewTournament: number) => {
      loggers.app.info(`tournament created successfully ${idNewTournament}`);
      res.status(statusCode.CREATED).json(idNewTournament);
    })
    .catch((err) => {
      loggers.app.error(`tournament not created for ${tournament} - err : ${err}`);
      res.status(statusCode.BAD_REQUEST).json({ message: "Invalid tournament" });
    });
};

const deleteTournament = (req: any, res: any) => {
  const id = req.params.id;
  tournamentService
    .deleteTournament(id)
    .then((tournament: Tournament) => {
      loggers.app.info(`tournament deleted successfully ${tournament}`);
      res.status(statusCode.OK).json(tournament);
    })
    .catch((err) => {
      loggers.app.error(`tournament not deleted for ${id} - err : ${err}}`);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while deleteing : " + err });
    });
};

const updateTournament = (req: any, res: any) => {
  const id = req.params.id;
  const tournament = req.body;
  tournamentService
    .updateTournament(id, tournament)
    .then((updatedtournament: Tournament) => {
      loggers.app.info("tournament updated successfully %s", updatedtournament);
      res.status(statusCode.OK).json(updatedtournament);
    })
    .catch((err) => {
      loggers.app.error("Error while updating tournament %s", err);
      res
        .status(statusCode.BAD_REQUEST)
        .json({ message: "Error while updating : " + err });
    });
};


const activeTournament = (req: any, res: any) => {
  tournamentService
    .activeTournament()
    .then((tournament: Tournament) => {
      loggers.app.info(`tournament retrieved successfully ${tournament}`);
      res.status(statusCode.OK).json(tournament);
    })
    .catch((err) => {
      loggers.app.error(`Error while getting tournament - err : ${err}}`);
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .json({ message: "Error while getting tournament" });
    });
}

export default { getTournament, createTournament, deleteTournament, updateTournament, activeTournament };
