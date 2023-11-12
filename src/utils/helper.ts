import { Response } from 'express';

export const sendError = (res: Response, error: string, statusCode: number = 400): void => { 
  res.status(statusCode).json({ error });
};