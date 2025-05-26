import type { UserModel } from '@core/models/user.model';

import { createReducer, on } from '@ngrx/store';
import { setUserInfo, clearUserInfo } from './user.actions';

export type UserState = {
  user: UserModel | null;
  isFetched: boolean;
};

export const initialState: UserState = {
  user: null,
  isFetched: false,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(setUserInfo, (_, { type, ...user }) => ({
    user,
    isFetched: true,
  })),

  on(clearUserInfo, () => ({
    user: null,
    isFetched: true,
  })),
);
