interface IUserTokenDTO {
  user_id: number;
  expires_date: Date;
  refresh_token: string;
}

export { IUserTokenDTO };
