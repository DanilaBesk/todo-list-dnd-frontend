import { AxiosResponse } from 'axios';
import { $api } from '.';
import { ICard, STATUS } from '../types/ICard';

export const getCards = async () => {
  try {
    const response: AxiosResponse<{ data: ICard[] }> = await $api.get('/card');
    return response.data;
  } catch (error) {
    throw new Error('Не удалось получить данные');
  }
};

export const createCard = async ({
  title,
  status = 'TODO',
}: {
  title: string;
  status: STATUS;
}) => {
  try {
    const response: AxiosResponse<{ data: ICard }> = await $api.post('/card', {
      title,
      status,
    });
    return response.data;
  } catch (error) {
    throw new Error('Не удалось создать');
  }
};

export const updateCard = async ({
  id,
  ...updatedData
}: {
  id: string;
  description?: string;
  title?: string;
}) => {
  try {
    const response: AxiosResponse<{ data: ICard }> = await $api.patch(
      `/card/${id}`,
      {
        ...updatedData,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Не удалось обновить');
  }
};

export const reorderedCards = async ({
  items,
}: {
  items: { id: string; order: number; status: STATUS }[];
}) => {
  try {
    const response: AxiosResponse<{ data: ICard[] }> = await $api.patch(
      '/card-reorder',
      {
        items,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Не удалось переместить');
  }
};

export const deleteCard = async ({ id }: { id: string }) => {
  try {
    const response: AxiosResponse<{ data: ICard }> = await $api.delete(
      `/card/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error('Не удалось удалить');
  }
};
