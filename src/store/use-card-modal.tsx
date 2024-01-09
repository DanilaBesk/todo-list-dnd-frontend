import { ICard } from '../types/ICard';
import { create } from 'zustand';

type Store = {
  card: ICard | null;
  isOpen: boolean;
  onOpen: (card: ICard) => void;
  onClose: () => void;
};

export const useCardModal = create<Store>((set) => ({
  card: null,
  isOpen: false,
  onOpen: (card: ICard) => set({ isOpen: true, card }),
  onClose: () => set({ card: null, isOpen: false }),
}));
