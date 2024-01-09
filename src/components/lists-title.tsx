import FlexXContainer from './flex-x-container';
import { ListTitle } from './list-title';

export const ListsTitle = () => {
  return (
    <FlexXContainer>
      <ListTitle title="TODO" />
      <ListTitle title="DOING" />
      <ListTitle title="DONE" />
    </FlexXContainer>
  );
};
