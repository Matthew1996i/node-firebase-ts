import { IFilterUserDTO, IListUserDTO } from "@modules/admin/dtos/user";

import prisma from "@shared/infra/client";

export async function getUsers(filters: IFilterUserDTO) {
  const users = await prisma.$queryRaw<IListUserDTO[]>`
    SELECT users.id, 
           users.name,
           users.active
    FROM admin_users AS users
    WHERE ((${filters.active} = false) OR (users.active = ${filters.active}))
      AND ((${filters.name}::varchar IS NULL) OR (UPPER(users.name) LIKE UPPER('%'||${filters.name}||'%')))
    ORDER BY users.name`;
  return users;
}
