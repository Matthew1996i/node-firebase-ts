import { IUserTokenDTO } from "@modules/admin/dtos/userToken/IUserTokenDTO";
import { UserToken } from "@prisma/client";

interface IUserTokenRepository {
  create(data: IUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: number,
    refresh_token: string
  ): Promise<UserToken>;
  findByRefreshToken(token: string): Promise<UserToken>;
  deleteById(id: number): Promise<void>;
}

export { IUserTokenRepository };
