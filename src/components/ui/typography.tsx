import { cn } from '@/lib/utils';

type Typography<Element extends HTMLElement> = {
  children: React.ReactNode;
} & React.HTMLAttributes<Element>;

export const H1 = ({ children, className, ...rest }: Typography<HTMLHeadingElement>) => {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...rest}>
      {children}
    </h1>
  );
};

export const H2 = ({ children, className, ...rest }: Typography<HTMLHeadingElement>) => {
  return (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        className
      )}
      {...rest}>
      {children}
    </h2>
  );
};

export const H3 = ({ children, className, ...rest }: Typography<HTMLHeadingElement>) => {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h3>
  );
};

export const H4 = ({ children, className, ...rest }: Typography<HTMLHeadingElement>) => {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...rest}>
      {children}
    </h4>
  );
};

export const Paragraph = ({ children, className, ...rest }: Typography<HTMLParagraphElement>) => {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...rest}>
      {children}
    </p>
  );
};

export const Lead = ({ children, className, ...rest }: Typography<HTMLParagraphElement>) => {
  return (
    <p className={cn('text-xl text-muted-foreground', className)} {...rest}>
      {children}
    </p>
  );
};

export const Blockquote = ({ children, className, ...rest }: Typography<HTMLElement>) => {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...rest}>
      {children}
    </blockquote>
  );
};
