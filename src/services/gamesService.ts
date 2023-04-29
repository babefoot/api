import { plainToClass } from "class-transformer";
import { pool } from "../db/connect";
import Game from "../models/game.model";
import Player from "../models/player.model";

export const getGames = async (): Promise<any> => {
  const query = "SELECT * FROM game";
  const result = await pool.query(query);
  return result.rows;
};

const createGame = async (game: Game): Promise<any> => {
  console.log("game", game.nb_player, game.date);
  
  const query =
    "INSERT INTO game (nb_player, date) VALUES ($1, $2) RETURNING *";

  const result = await pool.query(query, [game.nb_player, game.date]);
  console.log("result", result);
  return result.rows[0];
};

const deleteGame = async (id: string): Promise<any> => {
  const query = "DELETE FROM game WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateGame = async (id: string, game: Game): Promise<any> => {
  let query =
    "UPDATE game SET "

  const props = Object.entries(game);

  props.forEach(([key, value], index) => {
    query += `${key}=${value}`;
    if(index !== props.length - 1) query += ","
  })

  query += ` WHERE id = $1;`
  console.log(query);
  
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const addPlayerGame = async (id: string, player: Player): Promise<any> => {
  const query =
    "INSERT INTO player (id, name, score, fk_game) VALUES (DEFAULT, $1, DEFAULT, $2) RETURNING *";
};

const scoreGoal = async (id: string, team: string): Promise<any> => {
  let query = "";
  if (team === "r") {
    query =
      "UPDATE game SET score_team_red = score_team_red + 1 WHERE id = $1 RETURNING *";
  }else if (team === "b") {
    query =
      "UPDATE game SET score_team_red = score_team_blue + 1 WHERE id = $1 RETURNING *";
  }
  const result = await pool.query(query, [id]);  
  return result
};

const getActiveGame = async (): Promise<Game> => {
  const query = "SELECT * FROM game WHERE state LIKE '2'";
  const result = await pool.query(query);
  const game: Game = plainToClass(Game, result.rows[0]);
  return game;
}


export default { getGames, createGame, deleteGame, updateGame, addPlayerGame, scoreGoal, getActiveGame };
