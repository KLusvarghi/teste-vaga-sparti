'use client'

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface ILinkProps {
  children: ReactNode;
  href: string;
}

const LinkLi = ({ href, children }: ILinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href;


  return <Link className={`hover:text-slate-400 ${isActive ? 'text-[#263248] font-bold' : 'text-gray-500'}`} href={href}>{children} {}</Link>;
};

export default LinkLi;
