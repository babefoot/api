import { NextFunction, Response, Request } from "express";
declare const validateGame: (req: Request, res: Response, next: NextFunction) => void;
export default validateGame;
