declare class Game {
    id: string;
    nb_player: number;
    date: string;
    duration: number;
    state: string;
    score_team_red: number;
    score_team_blue: number;
    round: number;
    order: number;
    fk_tournament: string;
}
export default Game;
