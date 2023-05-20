import express from "express";
import routerPlayer from "./Player/playersRouter";
import routerGame from "./Game/gamesRouter";
import routerTournament from "./Tournament/tournamentRouter";

export const initRouters = (app: express.Application) => {
  //Authentified routes

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/players", routerPlayer);
  app.use("/games", routerGame);
  app.use("/tournaments", routerTournament);


  //Unauthentified routes
};
