import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Input from '@/app/components/Input/Input';
import Title from '@/app/components/Title/Title';
import React from 'react';

const GetProduct = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-[#80848B]font-[family-name:var(--font-geist-sans)]">
      <Title>Obter produto </Title>
      <Box>
        <Input placeholder="Insira o identificador do produto" type="text" />
        <Button title="Obter Produto" />
      </Box>
    </main>
  );
};

export default GetProduct;
