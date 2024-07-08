import { IListUserDTO } from "@modules/admin/dtos/user";
import { instanceToInstance } from "class-transformer";

class ListUserMap {
  static toDTO(data: IListUserDTO) {
    const user = instanceToInstance({
      ...data,
    });
    return user;
  }
}

export { ListUserMap };
