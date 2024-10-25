'use client';
import React, { useEffect, useState, useCallback } from 'react';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Input from '@/app/components/Input/Input';
import useForm from '@/app/Hooks/useForm';
import { GET_PRODUCT } from '@/app/api';
import useFetch from '@/app/Hooks/useFetch';
import Error from '@/app/components/Error/Error';
import Item from '@/app/components/Item/Item';
import Container from '@/app/components/Container/Container';
import { IProductProps } from '@/app/types/props';
import { types } from '@/app/Hooks/useForm';

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
  const [productId, setProductId] = useState<string>('');
  const [data, setData] = useState<IProductProps | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  let key = 'idProduct';

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
              setProductId(idProduct.value);
            } else {
              setSuccesRequest(false);
              setData(null);
              setProductId('');
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
    ],
  );

  useEffect(() => {
    const id = getStorage(key);
    if (!hasFetched && id) {
      if (types.id.regex.test(id)) {
        idProduct.setValue(id)
        const fetchStoredProduct = async () => {
          const { url, options } = GET_PRODUCT(id);
          const { response } = await request(url, options);

          if (response?.status === 200) {
            setData(response.data);
            setTimeout(() => setSuccesRequest(true), 1200);
            setProductId(id);
          } else {
            setSuccesRequest(false);
            setData(null);
            setProductId('');
          }
        };
        fetchStoredProduct();
        setHasFetched(true);
      } else {
        removeStorage(key);
      }
    }
  }, [getStorage, request, hasFetched]);

  return (
    <Container title="Obter produto">
      <Box>
        <form
          onSubmit={hadleSubmit}
          className="w-full px-24 flex flex-col gap-2 items-center "
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
            <ul>
              <Item>
                ID do produto: <strong>{productId}</strong>
              </Item>
              <Item>Nome: {data.name}</Item>
              <Item>
                Unidade de Medida:{' '}
                {data.unitMeasurement === 'kg'
                  ? 'Kilogramas  (kg)'
                  : data.unitMeasurement === 'lt'
                  ? 'Litros  (lt)'
                  : 'Unidade  (un)'}
              </Item>
              <Item>Quantia: {data.amount}</Item>
              <Item>Preço: R${data.price}</Item>
              <Item>Perecível: {data.perishable ? 'Sim' : 'Não'}</Item>
              <Item>Data de fabricação: {data.expirationDate}</Item>
              <Item>Data de validade: {data.dateManufacture}</Item>
            </ul>
          </div>
        </Box>
      )}
    </Container>
  );
};

export default GetProduct;
