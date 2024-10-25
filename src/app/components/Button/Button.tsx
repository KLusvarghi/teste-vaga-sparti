import React from 'react';
import Spinner from './Spinner';
import classNames from 'classnames';

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  // navigate?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  loading,
  className,
  disabled,
}: IButtonProps) => {
  return (
    // <button className="bg-primary max-w-36 py-2 px-3 rounded-xl text-gray-300 text-sm hover:bg-secundary duration-150	">
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'flex items-center justify-center w-1/2 py-2 px-3 rounded-md text-gray-300 text-sm bg-primary hover:bg-secundary duration-150 self-center disabled:bg-gray-600',
        {
          className,
        },
      )}
    >
      <div>{loading && <Spinner />}</div>
      {children}
    </button>
  );
};

export default Button;
