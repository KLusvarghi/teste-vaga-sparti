import React from 'react';

interface IErrorProps {
  error: null | string | unknown;
}

const Error = ({ error }: IErrorProps) => {
  if (typeof error === 'string')
    return <p className="text-red-600 ">{error}</p>;
};

export default Error;
