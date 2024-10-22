'use client';
import React from 'react';
import Image from 'next/image';
import LinkLi from '../Link/Link';
import { useNavContext } from '@/app/context/NavContext';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { NumberedListIcon } from '@heroicons/react/24/solid';
import { QueueListIcon } from '@heroicons/react/24/solid';
import { Square3Stack3DIcon } from '@heroicons/react/24/solid';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

export const Nav = () => {
  const { active, setActive } = useNavContext();

  const iconClassName = classNames(
    'h-6 w-6 text-gray-500 cursor-pointer hover:fill-[#354C76]',
    {
      ['fill-[#354C76]']: !active,
    },
  );
  // const iconClassName =
  //   'h-6 w-6 text-gray-500 cursor-pointer hover:fill-[#354C76]';

  const iconProps = {
    height: 26,
    color: '#263248',
    className: iconClassName,
  };

  return (
    <nav
      className={classNames(
        'flex flex-col h-screen bg-nav p-3 w-60 overflow-hidden',
        {
          ['w-60']: active,
          ['w-24']: !active,
        },
      )}
    >
      <Bars3Icon
        onClick={() => setActive(!active)}
        className={classNames(
          'transition ease-in-out delay-150 h-8 w-8 text-gray-500 mb-6 hover:scale-110 cursor-pointer select-none',
          {
            ['mx-auto']: !active,
          },
        )}
      />
      <Image
        src="/logo.svg"
        alt="Logo"
        width={200}
        height={200}
        className="mx-auto"
      />
      <ul
        className={classNames('flex flex-col gap-2 mt-24', {
          ['gap-6']: !active,
        })}
      >
        <li>
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
