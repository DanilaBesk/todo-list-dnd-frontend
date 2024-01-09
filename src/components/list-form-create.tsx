import { PenSquare } from 'lucide-react';
import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { useOnClickOutside } from 'usehooks-ts';
import { createCard } from '../api/cards';
import { useCardStore } from '../store/use-card-store';
import { STATUS } from '../types/ICard';
import { Input } from './ui/input';
import { queryClient } from 'src';

interface ListFormCreateProps {
  status: STATUS;
}

export const ListFormCreate = ({ status }: ListFormCreateProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addCard = useCardStore((state) => state.addCard);

  const mutationCreate = useMutation(createCard, {
    onSuccess(data) {
      addCard(data.data);
      disableEditing();
      toast.success(`card "${data.data.title}" created`);
      queryClient.invalidateQueries('cards');
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };
  const disableEditing = () => {
    setIsEditing(false);
  };
  useOnClickOutside(inputRef, disableEditing);

  const colorClass = {
    TODO: 'red-500',
    DOING: 'orange-500',
    DONE: 'green-500',
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    e.preventDefault();
    mutationCreate.mutate({ status, title });
  };
  return (
    <div className="w-[256px] flex items-center mb-2">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="w-full">
          <Input
            disabled={mutationCreate.isLoading}
            name="title"
            ref={inputRef}
            onBlur={disableEditing}
            className={`text-white text-md px-2 py-1 h-9 border-${colorClass[status]} font-medium hover:border-${colorClass[status]} focus:border-${colorClass[status]} rounded-md transition`}
            type="text"
            placeholder="Enter card title..."
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className={`h-9 bg-slate-800 w-full border rounded-md px-2 py-1 flex items-center justify-end border-${colorClass[status]}`}
        >
          <PenSquare className={`w-5 h-5 text-${colorClass[status]}`} />
        </div>
      )}
    </div>
  );
};
