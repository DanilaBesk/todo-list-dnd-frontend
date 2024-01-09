export type STATUS = 'TODO' | 'DOING' | 'DONE';
export interface ICard {
  id: string;
  title: string;
  description: string | null;
  order: number;
  status: STATUS;
  createdAt: Date;
  updatedAt: Date;
}
