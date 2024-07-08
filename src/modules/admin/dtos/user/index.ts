interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_by?: number;
}

interface IFilterUserDTO {
  name?: string;
  email?: string;
  active?: boolean;
}

interface IListUserDTO {
  id: number;
  name: string;
  email: string;
}

interface IShowUserDTO {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface IUpdateUserDTO {
  id: number;
  name: string;
  email: string;
  updated_by: number;
}

interface IUserPasswordDTO {
  id: number;
  password: string;
  updated_by: number;
}

export {
  ICreateUserDTO,
  IListUserDTO,
  IShowUserDTO,
  IUpdateUserDTO,
  IFilterUserDTO,
  IUserPasswordDTO,
};
