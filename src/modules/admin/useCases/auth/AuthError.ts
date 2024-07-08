import { AppError } from "@shared/errors/appError";

class AuthError extends AppError {
  constructor() {
    super("Email or password incorrect");
  }
}

export { AuthError };
