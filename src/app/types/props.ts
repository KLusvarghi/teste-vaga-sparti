import { ReactNode } from 'react';

export interface IChildrenProps {
  children?: ReactNode;
}

export interface IProductProps {
  amount: number;
  dateManufacture: string;
  expirationDate: string;
  id?: string;
  name: string;
  perishable: boolean;
  price: string;
  unitMeasurement: string;
}

export interface IProductAPIProps {
  name: string;
  unitMeasurement: string;
  amount: number;
  price: string;
  perishable: boolean;
  expirationDate: string;
  dateManufacture: string;
}


export interface IValidateProps {
  message: (string | undefined)[];
  isContinue: boolean;
}