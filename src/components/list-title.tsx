import { cn } from 'src/lib/utils';
import { STATUS } from 'src/types/ICard';

interface ListTitleProps {
  title: STATUS;
}

export const ListTitle = ({ title }: ListTitleProps) => {
  const borderColorClass = {
    TODO: 'border-red-500',
    DOING: 'border-orange-500',
    DONE: 'border-green-500',
  };
  return (
    <div
      className={cn(
        'flex-col justify w-[256px] shrink-0 rounded-xl border-t-4',
        borderColorClass[title]
      )}
    >
      <div
        className={cn(
          'static px-3 py-1.5 w-full h-11 font-patua font-medium flex items-center justify-center text-white text-2xl bg-slate-800 rounded-md border',
          borderColorClass[title]
        )}
      >
        {title}
      </div>
    </div>
  );
};
