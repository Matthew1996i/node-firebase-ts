import { IUserTokenDTO } from "@modules/admin/dtos/userToken/IUserTokenDTO";
import { UserToken } from "@prisma/client";

import prisma from "@shared/infra/client";

import { IUserTokenRepository } from "./IUserTokenRepository";

class UserTokenRepository implements IUserTokenRepository {
  async findByRefreshToken(token: string): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: { refresh_token: token },
    });
    return userToken;
  }

  async deleteById(id: number): Promise<void> {
    await prisma.userToken.delete({ where: { id } });
  }

  async findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = await prisma.userToken.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    });
    return userToken;
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: IUserTokenDTO): Promise<UserToken> {
    await prisma.userToken.create({
      data: {
        user: { connect: { id: user_id } },
        refresh_token,
        expires_date,
      },
    });

    const userToken = await prisma.userToken.findFirst({
      where: { user_id, expires_date },
    });

    return userToken;
  }
}

export { UserTokenRepository };
