import { ReactNode } from 'react';

export interface IChildrenProps {
  children?: ReactNode;
}

export interface IProductProps {
  amount: number;
  dateManufacture: string;
  expirationDate: string;
  id: string;
  name: string;
  perishable: boolean;
  price: string;
  unitMeasurement: string;
}

