import React from 'react';
import Error from '../Error/Error';

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

const Radio = ({
  name,
  description,
  value,
  onChange,
  error,
  options,
}: IInputCheckProps) => {
  return (
    <div className="flex flex-col self-start ">
      <p className="text-gray-800 text-lg">{description}</p>
      <div className="flex gap-6">
        {options.map((option) => {
          return (
            <label className="text-sm text-gray-800 capitalize" key={option.id}>
              <input
                className="m-1"
                type="radio"
                name={name}
                value={option.id}
                onChange={onChange}
                checked={value === option.id}
              />
              {option.label}
            </label>
          );
        })}
        <Error error={error} />
      </div>
    </div>
  );
};

export default Radio;
