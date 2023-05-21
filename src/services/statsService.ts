import { pool } from "../db/connect";
import type Player from "../models/player.model";

const top10 = async (): Promise<any> => {
  
    const resOject = {
        goal: [],
        win: []
    };

    const queryGoal = "SELECT * FROM player ORDER BY nb_buts DESC LIMIT 10";
    const resultGoal = await pool.query(queryGoal);


    const queryWin = "SELECT * FROM player ORDER BY nb_matchs_won DESC LIMIT 10";
    const resultWin = await pool.query(queryWin);


    resOject.goal = resultGoal.rows;
    resOject.win = resultWin.rows;
    

    return resOject;
};

const playerStat = async (id: string): Promise<any> => {
    const queryPlayer = "SELECT * FROM player WHERE id = $1";
    const result = await pool.query(queryPlayer, [id]);

    const queryPlayed = "SELECT COUNT(*) FROM player_games WHERE fk_player = $1";
    const resultPlayed = await pool.query(queryPlayed, [id]);

    result.rows[0].nb_matchs_played = resultPlayed.rows[0].count;

    return result.rows[0];
};

export { top10, playerStat };