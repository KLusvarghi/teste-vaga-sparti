'use client';
import React, { useState } from 'react';
import useFetch from '@/app/Hooks/useFetch';
import useForm from '@/app/Hooks/useForm';
import Container from '@/app/components/Container/Container';
import Box from '@/app/components/Box/Box';
import Button from '@/app/components/Button/Button';
import Input from '@/app/components/Input/Input';
import Error from '@/app/components/Error/Error';
import { IIensProps } from '@/app/components/Input/Radio';
import Switch from '@/app/components/Input/Switch';
import Radio from '@/app/components/Input/Radio';
import dateValidate from '@/app/utils/dateValidate';
import { CREATE_NEW_PRODUCT } from '@/app/api';
import { IValidateProps } from '@/app/types/props';

export const unitMeasurementOptions: IIensProps[] = [
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

const CreateNewProductPage = () => {
  const name = useForm('name');
  const unitMeasurement = useForm();
  const amount = useForm('number');
  const price = useForm('price');
  const expirationDate = useForm('date');
  const dateManufacture = useForm('date');

  const { loading, error, request, setError } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);
  const [isPerishable, setIsPerishable] = useState<boolean>(false);
  const [isValidate, setIsValidate] = useState(); // ---------------------------ARRUAMR O TIPO DE DADO RECEBIDO
  const [dontContinue, setDontContine] = useState<boolean>(false);

  const registerNewProduct = () => {
    setSuccesRequest(false);
    name.setValue('');
    unitMeasurement.setValue('');
    amount.setValue('');
    price.setValue('');
    setIsPerishable(false);
    expirationDate.setValue('');
    dateManufacture.setValue('');
  };

  async function hadleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setDontContine(false);

    // só fará a validação se o porudto for perecivel isPerecible (true)
    if (isPerishable && expirationDate.value && dateManufacture.value) {
      const validate = dateValidate(
        expirationDate.value,
        dateManufacture.value,
      );
      setIsValidate(validate);
      if (validate.isContinue) {
        if (validate.message) {
          setError(validate.message);
        } else {
          // prossegue o código e faz as outras validações
          if (
            name.value == '' ||
            unitMeasurement.value == '' ||
            amount.value == '' ||
            price.value == ''
          ) {
            return setError('Preencha todos os campos com valores válidos!');
          } else {
            setError(null);
            if (
              !name.error &&
              !unitMeasurement.error &&
              !amount.error &&
              !price.error &&
              !expirationDate.error &&
              !dateManufacture.error
            ) {
              console.log('Data de validade ', expirationDate.value);
              const body = {
                name: name.value,
                unitMeasurement: unitMeasurement.value,
                amount: +amount.value,
                price: price.value,
                perishable: isPerishable,
                expirationDate: expirationDate.value,
                dateManufacture: dateManufacture.value,
              };

              // ------------------------------- arrumar o valor recebido na API
              const { url, options } = CREATE_NEW_PRODUCT(body);
              const { response } = await request(url, options);
              console.log(response);

              // dateValidate(expirationDate.value, dateManufacture.value);

              if (response?.status === 200) {
                setSuccesRequest(true);
              } else {
                setSuccesRequest(false);
                setError('Dados inválidos');
              }
            }
          }
        }
      } else {
        setDontContine(true);
      }
    } else {
      return setError('Preencha todos os campos com valores válidos!');
    }
  }

  return (
    <Container title="Criar novo produto">
      <Box>
        <form
          onSubmit={hadleSubmit}
          className="w-full 2xl:w-2/3 px-2 md:px-16 lg:px-28 flex flex-col gap-2"
        >
          <Input label="Insira o nome" type="text" name="name" {...name} />
          <Radio
            description="Insira a Unidade de Medida"
            name="radio"
            options={unitMeasurementOptions}
            {...unitMeasurement}
          />
          <Input
            label="Insira a quantia"
            type="number"
            name="amout"
            {...amount}
          />
          <Input label="Insira o preço" type="text" name="price" {...price} />
          <Switch
            description="É perecível?"
            offColor={'#EB0000'}
            onColor={'#00EB08'}
            handleDiameter={30}
            height={25}
            width={60}
            checked={isPerishable}
            setIsPerishable={setIsPerishable}
            value={isPerishable}
          />
          <Input
            label="Insira a data de validade"
            type="date"
            name="expirationDate"
            {...expirationDate}
          />
          <Input
            label="Insira a data de fabricação"
            type="date"
            name="dateManufacture"
            {...dateManufacture}
          />
          <div className="flex flex-col w-full items-center">
            {loading ? (
              <Button loading={loading}>Cadastrando produto...</Button>
            ) : (
              <>
                <Button className="w-1/2">Cadastrar produto</Button>
              </>
            )}
            <Error className="mt-2" error={error} />
            {dontContinue &&
              isValidate &&
              isValidate.message.map((message) => {
                <Error className="mt-2" error={message} />;
              })}
          </div>
        </form>
        {succesRequest && (
          <Button onClick={registerNewProduct} className="w-1/2">
            Cadastrar um novo produto
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default CreateNewProductPage;
