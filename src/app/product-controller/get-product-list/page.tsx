'use client';
import { GET_PRODUCT_LIST } from '@/app/api';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Container from '@/app/components/Container/Container';
import Error from '@/app/components/Error/Error';
import Item from '@/app/components/Item/Item';
import useFetch from '@/app/Hooks/useFetch';
import { IProductProps } from '@/app/types/props';
import classNames from 'classnames';
import React, { useState } from 'react';

const GetProductList = () => {
  const [data, setData] = useState<[IProductProps] | null>(null);
  const { error, request, loading } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { url, options } = GET_PRODUCT_LIST();
    const { response } = await request(url, options);
    if (response?.status === 200) {
      setData(response.data);
    }
  };

  const toggleList = () => {
    if (succesRequest) setSuccesRequest(false);
    setTimeout(() => setSuccesRequest(!succesRequest), 1200);
  };

  return (
    <Container title="Obter lista de produtos">
      <Box>
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <form
            className="flex flex-col w-full gap-4 items-center"
            onSubmit={handleSubmit}
          >
            <p>Deseja obter a lista de produtos?</p>
            {!succesRequest && (
              <Button loading={loading} className="w-1/3" onClick={toggleList}>
                {loading ? 'Carregando lista...' : 'Sim'}
              </Button>
            )}
          </form>
          {succesRequest && <Button onClick={toggleList}>Omitir Lista</Button>}
          <Error error={error} />
        </div>
      </Box>
      {succesRequest && data && (
        <Box>
          <h2 className="font-bold text-xl">Lista de Produtos:</h2>
          <div className="flex flex-col gap-6 mt-4">
            {data.map((product, index) => (
              <div
                key={product.id}
                className={classNames('border-b pb-4', {
                  ['border-none']: data.length == index + 1,
                })}
              >
                <h3 className="text-lg font-semibold mb-2">
                  Produto n° {index + 1}
                </h3>
                <ul className="list-disc pl-6">
                  <Item>ID: {product.id}</Item>
                  <Item>Nome: {product.name}</Item>
                  <Item>
                    Unidade de Medida:
                    {product.unitMeasurement === 'kg'
                      ? 'Kilogramas (kg)'
                      : 'Litros (lt)'}
                  </Item>
                  <Item>Quantia: {product.amount}</Item>
                  <Item>Preço: R${product.price}</Item>
                  <Item>Perecível: {product.perishable ? 'Sim' : 'Não'}</Item>
                  <Item>Data de Fabricação: {product.dateManufacture}</Item>
                  <Item>Data de Validade: {product.expirationDate}</Item>
                </ul>
              </div>
            ))}
          </div>
        </Box>
      )}
    </Container>
  );
};

export default GetProductList;
