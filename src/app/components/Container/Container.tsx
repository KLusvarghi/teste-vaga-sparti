import React from 'react';
import Title from '../Title/Title';

interface IContainerProps {
  children: React.ReactNode;
  title: string;
}

const Container = ({ children, title }: IContainerProps) => {
  return (
    <main className="flex flex-col my-6 items-center justify-center min-h-screen w-screen bg-[#80848B]font-[family-name:var(--font-geist-sans)]">
      <Title title={title}></Title>
      {children}
    </main>
  );
};

export default Container;
