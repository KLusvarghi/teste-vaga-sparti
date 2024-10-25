'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

interface ILinkProps {
  children: ReactNode;
  icon?: ReactNode;
  href: string;
}

const LinkLi = ({ href, children, icon }: ILinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={classNames('hover:text-slate-400 flex items-center gap-2', {
        ['text-[#263248] font-bold']: isActive,
      })}
      href={href}
    >
      {icon} {/* Renderiza o ícone aqui */}
      {children}
    </Link>
  );
};

export default LinkLi;
