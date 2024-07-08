import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthUseCase } from "./AuthUseCase";

class AuthController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authUseCase = container.resolve(AuthUseCase);

      const authenticationData = await authUseCase.execute({
        email,
        password,
      });

      return response.status(201).json(authenticationData);
    } catch (error) {
      console.error({ local: "AuthController - handle", description: error });

      return response
        .status(500)
        .json({ local: "AuthController - handle", description: error });
    }
  }
}

export { AuthController };
