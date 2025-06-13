export type TProduct = {
  name: string;
  description: string;
  photo: string | null;
  price: number;
  paymentTerms: string;
};

export type TDtoProduct = TProduct & {
  _id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v: number;
};
