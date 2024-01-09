import { ICard, STATUS } from '../types/ICard';
import { create } from 'zustand';

type Store = {
  cards: ICard[];
  addCard: (card: ICard) => void;
  deleteCard: (card: ICard) => void;
  setAllCards: (card: ICard[]) => void;
  updateCard: (card: ICard) => void;
  updateCardsOrder: (
    oldStatus: STATUS,
    newStatus: STATUS,
    oldIndex: number,
    newIndex: number | null,
    callback: (items: { id: string; status: STATUS; order: number }[]) => void
  ) => void;
};

export const useCardStore = create<Store>((set) => ({
  cards: [],
  addCard: (card) =>
    set((state) => ({
      cards: [...state.cards, card],
    })),
  deleteCard: (card) =>
    set((state) => ({
      cards: state.cards.filter((el) => el.id !== card.id),
    })),
  updateCard: (card) =>
    set((state) => ({
      cards: state.cards.map((el) => (el.id === card.id ? card : el)),
    })),
  updateCardsOrder: (
    oldStatus,
    newStatus,
    oldIndex,
    newIndex,
    mutationReorder
  ) =>
    set((state) => {
      //нужно поменять порядок карточек
      const newOrderedData = [...state.cards];
      const sourceList = newOrderedData
        .filter((item) => item.status === oldStatus)
        .sort((card1, card2) => card1.order - card2.order);
      const destinationList = newOrderedData
        .filter((item) => item.status === newStatus)
        .sort((card1, card2) => card1.order - card2.order);
      if (typeof newIndex !== 'number') {
        // Если изменение только статуса, то карточка будет последней
        newIndex = destinationList.length || 0;
      }
      const [movedCard] = sourceList.splice(oldIndex, 1);
      if (!movedCard) {
        return {};
      }
      if (oldStatus === newStatus) {
        sourceList.splice(newIndex, 0, movedCard);
        sourceList.forEach((card, index) => (card.order = index));
      } else {
        movedCard.status = newStatus;
        destinationList.splice(newIndex, 0, movedCard);
        destinationList.forEach((card, index) => (card.order = index));
        sourceList.forEach((card, index) => (card.order = index));
      }
      const mutateData = destinationList.map((card) => ({
        id: card.id,
        order: card.order,
        status: card.status,
      }));
      mutationReorder(mutateData);
      return {
        cards: newOrderedData,
      };
    }),

  setAllCards: (cards) => set({ cards }),
}));
