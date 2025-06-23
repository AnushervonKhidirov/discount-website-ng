import type { CompanyModel } from './company.model';

export type UserModel = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: Role;
  archived: boolean;
  companies: CompanyModel[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUserModel = Pick<UserModel, 'username' | 'role' | 'archived'>;

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}
