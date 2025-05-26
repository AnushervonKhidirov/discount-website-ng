import type { UserState } from './user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserFeature = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(selectUserFeature, state => state);
