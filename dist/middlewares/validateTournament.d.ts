import { NextFunction, Response, Request } from "express";
declare const validateTournament: (req: Request, res: Response, next: NextFunction) => void;
export default validateTournament;
