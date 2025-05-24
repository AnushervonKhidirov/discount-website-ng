import type { CategoryModel } from './category.model';
import type { CountryModel } from './country.model';

export type CompanyModel = {
  id: number;
  name: string;
  about: string | null;
  logoUrl: string | null;
  archived: boolean;
  verified: boolean;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  countries?: CountryModel[];
  category?: CategoryModel;
};

export type CreateCompanyModel = Pick<CompanyModel, 'name' | 'about' | 'categoryId'> & {
  countryIds: number[];
};

export type UpdateCompanyModel = Partial<
  Pick<CompanyModel, 'name' | 'about' | 'categoryId' | 'logoUrl'> & {
    countryIds: number[];
  }
>;
