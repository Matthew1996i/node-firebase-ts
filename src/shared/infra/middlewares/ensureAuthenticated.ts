import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { EnsureAuthenticatedError } from "@shared/errors/EnsureAuthenticatedError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    console.error({
      local: "AuthController - handle",
      description: new EnsureAuthenticatedError.TokenMissing(),
    });
  }

  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: Number(user_id),
    };
    next();
  } catch (error) {
    console.error({
      local: "AuthController - handle",
      description: new EnsureAuthenticatedError.InvalidToken(),
    });
  }
}
