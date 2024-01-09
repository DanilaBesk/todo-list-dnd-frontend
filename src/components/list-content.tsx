import { Droppable } from '@hello-pangea/dnd';
import { useCardStore } from '../store/use-card-store';
import { STATUS } from '../types/ICard';
import { CardItem } from './card-item';

interface ListContentProps {
  status: STATUS;
}

export const ListContent = ({ status }: ListContentProps) => {
  const cards = useCardStore((state) => state.cards);

  return (
    <Droppable droppableId={status} type="card">
      {(provided) => (
        <ol
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="space-y-2 h-[70vh] w-[256px] pt-1.5 p-1"
        >
          {cards
            ?.filter((card) => card.status === status)
            .sort((card1, card2) => card1.order - card2.order)
            .map((card, index) => (
              <CardItem index={index} card={card} key={card.id} />
            ))}
          {provided.placeholder}
        </ol>
      )}
    </Droppable>
  );
};
