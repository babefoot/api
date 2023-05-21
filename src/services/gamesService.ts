import { plainToClass } from "class-transformer";
import { pool } from "../db/connect";
import Game from "../models/game.model";
import Player from "../models/player.model";
import GameDTO from "../DTO/gameDTO";

export const getGames = async (): Promise<any> => {
  const query = "SELECT * FROM game";
  const result = await pool.query(query);
  return result.rows;
};

const createGame = async (game: GameDTO): Promise<any> => {
  const nb_player = game.players_team_blue.length + game.players_team_red.length;  
  const query =
    "INSERT INTO game (nb_player, state) VALUES ($1, $2) RETURNING *";
  const result = await pool.query(query, [nb_player, game.state]);

  const game_id = result.rows[0].id;
  game.players_team_blue.forEach(async (player_id: string) => {
    const query = "INSERT INTO player_games (fk_player, fk_game, winner, team) VALUES ($1, $2, $3, $4) RETURNING *";
    await pool.query(query, [player_id, game_id, false, "B"]);
  });
  game.players_team_red.forEach(async (player_id: string) => {
    const query = "INSERT INTO player_games (fk_player, fk_game, winner, team) VALUES ($1, $2, $3, $4) RETURNING *";
    await pool.query(query, [player_id, game_id, false, "R"]);
  });

  //sleep 1s
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const gameActive = await getActiveGame();
  return gameActive;
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
  console.log("id", id, "team", team);
  
  let query = "";
  if (team === "R") {
    query =
      "UPDATE game SET score_team_red = score_team_red + 1 WHERE id = $1 RETURNING *";
  }else if (team === "B") {
    query =
      "UPDATE game SET score_team_blue = score_team_blue + 1 WHERE id = $1 RETURNING *";
  }
  const result = await pool.query(query, [id]);  
  return result
};



const getActiveGame = async (): Promise<Game> => {
  const query = "SELECT * FROM game INNER JOIN player_games ON game.id = player_games.fk_game INNER JOIN player ON player_games.fk_player = player.id WHERE game.state LIKE '2'";
  const result = await pool.query(query);
  const players = result.rows.map((player) => plainToClass(Player, player, { excludeExtraneousValues: true }));
  const game = plainToClass(Game, result.rows[0], { excludeExtraneousValues: true });
  game.players = players;
  game.id = result.rows[0].fk_game;
  return game;
}

const endGame = async (id: string): Promise<any> => {
  const query = "UPDATE game SET state = 1 WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
}


const addWinToPlayer = async (player_id: string[]): Promise<any> => {
  let query = "UPDATE player SET nb_matchs_won = nb_matchs_won + 1 WHERE id IN (";
  player_id.forEach((id, index) => {
    query += "'" + id + "',";
  })
  query = query.slice(0, -1);
  query += ") RETURNING *";
  
  const result = await pool.query(query);
  return result.rows[0];

}


export default { getGames, createGame, deleteGame, updateGame, addPlayerGame, scoreGoal, getActiveGame, endGame, addWinToPlayer};
