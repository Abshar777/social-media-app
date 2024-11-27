import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req.method === 'GET' ? req.query : req.body;
      schema.parse(dataToValidate);
      next();
    } catch (error: unknown) {
      res.status(400).json({
        message: "Validation error",
        errors: (error as Zod.ZodError).errors,
      });
    }
  };
