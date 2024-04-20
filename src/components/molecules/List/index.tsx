import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useBlankAreaTracker } from '@shopify/flash-list';
import { screen_height } from '@utils/functions';
import { Logger } from '@services';
import ListItem from '@components/molecules/List/components/ListItem';
import { StyledList } from './styles';
import { useWindowDimensions } from 'react-native';

interface ListProps {
  data: Array<string>;
  estimatedItemSize?: number;
  renderItem?: ({ item }: any) => JSX.Element;
  horizontal?: boolean;
  numColumns?: number;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  refreshHanlder?: () => undefined;
}

export const List: React.FC<ListProps> = ({
  data,
  estimatedItemSize,
  renderItem,
  numColumns,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
  refreshHanlder,
}) => {
  const ref = useRef(null);
  const { width: windowWidth } = useWindowDimensions();

  const [refreshing, setRefreshing] = useState(false);
  const [blankAreaTrakerResult, onBlankArea] = useBlankAreaTracker(ref);
  const items = useMemo(() => data, [data]);

  const minCols = numColumns || 1;

  const calcNumColumns = useCallback(() => {
    const swidth = windowWidth / minCols - 1;
    const smargin = 1;

    const cols = windowWidth / swidth;
    const colsFloor = Math.floor(cols) > minCols ? Math.floor(cols) : minCols;
    const colsMinusMargin = cols - 2 * colsFloor * smargin;
    if (colsMinusMargin < colsFloor && colsFloor > minCols) {
      return colsFloor - 1;
    } else return colsFloor;
  }, [windowWidth]);

  const [numberColumns, setNumColumns] = useState(calcNumColumns());
  const renderElement = useCallback(
    ({ item, index }: { item: any; index: number }): React.JSX.Element| null => {
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

  useEffect(() => {
    setNumColumns(calcNumColumns());
  }, [windowWidth]);

  return (
    <StyledList
      ref={ref}
      onEndReachedThreshold={0.1}
      data={items}
      numColumns={numberColumns}
      refreshing={refreshing}
      onRefresh={
        refreshHanlder
          ? () => {
              setRefreshing(true);
              setTimeout(() => {
                refreshHanlder();
                setRefreshing(false);
              }, 2000);
            }
          : null
      }
      keyExtractor={(_item: unknown, index: React.Key): string => `key${index}`}
      getItemType={(item: any) => (item.type ? item.type : 'Text')}
      estimatedItemSize={estimatedItemSize || screen_height / data.length}
      // horizontal={horizontal}
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
  estimatedItemSize: 50,
  renderItem: undefined,
  horizontal: false,
  numColumns: 1,
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  refreshHanlder: undefined,
};

export default memo(List);
