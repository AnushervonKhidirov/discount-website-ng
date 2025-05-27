export type BankModel = {
  id: number;
  name: string;
  logoUrl: string | null;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateBankData = Pick<BankModel, 'name'>;
export type UpdateBankData = Pick<BankModel, 'name' | 'logoUrl' | 'archived'>;
