import "reflect-metadata";
import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IListUserDTO,
  IShowUserDTO,
  IFilterUserDTO,
  IUserPasswordDTO,
} from "@modules/admin/dtos/user";
import { ShowUserMap } from "@modules/admin/mappers/user/ShowUserMap";
import { IUserRepository } from "@modules/admin/repositories/user/IUserRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUpdateStatusDTO } from "@shared/dtos";

import { UserError } from "./UserError";

@injectable()
class UserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async create(data: ICreateUserDTO): Promise<number> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      console.error({ local: "UserUseCase - create", error: new UserError() });
      return null;
    }

    const passwordHash = await hash(
      data.password,
      Number(process.env.DEFAULT_HASH_SALT)
    );

    const user = await this.userRepository.create({
      ...data,
      password: passwordHash,
    });

    return user.id;
  }

  async update(data: IUpdateUserDTO): Promise<void> {
    await this.userRepository.update(data);
  }

  async updatePassword(data: IUserPasswordDTO): Promise<void> {
    const passwordHash = await hash(
      data.password,
      Number(process.env.DEFAULT_HASH_SALT)
    );

    await this.userRepository.updatePassword({
      ...data,
      password: passwordHash,
    });
  }

  async updateStatus(data: IUpdateStatusDTO): Promise<void> {
    await this.userRepository.updateStatus(data);
  }

  async find(id: number): Promise<IShowUserDTO> {
    const user = await this.userRepository.findById(id);

    const data = ShowUserMap.toDTO(user);

    return data;
  }

  async list(filters: IFilterUserDTO): Promise<IListUserDTO[]> {
    const users = await this.userRepository.findAll(filters);
    return users;
  }
}

export { UserUseCase };
