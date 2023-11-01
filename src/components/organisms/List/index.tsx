import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useBlankAreaTracker } from '@shopify/flash-list';
import { screen_height } from '@utils/functions';
import { Logger } from '@services';
import ListItem from './components/ListItem';
import { StyledList } from './styles';

interface ListProps {
  data: Array<string>;
  estimatedItemSize?: number;
  renderItem?: ({ item }: any) => JSX.Element;
  horizontal?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
}

export const List: React.FC<ListProps> = ({
  data,
  estimatedItemSize,
  renderItem,
  horizontal,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
}) => {
  const ref = useRef(null);
  const [blankAreaTrakerResult, onBlankArea] = useBlankAreaTracker(ref);

  const renderElement = useCallback(
    ({ item, index }: { item: any; index: number }): JSX.Element | null => {
      return (
        <ListItem key={index} title={item.title} subtitle={item.subtitle} />
      );
    },
    [],
  );

  const onLoadListener = useCallback(
    (info: { elapsedTimeInMs: number }): void => {
      Logger.log('onLoadListener: ', { info });
    },
    [],
  );

  useEffect(() => {
    return () => {
      Logger.log('On blank area', { blankAreaTrakerResult }); // lower value means less blank space and better performance, might be less of 150ms
    };
  }, []);

  return (
    <StyledList
      ref={ref}
      data={data}
      keyExtractor={(item: unknown, index: number): string => `key${index}`}
      getItemType={(item: any) => (item.type ? item.type : 'Text')}
      estimatedItemSize={estimatedItemSize || screen_height / data.length}
      horizontal={horizontal}
      keyboardDismissMode="interactive"
      renderItem={renderItem || renderElement}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      onLoad={onLoadListener}
      onBlankArea={onBlankArea}
    />
  );
};

List.defaultProps = {
  estimatedItemSize: undefined,
  renderItem: undefined,
  horizontal: false,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
};

export default memo(List);
