import React, { memo, useCallback } from 'react';
import { screen_height } from '@utils/functions';
import ListItem from './components/ListItem';
import { StyledList } from './styles';

interface ListProps {
  data: Array<string>;
  estimatedItemSize?: number;
  renderItem?: ({ item }: any) => JSX.Element;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
}

export const List: React.FC<ListProps> = ({
  data,
  estimatedItemSize,
  renderItem,
  horizontal,
  showsHorizontalScrollIndicator,
}) => {
  const renderElement = useCallback(
    ({ item, index }: { item: any; index: number }): JSX.Element | null => {
      return (
        <ListItem key={index} title={item.title} subtitle={item.subtitle} />
      );
    },
    [],
  );

  return (
    <StyledList
      data={data}
      keyExtractor={(item: unknown, index: number): string => `key${index}`}
      getItemType={(item: any) => (item.type ? item.type : null)}
      estimatedItemSize={estimatedItemSize || screen_height / data.length}
      horizontal={horizontal}
      keyboardDismissMode="interactive"
      renderItem={renderItem || renderElement}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    />
  );
};

List.defaultProps = {
  estimatedItemSize: undefined,
  renderItem: undefined,
  horizontal: false,
  showsHorizontalScrollIndicator: false,
};

export default memo(List);
