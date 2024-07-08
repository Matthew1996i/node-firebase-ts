import auth from "@config/auth";
import { IUserTokenRepository } from "@modules/admin/repositories/userToken/IUserTokenRepository";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import { RefreshTokenError } from "./RefreshTokenError";

interface IPayload {
  user_id: number;
  email: string;
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { email, user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.userTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new RefreshTokenError();
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: String(user_id),
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
      null
    );

    await this.userTokenRepository.create({
      refresh_token,
      user_id,
      expires_date,
    });

    const newToken = sign({}, auth.secret_token, {
      subject: String(user_id),
      expiresIn: auth.expires_in,
    });

    return {
      token: newToken,
      refresh_token,
    };
  }
}

export { RefreshTokenUseCase };
