import { IProductProps } from '@/app/types/props';
import React from 'react';
import Item from '../Item/Item';



const DisplayProduct: React.FC<{ product: string | number }>  = ({ product }) => {
  return (
    <ul>
      <li><Item></Item></li>
    </ul>
  );
};

export default DisplayProduct;
