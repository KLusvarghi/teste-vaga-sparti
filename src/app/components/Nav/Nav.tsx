import React from 'react';
import Image from 'next/image';
import LinkLi from '../Link/Link';

export const Nav = () => {
  return (
    <nav className="h-screen bg-nav p-3">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={200}
        className="mx-auto"
      />
      <ul className="flex flex-col gap-2 mt-24">
        <li>
          <LinkLi href="/product-controller/get-product">Obter produto</LinkLi>
        </li>
        <li>
          <LinkLi href="/product-controller/update-product">Atualizar produto</LinkLi>
        </li>
        <li>
          <LinkLi href="/product-controller/get-product-list">Obter lista de produtos</LinkLi>
        </li>
        <li>
          <LinkLi href="/product-controller/create-new-product">Criar novo produto</LinkLi>
        </li>
        <li>
          <LinkLi href="/product-controller/get-list-of-products-page">
            Obter uma lista de página de produtos
          </LinkLi>
        </li>
      </ul>
    </nav>
  );
};
