import React from 'react';

const Title: React.FC<{ title: string }>  = ({ title }) => {
  return <h1 className="text-5xl	font-bold mb-6">{title}</h1>;
};

export default Title;
