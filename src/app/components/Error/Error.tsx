import classNames from 'classnames';
import React from 'react';

interface IErrorProps {
  error: null | string | unknown;
  className?: string
}

const Error = ({ error, className }: IErrorProps) => {
  if (typeof error === 'string')
    return <p className={classNames("text-red-600", className)}>{error}</p>;
};

export default Error;
