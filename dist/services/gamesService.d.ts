import Game from "../models/game.model";
import Player from "../models/player.model";
export declare const getGames: () => Promise<any>;
declare const _default: {
    getGames: () => Promise<any>;
    createGame: (game: Game) => Promise<any>;
    deleteGame: (id: string) => Promise<any>;
    updateGame: (id: string, game: Game) => Promise<any>;
    addPlayerGame: (id: string, player: Player) => Promise<any>;
    scoreGoal: (id: string, team: string) => Promise<any>;
    getActiveGame: () => Promise<Game>;
};
export default _default;
