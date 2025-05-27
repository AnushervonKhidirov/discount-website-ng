import type { CompanyModel } from './company.model';
import type { StoreModel } from './store.model';
import type { BankModel } from './bank.model';

export type PromotionModel = {
  id: number;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
  type: PromotionType;
  size: number;
  message: string | null;
  startAt: Date;
  endAt: Date;
  companyId: number;
  company: CompanyModel;
  stores: StoreModel[];
  bankId?: number | null;
  bank?: BankModel | null;
  promoCode?: string | null;
};

export enum PromotionType {
  DISCOUNT = 'DISCOUNT',
  CASHBACK = 'CASHBACK',
  PROMO_CODE = 'PROMO_CODE',
}

export type DiscountModel = Omit<PromotionModel, 'bankId' | 'bank' | 'promoCode'>;
export type CashbackModel = Omit<PromotionModel, 'promoCode'> & { bankId: number; bank: BankModel };
export type PromoCodeModel = Omit<PromotionModel, 'bankId'> & { promoCode: string };
