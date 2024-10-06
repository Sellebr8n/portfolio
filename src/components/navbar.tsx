'use client';

import { usePathname } from 'next/navigation';
import { Sprite } from './avatar';
import Link from 'next/link';

const getActiveLinkStyle = (path: string, className: string) => {
  return (match: string) => (match === path ? `${className} font-bold bg-slate-800` : className);
};

const Navbar = () => {
  const path = usePathname();
  if (path === '/resume') {
    return null;
  }

  const withActivePath = getActiveLinkStyle(path, 'text-white p-4 min-w-20 h-full');

  return (
    <nav className="bg-primary z-10 sticky top-0 px-4 shadow-sm flex justify-between items-center h-[55px]">
      <div className="">
        <Link href="/">
          <Sprite src="/images/sprite.webp" width={40} height={40} />
        </Link>
      </div>
      <div className="h-full items-center flex text-center">
        <Link href="/projects" className={withActivePath('/projects')}>
          Projects
        </Link>
        <Link href="/blogs" className={withActivePath('/blogs')}>
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
