import { pool } from "../db/connect";
import type Tournament from "../models/tournament.model";
import {queryBuilder, requestType} from "../utils/queryBuilder";

export const getTournaments = async (): Promise<any> => {
  const query: string = "SELECT * FROM tournament";
  const result = await pool.query(query);
  return result.rows;
};

const createTournament = async (tournament: Tournament): Promise<number> => {
  const query: string =
    "INSERT INTO tournament (start_date, times_per_match, goals_per_match, state) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING *";
  const result = await pool.query(query, [
    tournament.start_date,
    tournament.times_per_match,
    tournament.goals_per_match,
    0
  ]);
  return result.rows[0].id;
};

const deleteTournament = async (id: number): Promise<any> => {
  const query: string = "DELETE FROM tournament WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateTournament = async (id: number, tournament: Tournament): Promise<any> => {
  const query: string = queryBuilder(requestType.UPDATE, "tournament", tournament, id)
  const result = await pool.query(query);
  return result.rows[0];
};


const activeTournament = async () => {
  const query: string = "SELECT * FROM tournament INNERJOIN game ON n   WHERE state=2"
  const result = await pool.query(query);
  return result.rows[0];
}

export default { getTournaments, createTournament, deleteTournament, updateTournament, activeTournament };