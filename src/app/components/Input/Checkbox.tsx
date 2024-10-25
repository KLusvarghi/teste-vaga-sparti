import React from 'react';

export interface IIensProps {
  id: string;
  label: string;
}

interface IInputCheckProps {
  name: string;
  description: string;
  value: string;
  error: string | null;
  options: IIensProps[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  name,
  description,
  value,
  onChange,
  error,
  options,
}: IInputCheckProps) => {

  return (
    <>
      {options.map((unit) => {
        return (
          <input key={unit.id} type="checkbox" value={value} onChange={onChange}>
            {unit.label}
          </input>
        );
      })}
    </>
  );
};

export default Checkbox;
