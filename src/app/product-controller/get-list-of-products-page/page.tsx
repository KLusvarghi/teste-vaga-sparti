'use client';
import { GET_PRODUCT_PAGE_LIST } from '@/app/api';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Container from '@/app/components/Container/Container';
import Error from '@/app/components/Error/Error';
import Input from '@/app/components/Input/Input';
import useFetch from '@/app/Hooks/useFetch';
import useForm from '@/app/Hooks/useForm';
import { IProductProps } from '@/app/types/props';
import React, { useState } from 'react';

const GetListOfProduct = () => {
  const page = useForm('number');
  const element = useForm('number');
  const { loading, error, request, setError } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);
  const [data, setData] = useState<IProductProps | null>(null);

  async function hadleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (page.value === '' || element.value === '') {
      return setError('Preencha um valor válido antes de obter o produto!');
    } else {
      setError(null);
      if (!page.error && !element.error) {
        const { url, options } = GET_PRODUCT_PAGE_LIST(
          page.value,
          element.value,
        );
        const { response } = await request(url, options);
        console.log(response?.data);

        if (response?.status === 200) {
          setData(response.data);
          setTimeout(() => setSuccesRequest(true), 1200);
        } else {
          setSuccesRequest(false);
          setData(null);
        }
      }
    }
  }

  return (
    <Container title="Obter página de produtos">
      <Box>
        <form
          onSubmit={hadleSubmit}
          className="w-full px-24 flex flex-col gap-2 items-center "
        >
          <Input
            label="Insira o número da página"
            type="text"
            name="getProduct"
            {...page}
          />
          <Input
            label="Insira o a quantidade de elementos"
            type="text"
            name="getProduct"
            {...element}
          />
          {loading ? (
            <Button loading>Verificando ID...</Button>
          ) : (
            <Button>Obter Produto</Button>
          )}
          <Error error={error} />
        </form>
      </Box>
      {succesRequest && data && (
        <Box>
          <div>
            <ul></ul>
          </div>
        </Box>
      )}
    </Container>
  );
};

export default GetListOfProduct;
