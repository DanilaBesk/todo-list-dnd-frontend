import { cn } from 'src/lib/utils';
import { useCardModal } from '../store/use-card-modal';
import { ICard } from '../types/ICard';
import { Draggable } from '@hello-pangea/dnd';

interface CardItemProps {
  card: ICard;
  index: number;
}

export const CardItem = ({ index, card }: CardItemProps) => {
  const onOpen = useCardModal((state) => state.onOpen);
  const borderClass = {
    TODO: 'border-red-500',
    DOING: 'border-orange-500',
    DONE: 'border-green-500',
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => onOpen(card)}
          className={cn(
            'w-full border text-white hover:border-none transition-colors h-9 px-2 py-0 text-base flex items-center hover:shadow-card bg-slate-800 rounded-md',
            borderClass[card.status]
          )}
        >
          <p className="truncate">{card.title}</p>
        </div>
      )}
    </Draggable>
  );
};
