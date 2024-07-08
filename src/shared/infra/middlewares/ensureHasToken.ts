import { NextFunction, Request, Response } from "express";

export async function ensureHasToken(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const { accesstoken } = request.headers;

  if (!accesstoken) {
    throw new Error("Token Missing");
  }

  if (accesstoken === process.env.EXTERNAL_ACCESS_TOKEN) {
    next();
  } else {
    throw new Error("Token invalid");
  }
}
