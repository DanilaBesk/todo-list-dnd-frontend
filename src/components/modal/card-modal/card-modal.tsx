import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { useCardModal } from '../../../store/use-card-modal';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { useEffect, useState } from 'react';
import { cn } from '../../../lib/utils';
import { RadioGroup, RadioGroupItem } from '../../ui/radio';
import { STATUS } from '../../../types/ICard';
import { useMutation } from 'react-query';
import { deleteCard, updateCard, reorderedCards } from '../../../api/cards';
import { useCardStore } from 'src/store/use-card-store';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { queryClient } from '../../..';

export const CardModal = () => {
  const card = useCardModal((state) => state.card);

  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const [updatedStatus, setUpdatedStatus] = useState<STATUS>();
  const onStatusChange = (status: STATUS) => {
    setUpdatedStatus(status);
  };
  useEffect(() => {
    setUpdatedStatus(card?.status);
  }, [isOpen, card]);

  const updateCardStore = useCardStore((state) => state.updateCard);
  const deleteCardStore = useCardStore((state) => state.deleteCard);
  const updateCardsOrderStore = useCardStore((state) => state.updateCardsOrder);

  const mutationUpdate = useMutation(updateCard, {
    onSuccess(data) {
      updateCardStore(data.data);
      onClose();
      queryClient.invalidateQueries('cards');
      toast.success(`Card "${data.data.title}" updated`);
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  const mutationUpdateReorder = useMutation(reorderedCards, {
    onSuccess() {
      onClose();
      queryClient.invalidateQueries('cards');
      toast.success(`Card reordered`);
      //приходят обновленные карточки, но я первее обновил пользовательский интерфейс в выгоду пользовательского опыта; проверить данные?
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!card?.id) return;

    const formData = new FormData(e.currentTarget);

    const formTitle = formData.get('title') as string;
    const formTextarea = formData.get('textarea') as string;
    if (
      formTitle === card.title &&
      formTextarea === (card.description || '') &&
      updatedStatus === card.status
    ) {
      return onClose();
    }
    if (formTitle !== card.title || formTextarea !== (card.description || ''))
      mutationUpdate.mutate({
        id: card?.id!,
        description: formTextarea,
        title: formTitle,
      });
    if (updatedStatus !== card?.status) {
      updateCardsOrderStore(
        card.status,
        updatedStatus || card.status,
        card.order,
        null,
        (data) => mutationUpdateReorder.mutate({ items: data })
      );
    }
  };
  const mutationDelete = useMutation(deleteCard, {
    onSuccess(data) {
      deleteCardStore(data.data);
      onClose();
      queryClient.invalidateQueries('cards');
      toast.success(`Card "${data.data.title}" deleted`);
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  const onCardDelete = () => {
    mutationDelete.mutate({ id: card?.id! });
  };
  const statusClass: Record<STATUS, string> = {
    TODO: 'text-red-500',
    DOING: 'text-orange-500',
    DONE: 'text-green-500',
  };
  const isLoading =
    mutationDelete.isLoading ||
    mutationUpdate.isLoading ||
    mutationUpdateReorder.isLoading;
  if (!card) {
    onClose();
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form
          onSubmit={handleSubmit}
          className="text-white flex flex-col space-y-2 items-stretch justify-start py-1 gap-y-0"
        >
          <div className="w-48 flex items-center justify-between gap-x-3">
            <DialogTitle className="text-lg font-normal">
              Status:{' '}
              <span
                className={cn(
                  'font-patua',
                  statusClass[updatedStatus || card.status]
                )}
              >
                {updatedStatus || card.status}
              </span>
            </DialogTitle>
            <RadioGroup
              value={updatedStatus || card.status}
              className="flex"
              disabled={isLoading}
              onValueChange={onStatusChange}
            >
              <RadioGroupItem value="TODO" />
              <RadioGroupItem value="DOING" />
              <RadioGroupItem value="DONE" />
            </RadioGroup>
          </div>
          <Label htmlFor="title" className="text-xs font-normal">
            Title
            <Input
              autoFocus={true}
              disabled={isLoading}
              required
              className="border border-white px-2 py-1"
              id="title"
              name="title"
              type="text"
              defaultValue={card.title}
            />
          </Label>
          <Label className="text-xs font-normal" htmlFor="textarea">
            Description
            <Textarea
              disabled={isLoading}
              id="textarea"
              name="textarea"
              className="resize-none px-3 py-1.5 h-24 no-scrollbar"
              defaultValue={card.description || ''}
            />
          </Label>
          <div className="flex justify-between items-center">
            <div className="font-normal sm:text-xs text-xxxs">
              <div className="flex justify-between">
                Created at:{' '}
                <span
                  className={cn(
                    'sm:ml-2 ml-1',
                    statusClass[updatedStatus || card.status]
                  )}
                >
                  {new Date(card.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                Last update at:{' '}
                <span
                  className={cn(
                    'sm:ml-2 ml-1 ',
                    statusClass[updatedStatus || card.status]
                  )}
                >
                  {new Date(card.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={isLoading}
              onClick={onCardDelete}
              className="w-auto h-auto disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="w-6 h-6 text-red-700 hover:text-red-500 transition active:opacity-70" />
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-slate-800 active:opacity-70 hover:border hover:border-white transition active: px-2 py-1 rounded-md font-medium sm:text-sm sm:h-8 h-7 sm:w-[7rem] w-[6rem] text-xs flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Save changes'
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
