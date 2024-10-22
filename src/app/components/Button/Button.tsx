import React from 'react';

interface IButonProps {
  title: string;
}

const Button = ({ title }: IButonProps) => {
  return <button>{title}</button>;
};

export default Button;
