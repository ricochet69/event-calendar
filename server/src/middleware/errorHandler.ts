import { Request, Response, NextFunction } from "express";
// Add a logger here

const errorHandler = function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send(err.message);
};

export default errorHandler;
