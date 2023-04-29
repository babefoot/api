import express from "express";
import routerPlayer from "./Player/playersRouter";
import routerGame from "./Game/gamesRouter";

export const initRouters = (app: express.Application) => {
  //Authentified routes

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.use("/players", routerPlayer);
  app.use("/games", routerGame);

  //Unauthentified routes
};
