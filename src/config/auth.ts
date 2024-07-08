export default {
  secret_token: process.env.APP_SECRET,
  expires_in: "1d",
  secret_refresh_token: process.env.APP_REFRESH_SECRET,
  expires_in_refresh_token: "8h",
  expires_refresh_token_days: 30,
};
