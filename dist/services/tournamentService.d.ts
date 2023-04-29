import type Tournament from "../models/tournament.model";
export declare const getTournaments: () => Promise<any>;
declare const _default: {
    getTournaments: () => Promise<any>;
    createTournament: (tournament: Tournament) => Promise<number>;
    deleteTournament: (id: number) => Promise<any>;
    updateTournament: (id: number, tournament: Tournament) => Promise<any>;
    activeTournament: () => Promise<any>;
};
export default _default;
