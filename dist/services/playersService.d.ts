import type Player from "../models/player.model";
export declare const getPlayers: () => Promise<any>;
declare const _default: {
    getPlayers: () => Promise<any>;
    createPlayer: (player: Player) => Promise<any>;
    deletePlayer: (id: number) => Promise<any>;
    updatePlayer: (id: number, player: Player) => Promise<any>;
    addAGoal: (id: string) => Promise<any>;
};
export default _default;
