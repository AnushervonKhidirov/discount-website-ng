import type { UserModel } from '@core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const setUserInfo = createAction('[User] set', props<UserModel>());
export const clearUserInfo = createAction('[User] clear');
