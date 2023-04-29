import { NextFunction, Response, Request } from "express";
declare const validatePlayer: (req: Request, res: Response, next: NextFunction) => void;
export default validatePlayer;
