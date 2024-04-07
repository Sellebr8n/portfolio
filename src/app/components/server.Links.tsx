import cn from 'classnames';
import Link from 'next/link';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Links = () => {
  return (
    <div className="grid md:grid-cols-4 gap-4 grid-cols-2 text-center *:max-w-[150px] ">
      <a
        href="https://www.linkedin.com/in/ludvig-sellebraten"
        target="_blank"
        className={cn(
          'hover:bg-blue-700',
          'flex items-center justify-center',
          'bg-blue-600 border-2 border-blue-800 px-4',
          'py-2 rounded-md',
          'shadow-[0.25em_0.25em_0_0]',
          'dark:shadow-none',
          'shadow-blue-900'
        )}>
        <FaLinkedinIn className="mr-2 w-5 h-5 text-white" />{' '}
        <span className="text-white">Linkedin</span>
      </a>
      <a
        href="https://www.github.com/Sellebr8n"
        target="_blank"
        className={cn(
          'hover:bg-zinc-800',
          'flex items-center justify-center',
          'bg-black border-2 border-zinc-700',
          'px-4 py-2 rounded-md',
          'shadow-[0.25em_0.25em_0_0]',
          'dark:shadow-none',
          'shadow-zinc-900 dark:shadow-zinc-700'
        )}>
        <FaGithub className="mr-2 w-5 h-5 text-white" /> <span className="text-white">Github</span>
      </a>
      <Link
        className={cn(
          'px-4 py-2 rounded-md border-2',
          'border-[--foreground]',
          'shadow-[0.25em_0.25em_0_0]',
          'dark:shadow-none dark:hover:bg-zinc-900',
          'hover:bg-zinc-200'
        )}
        href="/projects">
        Projects
      </Link>
      <Link
        className={cn(
          'px-4 py-2 rounded-md border-2',
          'border-[--foreground]',
          'shadow-[0.25em_0.25em_0_0]',
          'dark:shadow-none dark:hover:bg-zinc-900',
          'hover:bg-zinc-200'
        )}
        href="/blog">
        Blog
      </Link>
    </div>
  );
};

export default Links;
