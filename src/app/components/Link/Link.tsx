'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNavContext } from '@/app/context/NavContext';
import classNames from 'classnames';

interface ILinkProps {
  children: ReactNode;
  icon?: ReactNode;
  href: string;
}

const LinkLi = ({ href, children, icon }: ILinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { active } = useNavContext();

  return (
    <Link
      className={classNames('hover:text-slate-400 flex items-center gap-2', {
        ['text-[#263248] font-bold']: isActive,
        ['text-gray-500']: !isActive,
        ['justify-center']: !active,
      })}
      href={href}
    >
      {icon} {/* Renderiza o ícone aqui */}
      {active ? children : ''}
    </Link>
  );
};

export default LinkLi;
