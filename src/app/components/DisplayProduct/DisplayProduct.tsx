import { IProductProps } from '@/app/types/props';
import React from 'react';
import Item from '../Item/Item';

interface DisplayProductProps {
  product: IProductProps;
}

const DisplayProduct: React.FC<DisplayProductProps> = ({ product }) => {
  return (
    <ul>
      <Item label='ID do produto:'>{product.id}</Item>
      <Item label='Nome:'>{product.name}</Item>
      <Item label='Unidade de Medida:'>
        {product.unitMeasurement === 'kg'
          ? 'Kilogramas  (kg)'
          : product.unitMeasurement === 'lt'
          ? 'Litros  (lt)'
          : 'Unidade  (un)'}
      </Item>
      <Item label='Quantia:'>{product.amount}</Item>
      <Item label='Preço: R$'>{product.price}</Item>
      <Item label='Perecível:'>{product.perishable ? 'Sim' : 'Não'}</Item>
      <Item label='Data de fabricação:'>{product.expirationDate}</Item>
      <Item label='Data de validade:'>{product.dateManufacture}</Item>{' '}
    </ul>
  );
};

export default DisplayProduct;
