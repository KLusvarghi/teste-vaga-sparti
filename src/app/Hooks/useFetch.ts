import axios, { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState<null | object>(null);
  const [error, setError] = useState<null | string | unknown>(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url: string, options: object) => {
    let response: AxiosResponse | undefined;
    try {
      setError(null);
      setLoading(true);
      response = await axios(url, options);
      if (response?.status === 404) {
        console.log(response)
        throw new Error('Não foi possível achar um produto com este ID');
      } else {
        setData(response?.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          setError('Não foi possível achar um produto com este ID');
          console.log(response);
        } else {
          setError(`Erro: ${err.response?.status || 'Erro desconhecido'}`);
        }
      } else {
        setError('Erro desconhecido ao fazer a requisição');
      }
    } finally {
      setTimeout(() => setLoading(false), 1200);
      return { response };
    }
  }, []);

  function setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  function getStorage(key: string) {
    const id = localStorage.getItem(key);
    return id;
  }

  function removeStorage(key: string) {
    localStorage.removeItem(key);
  }

  return {
    data,
    error,
    setError,
    loading,
    setLoading,
    request,
    setStorage,
    removeStorage,
    getStorage,
  };
};

export default useFetch;
