import { useState } from 'react';

export const types = {
  id: {
    regex: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
    message: 'Formato de ID inválido',
  },
  name: {
    regex: /^[A-Za-z]{1,30}$/,
    message: 'Precisa ter mais que 3 caractres e apenas letras',
  },
  number: {
    regex: /^\d+$/,
    message: 'Apenas números e números positivos são válidos',
  },
  price: {
    regex: /^(?:\d{1,3}(?:,\d{3})*|\d+|\d)(?:\.\d{2})?$/,
    message: 'Valor monetário inválido',
  },
  date: {
    regex: /^(19[8-9]\d|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    message: 'Data inváldia',
  },
};

interface IFormProps {
  type?: keyof typeof types;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const useForm = (type?: IFormProps['type']) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<null | string>(null);

  function validate(value: string | number | boolean) {
    const inputValue = value.toString();
    if (type) {
      
      if (inputValue.length === 0) {
        setError('Preencha um valor');
        return null;
      } else if (!types[type].regex.test(inputValue)) {
        setError(types[type].message);
        return false;
      } else {
        setError(null);
        return true;
      }
    }
    return true;
  }

  function onChange(event: InputChangeEvent) {
    const { target } = event;
    if (error) validate(target.value);
    setValue(target.value);
    // console.log(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
