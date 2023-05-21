import { Request, Response } from "express";
import statusCode from "../utils/statusCode";
import { getLoggers } from "../utils/log4js.init";
import { top10, playerStat } from "../services/statsService";

const loggers = getLoggers();

const getTop10Stats = (req: Request, res: Response) => {
    top10()
        .then((result) => {
        res.status(statusCode.OK).json(result);
        })
        .catch((err) => {
        loggers.error(err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json(err);
        });
  
};

const getPlayerStats = (req: Request, res: Response) => {
    const id = req.params.id;
    playerStat(id).then((result) => {
        console.log(result);
        res.status(statusCode.OK).json(result);
    }
    ).catch((err) => {
        console.log(err);
        
        res.status(statusCode.INTERNAL_SERVER_ERROR).json(err);
    }
    );
};

export default { getTop10Stats, getPlayerStats};
