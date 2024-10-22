import React from 'react';

interface IInputProps {
  placeholder: string;
  type: string;
}

const Input = ({ placeholder, type }: IInputProps) => {
  return <input placeholder={placeholder} type={type} />;
};

export default Input;
