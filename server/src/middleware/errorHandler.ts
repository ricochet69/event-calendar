import { Request, Response, NextFunction } from "express";

const errorHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send(err.messgage);
};

export default errorHandler;
