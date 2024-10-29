'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Input from '@/app/components/Input/Input';
import useForm from '@/app/Hooks/useForm';
import { GET_PRODUCT } from '@/app/api';
import useFetch from '@/app/Hooks/useFetch';
import Error from '@/app/components/Error/Error';
import Container from '@/app/components/Container/Container';
import { IProductProps } from '@/app/types/props';
import { types } from '@/app/Hooks/useForm';
import DisplayProduct from '@/app/components/DisplayProduct/DisplayProduct';

const GetProduct = () => {
  const idProduct = useForm('id');
  const {
    loading,
    error,
    setError,
    request,
    setStorage,
    removeStorage,
    getStorage,
  } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);
  const [data, setData] = useState<IProductProps | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const key = 'idProduct';

  const hadleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      if (idProduct.value === '') {
        return setError('Preencha um valor válido antes de obter o produto!');
      } else {
        setError(null);
        if (!idProduct.error) {
          const id = getStorage(key);
          if (id !== idProduct.value) {
            const { url, options } = GET_PRODUCT(idProduct.value);
            const { response } = await request(url, options);

            if (response?.status === 200) {
              setData(response.data);
              setStorage(key, idProduct.value);
              setTimeout(() => setSuccesRequest(true), 1200);
            } else {
              setSuccesRequest(false);
              setData(null);
              removeStorage(key);
            }
          } else {
            setError('Você está tentando acessar o mesmo produto');
          }
        }
      }
    },
    [
      idProduct.value,
      idProduct.error,
      request,
      setStorage,
      removeStorage,
      getStorage,
      setError,
      key,
    ],
  );

  useEffect(() => {
    const id = getStorage(key);
    if (!hasFetched && id) {
      if (types.id.regex.test(id)) {
        idProduct.setValue(id);
        const fetchStoredProduct = async () => {
          const { url, options } = GET_PRODUCT(id);
          const { response } = await request(url, options);

          if (response?.status === 200) {
            console.log(response.data)
            setData(response.data);
            setTimeout(() => setSuccesRequest(true), 1200);
          } else {
            setSuccesRequest(false);
            setData(null);
          }
        };
        fetchStoredProduct();
        setHasFetched(true);
      } else {
        removeStorage(key);
      }
    }
  }, [getStorage, request, hasFetched, idProduct, removeStorage]);

  return (
    <Container title="Obter produto">
      <Box>
        <form
          onSubmit={hadleSubmit}
          className="w-full px-24 flex flex-col gap-2 items-center"
        >
          <Input
            label="Insira o identificador do produto"
            type="text"
            name="getProduct"
            {...idProduct}
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
            <DisplayProduct product={data}/>
          </div>
        </Box>
      )}
    </Container>
  );
};

export default GetProduct;
