'use client';
import React from 'react';
import Image from 'next/image';
import LinkLi from '../Link/Link';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { NumberedListIcon } from '@heroicons/react/24/solid';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { Square3Stack3DIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';

export const Nav = () => {
  const iconClassName =
    'h-6 w-6 text-gray-500 cursor-pointer hover:fill-primary';

  const iconProps = {
    height: 26,
    color: '#263248',
    className: iconClassName,
  };

  return (
    <nav className={'flex flex-col bg-nav p-3 w-60 overflow-hidden'}>
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={200}
        className="mx-auto"
      />
      <ul className={'flex flex-col gap-2 mt-24'}>
        <li onClick={(e) => e.target}>
          <LinkLi
            href="/product-controller/get-product"
            icon={<ClipboardDocumentListIcon {...iconProps} />}
          >
            Obter produto
          </LinkLi>
        </li>
        <li>
          <LinkLi
            href="/product-controller/update-product"
            icon={<NumberedListIcon {...iconProps} />}
          >
            Atualizar produto
          </LinkLi>
        </li>
        <li>
          <LinkLi
            href="/product-controller/get-product-list"
            icon={<QueueListIcon {...iconProps} />}
          >
            Obter lista de produtos
          </LinkLi>
        </li>
        <li>
          <LinkLi
            href="/product-controller/create-new-product"
            icon={<PencilSquareIcon {...iconProps} />}
          >
            Criar novo produto
          </LinkLi>
        </li>
        <li>
          <LinkLi
            href="/product-controller/get-list-of-products-page"
            icon={<Square3Stack3DIcon {...iconProps} />}
          >
            Obter página de produtos
          </LinkLi>
        </li>
      </ul>
    </nav>
  );
};
