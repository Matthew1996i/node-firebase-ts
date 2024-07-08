import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IListUserDTO,
  IFilterUserDTO,
  IUserPasswordDTO,
  IShowUserDTO,
} from "@modules/admin/dtos/user";
import { User } from "@prisma/client";

import { IUpdateStatusDTO } from "@shared/dtos";
import prisma from "@shared/infra/client";

import { IUserRepository } from "./IUserRepository";
import { getUsers } from "./sql";

class UserRepository implements IUserRepository {
  async create(payload: ICreateUserDTO): Promise<User> {
    const userExists = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        created_by: Number(payload.created_by),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    return user;
  }

  async update(payload: IUpdateUserDTO): Promise<void> {
    const { id } = payload;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: payload.name,
        email: payload.email,
        updated_by: payload.updated_by,
        updated_at: new Date(),
      },
    });
  }

  async updateStatus(payload: IUpdateStatusDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        active: payload.active,
        updated_by: payload.updated_by,
        updated_at: new Date(),
      },
    });
  }

  async updatePassword(payload: IUserPasswordDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        password: payload.password,
        updated_by: payload.updated_by,
        updated_at: new Date(),
      },
    });
  }

  async findAll(filters: IFilterUserDTO): Promise<IListUserDTO[]> {
    const users = await getUsers(filters);

    const list = users.map((user) => ({
      ...user,
    })) as IListUserDTO[];

    return list;
  }

  async findById(id: number): Promise<IShowUserDTO> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) return null;

    const user = await prisma.user.findFirst({ where: { email } });

    return user;
  }
}

export { UserRepository };
