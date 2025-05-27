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
  bankId: number | null;
  bank: BankModel | null;
  promoCode: string | null;
};

export enum PromotionType {
  DISCOUNT = 'DISCOUNT',
  CASHBACK = 'CASHBACK',
  PROMO_CODE = 'PROMO_CODE',
}

export type DiscountModel = Omit<PromotionModel, 'bankId' | 'promoCode'>;
export type CashbackModel = Omit<PromotionModel, 'promoCode'> & { bankId: number };
export type PromoCodeModel = Omit<PromotionModel, 'bankId'> & { promoCode: string };
type UnknownPromotionType = DiscountModel | CashbackModel | PromoCodeModel;

export function isDiscount(promotion: UnknownPromotionType): promotion is DiscountModel {
  return promotion.type === PromotionType.DISCOUNT;
}

export function isCashback(promotion: UnknownPromotionType): promotion is CashbackModel {
  return promotion.type === PromotionType.CASHBACK;
}

export function isPromoCode(promotion: UnknownPromotionType): promotion is PromoCodeModel {
  return promotion.type === PromotionType.PROMO_CODE;
}
