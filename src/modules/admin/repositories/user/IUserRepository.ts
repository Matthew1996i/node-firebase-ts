import {
  ICreateUserDTO,
  IUpdateUserDTO,
  IListUserDTO,
  IFilterUserDTO,
  IShowUserDTO,
  IUserPasswordDTO,
} from "@modules/admin/dtos/user";
import { User } from "@prisma/client";

import { IUpdateStatusDTO } from "@shared/dtos";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<void>;
  updatePassword(payload: IUserPasswordDTO): Promise<void>;
  updateStatus(data: IUpdateStatusDTO): Promise<void>;
  findById(id: number): Promise<IShowUserDTO>;
  findByEmail(email: string): Promise<User>;
  findAll(filters: IFilterUserDTO): Promise<IListUserDTO[]>;
}

export { IUserRepository };
