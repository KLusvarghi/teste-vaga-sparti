import React from 'react';

interface IItemProps {
  children: React.ReactNode;
  label: string;
}

const Item: React.FC<IItemProps> = ({ label, children }) => {
  return (
    <li className="list-none">
      <span className='font-bold'>{label} </span>
      {children}
    </li>
  );
};

export default Item;
