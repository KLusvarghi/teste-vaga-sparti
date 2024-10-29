import { ReactNode } from 'react';

export interface IChildrenProps {
  children?: ReactNode;
}

export interface IProductProps {
  id?: string;
  amount: number;
  dateManufacture: string;
  expirationDate: string;
  name: string;
  perishable: boolean;
  price: string;
  unitMeasurement: string;
}

export interface IValidateProps {
  message: (string | undefined)[];
  isContinue: boolean;
}