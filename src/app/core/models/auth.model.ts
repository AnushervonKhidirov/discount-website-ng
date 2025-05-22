export type SignUpModel = {
  username: string;
  password: string;
};

export type LogInModel = SignUpModel;

export type TokenModel = {
  accessToken: string;
  refreshToken: string;
};
