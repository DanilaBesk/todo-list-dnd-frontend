import { cn } from 'src/lib/utils';

type FlexXContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const FlexXContainer = ({ children, className }: FlexXContainerProps) => {
  return (
    <div className={cn('flex justify-between gap-x-3', className)}>
      {children}
    </div>
  );
};

export default FlexXContainer;
