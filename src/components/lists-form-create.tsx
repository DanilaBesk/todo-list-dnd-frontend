import FlexXContainer from './flex-x-container';
import { ListFormCreate } from './list-form-create';

export const ListsFormCreate = () => {
  return (
    <FlexXContainer>
      <ListFormCreate status="TODO" />
      <ListFormCreate status="DOING" />
      <ListFormCreate status="DONE" />
    </FlexXContainer>
  );
};
