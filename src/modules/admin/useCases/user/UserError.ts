import { AppError } from "@shared/errors/appError";

class UserError extends AppError {
  constructor() {
    super("Email already exists");
  }
}

export { UserError };
