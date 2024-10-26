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
import { types } from '@/app/Hooks/useForm';
import { GET_PRODUCT, UPDATE_PRODUCT } from '@/app/api';
import { useRouter } from 'next/navigation';
import { unitMeasurementOptions } from '../create-new-product/page';
import Radio from '@/app/components/Input/Radio';
import Switch from '@/app/components/Input/Switch';

const UpdateProduct = () => {
  const idProduct = useForm('id');
  const name = useForm('name');
  const unitMeasurement = useForm('id'); //validação diferente, terar que ter um checkbox e depois insrir o valor
  const amount = useForm('number');
  const price = useForm('price');
  const perishable = useForm('id'); //validação com switch
  const expirationDate = useForm('date');
  const dateManufacture = useForm('date');
  const {
    loading,
    setLoading,
    error,
    request,
    getStorage,
    removeStorage,
    setError,
  } = useFetch();
  const [succesRequest, setSuccesRequest] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>('');
  const [data, setData] = useState<IProductProps | null>(null);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const [isPerishable, setIsPerishable] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const key = 'idProduct';
  const router = useRouter();

  async function hadleSubmitID(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    const id = getStorage(key);
    if (!hasFetched && id) {
      if (types.id.regex.test(id)) {
        idProduct.setValue(id);
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
  }

  async function hadleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e?.preventDefault();
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
      }

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
  }
  //------------------------------------ tem que fazer a mesma coisa que fex no getProduct

  // useEffect(() => {
  //   const id = getStorage(key);
  //   if (!hasFetched && id) {
  //     if (types.id.regex.test(id)) {
  //       idProduct.setValue(id);
  //       const fetchStoredProduct = async () => {
  //         const { url, options } = GET_PRODUCT(id);
  //         const { response } = await request(url, options);

  //         if (response?.status === 200) {
  //           setData(response.data);
  //           setTimeout(() => setSuccesRequest(true), 1200);
  //           setProductId(id);
  //         } else {
  //           setSuccesRequest(false);
  //           setData(null);
  //           setProductId('');
  //         }
  //       };
  //       fetchStoredProduct();
  //       setHasFetched(true);
  //     } else {
  //       removeStorage(key);
  //     }
  //   }
  // }, [getStorage, request, hasFetched, idProduct, removeStorage]);

  const handleRedirect = () => {
    setRedirect(true);
    router.push('/product-controller/get-product');
    setTimeout(() => {
      // setRedirect(false);
      // setLoading(false);
    }, 2000);
    // setTimeout(() => {
    //   setRedirect(false);
    //   setLoading(false);
    // }, 2100);
  };

  useEffect(() => {
    hadleSubmitID();
  }, [getStorage, request, hasFetched, idProduct, removeStorage]);

  return (
    <Container title="Atualizar produto">
      <Box>
        <form
          onSubmit={hadleSubmitID}
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
            <Button>Pesquisar produto</Button>
          )}
          <Error error={error} />
        </form>
      </Box>
      {succesRequest && (
        <Box>
          <form className="w-full px-24 flex flex-col gap-2 ">
            <Input label="Insira o nome" type="text" name="name" {...name} />
            <Radio
              description="Insira a Unidade de Medida"
              name="radio"
              options={unitMeasurementOptions}
              {...unitMeasurement}
            />
            <Input
              label="Insira a quantia"
              type="text"
              name="amout"
              {...amount}
            />
            <Input label="Insira a preço" type="text" name="price" {...price} />
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
            <div className="flex gap-4 w-full flex-nowrap">
              {loading ? (
                <Button loading={loading}>Salvando...</Button>
              ) : (
                <>
                  <Button onClick={hadleSubmit}>salvar alterações</Button>
                  {!redirect ? (
                    <Button onClick={handleRedirect}>Cancelar</Button>
                  ) : (
                    <Button loading={true} onClick={handleRedirect}>
                      Redirecionando
                    </Button>
                  )}
                </>
              )}
            </div>
            <Error error={error} />
          </form>
        </Box>
      )}
    </Container>
  );
};

export default UpdateProduct;
