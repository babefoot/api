import express from "express";
import controller from "../../controllers/statsController";
import validateUUId from "../../middlewares/validateUUId";

const routerStats = express.Router();

routerStats.get("/top10", controller.getTop10Stats);
routerStats.get("/playerstat/:id", validateUUId, controller.getPlayerStats);

export default routerStats;
