'use client';
import Error from "../Error/Error";

interface IInputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  error: string | null;
  onBlur: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
}: IInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full 2xl:w-1/2 ">
      <label htmlFor={name} className="text-gray-800 text-lg">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full rounded-md px-3 py-1.5 text-gray-500 text-sm bg-gray-200 shadow-sm border border-slate-300 focus:outline-none focus:border-primary focus:shadow-md"
      />
      <Error error={error}/>
    </div>
  );
};

export default Input;
