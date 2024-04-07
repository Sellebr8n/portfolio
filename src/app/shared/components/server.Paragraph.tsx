import cn from 'classnames';

const Paragraph = ({ children, className }: { className?: string; children: React.ReactNode }) => (
  <p className={cn('text-center max-w-screen-md md:p-4 p-0 my-4', className)}>{children}</p>
);

export default Paragraph;
