'use client';
import React, { useEffect, useState } from 'react';
import Box from '../../components/Box/Box';
import Container from '@/app/components/Container/Container';
import useFetch from '@/app/Hooks/useFetch';
import { IProductProps } from '@/app/types/props';
import useForm from '@/app/Hooks/useForm';
import Input from '@/app/components/Input/Input';
import Button from '@/app/components/Button/Button';
import Error from '@/app/components/Error/Error';
import { UPDATE_PRODUCT } from '@/app/api';

const UpdateProduct = () => {
  const idProduct = useForm('id');
  const name = useForm('name');
  const unitMeasurement = useForm('id'); //validação diferente, terar que ter um checkbox e depois insrir o valor
  const amount = useForm('number');
  const price = useForm('price');
  const perishable = useForm('id'); //validação com switch
  const expirationDate = useForm('date');
  const dateManufacture = useForm('date');

  const { loading, error, request, getStorage } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');
  const [data, setData] = useState<IProductProps | null>(null);
  const [body, setBody] = useState<{} | null>(null); //definir corretamente o tipo do body a ser enviado na requisição

  useEffect(() => {
    console.log(getStorage('idProduct'));
    const id = getStorage('idProduct');
    if (id) idProduct.setValue(id);
  }, [getStorage, idProduct]);

  async function hadleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { url, options } = UPDATE_PRODUCT(idProduct.value, body);
    const { response } = await request(url, options);

    if (response?.status === 200) {
      setData(response.data);
      setSuccesRequest(true);
      setProductId(idProduct.value);
    } else {
      setSuccesRequest(false);
      setData(null);
      setProductId('');
      // removeStorage('removeStorage');
    }
  }
  
  return (
    <Container title="Atualizar produto">
      <Box>
        <form
          onSubmit={hadleSubmit}
          className="w-full px-24 flex flex-col gap-2 "
        >
          <Input
            label="Insira o identificador do produto"
            type="text"
            name="getProduct"
            {...idProduct}
          />
          {loading ? (
            <Button>Verificando ID...</Button>
          ) : (
            <Button>Obter Produto</Button>
          )}
          <Error error={error} />
        </form>
      </Box>
      <Box>
        <form
          onSubmit={hadleSubmit}
          className="w-full px-24 flex flex-col gap-2 "
        >
          <Input
            label="Insira o nome"
            type="text"
            name="getProduct"
            {...name}
          />
          <Input
            label="Insira a Unidade de Medida"
            type="text"
            name="getProduct"
            {...unitMeasurement}
          />
          <Input
            label="Insira a quantia"
            type="text"
            name="getProduct"
            {...amount}
          />
          <Input
            label="Insira a preço"
            type="text"
            name="getProduct"
            {...price}
          />
          <Input
            label="É Perecível?"
            type="text"
            name="getProduct"
            {...perishable}
          />
          <Input
            label="Insira a data de validade"
            type="text"
            name="getProduct"
            {...expirationDate}
          />
          <Input
            label="Insira a data de fabricação"
            type="text"
            name="getProduct"
            {...dateManufacture}
          />
          <div className="flex gap-4 w-full flex-nowrap">
            {loading ? (
              <Button loading={loading}>Salvando...</Button>
            ) : (
              <>
                <Button>salvar alterações</Button>
                <Button navigate="/product-controller/get-product-list">
                  Cancelar
                </Button>
              </>
            )}
          </div>
          <Error error={error} />
        </form>
      </Box>
    </Container>
  );
};

export default UpdateProduct;
