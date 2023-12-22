import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z } from "zod";

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      const errorMessage = e.errors.map((err) => err.message);
      res.status(400).send({ error: errorMessage });
    }
  }
};

export default validate;
