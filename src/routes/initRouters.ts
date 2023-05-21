import express from "express";
import routerPlayer from "./Player/playersRouter";
import routerGame from "./Game/gamesRouter";
import routerTournament from "./Tournament/tournamentRouter";
import routerStats from "./Stats/statsRouter";

export const initRouters = (app: express.Application) => {
  //Authentified routes

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/players", routerPlayer);
  app.use("/games", routerGame);
  app.use("/tournaments", routerTournament);
  app.use("/stats", routerStats);


  //Unauthentified routes
};
