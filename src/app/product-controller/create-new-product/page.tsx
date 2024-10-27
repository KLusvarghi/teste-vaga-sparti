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
    id: 'kg',
    label: 'kg',
  },
  {
    id: 'un',
    label: 'un',
  },
  {
    id: 'lt',
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
  const [isValidate, setIsValidate] = useState<IValidateProps | null>(null);
  const [isContinue, setIsContinue] = useState<boolean>(false);

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
    setIsContinue(false);

    const formatarData = (data: string): string => {
      const newDate = data.replaceAll('-', '/');
      const [ano, mes, dia] = newDate.split('/');
      return `${dia}/${mes}/${ano}`;
    };

    async function prosseguirValidacao() {
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
          const priceResolve = Number(price.value).toFixed(1);
          const body = {
            name: name.value,
            unitMeasurement: unitMeasurement.value,
            amount: +amount.value,
            price: priceResolve.toString(),
            perishable: isPerishable,
            expirationDate: formatarData(expirationDate.value),
            dateManufacture: formatarData(dateManufacture.value),
          };

          console.log(body);

          const { url, options } = CREATE_NEW_PRODUCT(body);
          const { response } = await request(url, options);
          console.log(response);
          if (response?.status === 200) {
            console.log('Produto cadastrado com sucesso:', response.data);
            setSuccesRequest(true);
          } else {
            setSuccesRequest(false);
            setError('Erro no cadastro, dados inválidos');
          }
        }
      }
    }
    if (isPerishable) {
      const validate = dateValidate(
        expirationDate.value,
        dateManufacture.value,
      );
      setIsValidate(validate);
      if (validate.isContinue) {
        setIsContinue(true);
        prosseguirValidacao();
        if (validate.message) setError(validate.message);
      } else {
        setIsContinue(false);
        setError(validate.message);
      }
    } else {
      prosseguirValidacao();
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
          <div className="flex flex-col w-full items-center text-center">
            {loading ? (
              <Button loading={loading}>Cadastrando produto...</Button>
            ) : (
              <>
                <Button className="w-1/2">Cadastrar produto</Button>
              </>
            )}
            <Error className="mt-2" error={error} />
            {isContinue && isValidate && <p></p>}

            {isValidate?.message.map((message, index) => (
              <Error key={index} className="mt-2" error={message} />
            ))}
            {succesRequest && (
              <>
                <p>Produto cadastrado com sucesso</p>
                <Button onClick={registerNewProduct} className="w-1/2">
                  Cadastrar um novo produto
                </Button>
              </>
            )}
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default CreateNewProductPage;
