import { ListsTitle } from './lists-title';
import { ListsContent } from './lists-content';
import { ListsFormCreate } from './lists-form-create';

export const ListsContainer = () => {
  return (
    <ol className="px-1 gap-x-3 min-h-[450px] select-none mx-auto">
      <ListsTitle />
      <ListsContent />
      <ListsFormCreate />
    </ol>
  );
};
