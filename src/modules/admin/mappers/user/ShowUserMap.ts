import { IShowUserDTO } from "@modules/admin/dtos/user";
import { instanceToInstance } from "class-transformer";

class ShowUserMap {
  static toDTO({ id, name, email, active }: IShowUserDTO): IShowUserDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      active,
    });
    return user;
  }
}

export { ShowUserMap };
