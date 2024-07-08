import "@shared/container/providers";

import { IUserRepository } from "@modules/admin/repositories/user/IUserRepository";
import { UserRepository } from "@modules/admin/repositories/user/UserRepository";
import { IUserTokenRepository } from "@modules/admin/repositories/userToken/IUserTokenRepository";
import { UserTokenRepository } from "@modules/admin/repositories/userToken/UserTokenRepository";
import { container } from "tsyringe";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);
