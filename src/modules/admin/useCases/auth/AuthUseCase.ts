import "reflect-metadata";
import auth from "@config/auth";
import { IUserRepository } from "@modules/admin/repositories/user/IUserRepository";
import { IUserTokenRepository } from "@modules/admin/repositories/userToken/IUserTokenRepository";
import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/appError";

import { AuthError } from "./AuthError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: number;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const {
      expires_in,
      expires_in_refresh_token,
      secret_refresh_token,
      secret_token,
      expires_refresh_token_days,
    } = auth;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AuthError();
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AuthError();
    }

    const token = sign({}, secret_token, {
      subject: String(user.id),
      expiresIn: expires_in,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: String(user.id),
      expiresIn: expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      expires_refresh_token_days,
      null
    );

    await this.userTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });
    return {
      user: {
        id: user.id,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthUseCase };
