import { IProductProps } from "./types/props";

export const API_URL = 'https://api-recruitment.sparti.dev/';

export function GET_PRODUCT(id: string) {
  return {
    url: API_URL + id,
    options: {
      method: 'GET',
    },
  };
}

export function UPDATE_PRODUCT(id: string, body: { [key: string]: string }) {
  return {
    url: API_URL + id,
    options: {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_PRODUCT_LIST() {
  return {
    url: API_URL,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function CREATE_NEW_PRODUCT(body: IProductProps) {
  return {
    url: API_URL,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function GET_PRODUCT_PAGE_LIST(
  page: string,
  elementes: string,
) {
  return {
    url: `${API_URL}page/${page}/${elementes}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}
