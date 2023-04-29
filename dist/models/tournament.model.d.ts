import Game from "./game.model";
declare class Tournament {
    id: string;
    start_date: string;
    games: Game[];
    times_per_match: number;
    goals_per_match: number;
}
export default Tournament;
