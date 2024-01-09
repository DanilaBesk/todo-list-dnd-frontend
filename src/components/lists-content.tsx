import FlexXContainer from './flex-x-container';
import { ListContent } from './list-content';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { toast } from 'sonner';
import { getCards, reorderedCards } from '../api/cards';
import { useMutation, useQuery } from 'react-query';
import { useCardStore } from '../store/use-card-store';
import { STATUS } from 'src/types/ICard';
import { queryClient } from 'src';
import { ListSkeleton } from './list-skeleton';
import { useEffect } from 'react';

export const ListsContent = () => {
  const setAllCards = useCardStore((state) => state.setAllCards);
  const updateCardsOrderStore = useCardStore((state) => state.updateCardsOrder);

  const { error, data, refetch } = useQuery('cards', getCards, {
    enabled: false,
    onSuccess(data) {
      setAllCards(data.data);
    },
    refetchOnReconnect: true,
  });
  useEffect(() => {
    refetch();
  }, []);

  if (error instanceof Error) {
    toast.error(error.message);
  }

  const mutationUpdateReorder = useMutation(reorderedCards, {
    onSuccess() {
      queryClient.invalidateQueries('cards');
      toast.success('Card reordered');
      //приходят обновленные карточки, но я первее обновил пользовательский интерфейс в выгоду пользовательского опыта
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, type, source } = result;

    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    )
      return;

    if (type === 'card') {
      updateCardsOrderStore(
        source.droppableId as STATUS,
        destination.droppableId as STATUS,
        source.index,
        destination.index,
        (data) => {
          return mutationUpdateReorder.mutate({ items: data });
        }
      );
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <FlexXContainer className="overflow-auto no-scrollbar">
        {!data ? (
          <>
            <ListSkeleton />
            <ListSkeleton />
            <ListSkeleton />
          </>
        ) : (
          <>
            <ListContent status="TODO" />
            <ListContent status="DOING" />
            <ListContent status="DONE" />
          </>
        )}
      </FlexXContainer>
    </DragDropContext>
  );
};
