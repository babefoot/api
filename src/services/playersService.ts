import { pool } from "../db/connect";
import type Player from "../models/player.model";

export const getPlayers = async (): Promise<any> => {
  const query = "SELECT * FROM player";
  const result = await pool.query(query);
  return result.rows;
};

const createPlayer = async (player: Player): Promise<any> => {
  const query =
    "INSERT INTO player (id, firstname, lastname, nb_buts, nb_matchs_won, card_id) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
  const result = await pool.query(query, [
    player.firstname,
    player.lastname,
    0,
    0,
    player.card_id,
  ]);
  return result.rows[0];
};

const deletePlayer = async (id: number): Promise<any> => {
  const query = "DELETE FROM player WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updatePlayer = async (id: number, player: Player): Promise<any> => {
  const query =
    "UPDATE player SET firstname = $1, lastname = $2, nb_buts = $3, nb_matchs_won = $4, card_id = $5 WHERE id = $6 RETURNING *";
  const result = await pool.query(query, [
    player.firstname,
    player.lastname,
    player.nb_buts,
    player.nb_matchs_won,
    player.card_id,
    id,
  ]);
  return result.rows[0];
};

const addAGoal = async (scorers: string[]): Promise<any> => {
  
  scorers.forEach(async (scorer) => {
      const query = "UPDATE player SET nb_buts = nb_buts + 1 WHERE id = $1";
      await pool.query(query, [scorer]);
    }
  );
};


const login =async (password: string) => {

  const query = "SELECT * FROM ADMIN WHERE password = $1";
  
  const result = await pool.query(query, [
    password,
  ]);

  return result.rows[0] !== undefined ? true : false;
}


const getPlayerByCardId = async (card_id: string): Promise<any> => {
  const query = "SELECT * FROM player WHERE card_id = $1";
  const result = await pool.query(query, [card_id]);
  return result.rows[0];
};

export default { getPlayers, createPlayer, deletePlayer, updatePlayer, addAGoal, login, getPlayerByCardId };