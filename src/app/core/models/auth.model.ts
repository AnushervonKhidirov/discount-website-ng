export type SignUpModel = {
  username: string;
  password: string;
};

export type LogInModel = SignUpModel;

export type AccessTokenModel = {
  accessToken: string;
};

export type RefreshTokenModel = {
  refreshToken: string;
};

export type TokenModel = AccessTokenModel & RefreshTokenModel;
