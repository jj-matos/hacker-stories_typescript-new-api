import * as React from 'react';
import { sortBy } from 'lodash';

import styled from 'styled-components';

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  a {
    color:inherit;
  }
  width: ${(props) => props.width};
`;

const StyledButton = styled.button`
  background: transparent;
  border: 1px solid #171212;
  padding: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in;
  &:hover > svg > g {
    background: #171212;
    color: #ffffff;
  }
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => sortBy(list, 'title'),
  BY: (list) => sortBy(list, 'by'),
  DESCENDANTS: (list) => sortBy(list, 'descendants').reverse(),
  SCORE: (list) => sortBy(list, 'score').reverse(),
};

type Story = {
  id: string;
  url: string;
  title: string;
  by: string;
  descendants: number;
  score: number;
};

type Stories = Array<Story>;

type ListProps = {
  list: Stories;
  onSortList: string;
  onRemoveItem: (item: Story) => void;
};

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
  <div>
    <ul>
      <StyledItem>
        <StyledColumn width="40%">
          <StyledButtonSmall
            type="button" 
            onClick={() => handleSort('TITLE')}
          >
            Title
          </StyledButtonSmall>
        </StyledColumn>
        <StyledColumn width="30%">
          <StyledButtonSmall
            type="button" 
            onClick={() => handleSort('BY')}
          >
            Author
          </StyledButtonSmall>
        </StyledColumn>
        <StyledColumn width="10%">
          <StyledButtonSmall
            type="button" 
            onClick={() => handleSort('DESCENDANTS')}
          >
            Comments
          </StyledButtonSmall>
         </StyledColumn>
        <StyledColumn width="10%">
          <StyledButtonSmall
            type="button" 
            onClick={() => handleSort('SCORE')}
          >
            Points
          </StyledButtonSmall>
        </StyledColumn>
        <StyledColumn width="10%">
          <span>Actions</span>
        </StyledColumn>
      </StyledItem>

      {console.log(list)}

      {sortedList.map((item) => (
        <Item
          key={item.id}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
      {console.log(list)}
    </ul>
  </div>
  );
};

type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

const Item = ({ item, onRemoveItem }: ItemProps) => (
  <StyledItem>
    <StyledColumn width="40%">
      <a href={item.url}>{item.title}</a>
    </StyledColumn>
    <StyledColumn width="30%">{item.by}</StyledColumn>
    <StyledColumn width="10%">{item.descendants}</StyledColumn>
    <StyledColumn width="10%">{item.score}</StyledColumn>
    <StyledColumn width="10%">
    <StyledButtonSmall
      type="button" 
      onClick={() => onRemoveItem(item)}
    >
      Dismiss
    </StyledButtonSmall>
    </StyledColumn>
  </StyledItem>
);

export { List, Item };