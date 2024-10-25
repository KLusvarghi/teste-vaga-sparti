'use client';
import React, { useState } from 'react';
import useFetch from '@/app/Hooks/useFetch';
import useForm from '@/app/Hooks/useForm';
import Container from '@/app/components/Container/Container';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Input from '@/app/components/Input/Input';
import Error from '@/app/components/Error/Error';
import { CREATE_NEW_PRODUCT } from '@/app/api';
import Checkbox, { IIensProps } from '@/app/components/Input/Checkbox';

const CreateNewProductPage = () => {
  const name = useForm('name');
  const unitMeasurement = useForm(); //validação diferente, terar que ter um checkbox e depois insrir o valor
  const amount = useForm('number');
  const price = useForm('price');
  const perishable = useForm(); //validação com switch
  const expirationDate = useForm('date');
  const dateManufacture = useForm('date');

  const { loading, error, request, setError } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);

  const unitMeasurementOptions: IIensProps[] = [
    {
      id: 'KG',
      label: 'kg',
    },
    {
      id: 'UN',
      label: 'un',
    },
    {
      id: 'LT',
      label: 'lt',
    },
  ]; 

  async function hadleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const body = {
      name: name.value,
      unitMeasurement: unitMeasurement.value,
      amount: amount.value,
      price: price.value,
      perishable: perishable.value,
      expirationDate: expirationDate.value,
      dateManufacture: dateManufacture.value,
    };
    console.log(body);

    if (
      name.value ||
      unitMeasurement.value ||
      amount.value ||
      price.value ||
      perishable.value ||
      expirationDate.value ||
      dateManufacture.value === ''
    ) {
      return setError('Preencha todos os campos com valores válidos!');
    } else {
      setError(null);
      if (
        !name.error &&
        !unitMeasurement.error &&
        !amount.error &&
        !price.error &&
        !perishable.error &&
        !expirationDate.error &&
        !dateManufacture.error
      ) {
        const { url, options } = CREATE_NEW_PRODUCT(body);
        const { response } = await request(url, options);

        if (response?.status === 200) {
          setSuccesRequest(true);
        } else {
          setSuccesRequest(false);
          setError('Dados inválidos');
        }
      }
    }
  }

  return (
    <Container title="Criar novo produto">
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
          <Checkbox
            description="Insira a Unidade de Medida"
            name="getProduct"
            options={unitMeasurementOptions}
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
          <div className="flex gap-4 w-full">
            {loading ? (
              <Button loading={loading}>Cadastrando produto...</Button>
            ) : (
              <>
                <Button>Cadastrar produto</Button>
              </>
            )}
          </div>
          <Error error={error} />
        </form>
      </Box>
    </Container>
  );
};

export default CreateNewProductPage;
