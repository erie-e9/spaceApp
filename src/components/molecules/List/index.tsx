import React, {
  Fragment,
  lazy,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList, ViewToken } from 'react-native';
const FlashList = lazy(() => import('@shopify/flash-list/src/FlashList'));
import { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import truncate from 'lodash/truncate';
import { Logger, useCopy } from '@services';
import { useResponseHandler, useTheme } from '@hooks';
import { Lottie, SVGIcon } from '@components/atoms';
import { BackButton, Loader, TextInput } from '@components/molecules';
import Item from './components/Item';
import {
  ListContainer,
  LoaderContainer,
  Container,
  ScrollToTopContainer,
  ScrollToTopButtonContainer,
  FloatingButton,
  ButtonsContainer,
  EmptyContainer,
  EmptyText,
  ReloadButton,
  ReloadText,
} from './styles';

export interface ListProps {
  data: Array<any>;
  horizontal?: boolean;
  numColumns?: number;
  scrollEnabled?: boolean;
  useFlashList?: boolean;
  draggable?: boolean;
  swipeable?: boolean;
  renderItem?: ({ item }: any) => JSX.Element;
  keyExtractor?: (item: T, index: number) => string;
  refreshHandler?: () => void;
  itemHeight?: number;
  footerComponent?: ReactElement;
  containerStyle?: any;
  filterBy?: string | string[];
  listEmptyComponent?: React.JSX.Element;
  searchLabel?: string;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showEmptyData?: boolean;
  showReload?: boolean;
  renderRightAction?: (item: any) => void;
  renderRightActions?: (item: any) => JSX.Element;
  renderLeftAction?: (item: any) => void;
  renderLeftActions?: (item: any) => JSX.Element;
  extraFunction?: () => void;
  onViewableItemsChanged?: (viewableItems: ViewToken[]) => void;
}

const List: React.FC<ListProps> = ({
  data,
  horizontal = false,
  numColumns = 1,
  scrollEnabled = true,
  useFlashList = false,
  draggable = false,
  swipeable = false,
  renderItem,
  keyExtractor,
  refreshHandler,
  itemHeight = 60,
  footerComponent,
  containerStyle,
  filterBy,
  listEmptyComponent,
  searchLabel,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  showEmptyData = false,
  showReload = false,
  renderRightAction,
  renderRightActions,
  renderLeftAction,
  renderLeftActions,
  extraFunction,
  onViewableItemsChanged,
}) => {
  const ref = useRef<FlatList>(null);
  const animationRef = useRef<LottieView>(null);
  const swipeableRef = useRef<SwipeableMethods | null>(null);
  const { getCopyValue } = useCopy();
  const { Animations } = useTheme();
  const { loading, setLoading } = useResponseHandler();
  const extraPaddingTop = useSharedValue(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const items = useMemo(() => data, [data]);
  const [filteredData, setFilteredData] = useState<Array<any>>(items);
  const searchTextLabel = useMemo(() => {
    return truncate(getCopyValue(searchLabel ? searchLabel : 'common:form.fields.inputs.search'), {
      length: 40,
      omission: '...',
    });
  }, [getCopyValue, searchLabel]);

  const getInitialPositions = useCallback(() => {
    let positions: any = {};
    items.forEach((item, index) => {
      positions[index] = {
        updatedIndex: index,
        updatedTop: index * itemHeight,
      };
    });
    return positions;
  }, [itemHeight, items]);

  const currentPositions = useSharedValue(getInitialPositions());

  const memoizedKeyExtractor = useCallback(
    (item: T, index: number) => keyExtractor?.(item, index) ?? String(index),
    [keyExtractor],
  );

  const contentContainerStyle = useMemo(
    () => ({
      height: data.length * itemHeight * 1.025,
    }),
    [data, itemHeight],
  );

  useEffect(() => {
    if (searchQuery) {
      const updatedItems = items.filter(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          (Array.isArray(filterBy) ? filterBy : [filterBy || 'id']).some((key) =>
            String(item[key])?.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredData(updatedItems);
    } else {
      setFilteredData(items);
    }
  }, [searchQuery, items, filterBy]);

  const onRefresh = useCallback(() => {
    try {
      refreshHandler?.();
    } catch (error) {
      Logger.log('List onRefresh', { error });
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  }, [refreshHandler, setLoading]);

  useEffect(() => {
    if (loading && refreshHandler && offsetY <= -80) {
      extraPaddingTop.value = withTiming(50, { duration: 0 });
      onRefresh();
    } else {
      extraPaddingTop.value = withTiming(0, {
        duration: 400,
        easing: Easing.elastic(0.7),
      });
    }
  }, [loading, extraPaddingTop, refreshHandler, offsetY, onRefresh]);

  const onSwipeableWillOpen = useCallback(
    (direction: 'left' | 'right', current: SwipeableMethods | null) => {
      if (swipeableRef.current) {
        swipeableRef.current.close();
      }
      swipeableRef.current = current;
    },
    [],
  );

  const handleScrollToTop = (): void => {
    ref.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  useEffect(() => {
    setShowScrollButton(offsetY > 500);
  }, [offsetY]);

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: withTiming(showScrollButton ? 1 : 0),
    transform: [{ scale: withTiming(showScrollButton ? 1 : 0) }],
  }));

  const renderItemHandler = useCallback(
    ({ item, index, current }: { item: any; index: number; current: SwipeableMethods | null }) => {
      return loading || item === null ? (
        <Fragment>{renderItem?.({ item, index })}</Fragment>
      ) : (
        <Item
          ref={(swipeableItemRef: SwipeableMethods | null) => (current = swipeableItemRef)}
          item={item}
          key={index}
          index={index}
          renderItem={renderItem}
          currentPositions={currentPositions}
          itemHeight={itemHeight}
          swipeable={swipeable}
          draggable={draggable}
          filteredUsers={items}
          onSwipeableWillOpen={(direction) => onSwipeableWillOpen(direction, current)}
          renderRightActions={renderRightActions}
          renderRightAction={(itemParam) => {
            // swipeableRef?.current?.close();
            renderRightAction?.(itemParam);
          }}
          renderLeftActions={renderLeftActions}
          renderLeftAction={(itemParam) => {
            // swipeableRef?.current?.close();
            renderLeftAction?.(itemParam);
          }}
        />
      );
    },
    [
      loading,
      renderItem,
      currentPositions,
      itemHeight,
      swipeable,
      draggable,
      items,
      renderRightActions,
      renderLeftActions,
      onSwipeableWillOpen,
      renderRightAction,
      renderLeftAction,
    ],
  );

  const FilterByComponent = useMemo(() => {
    return (
      <Container>
        <TextInput
          label={searchTextLabel}
          value={searchQuery}
          rightIcon="close"
          onChangeText={setSearchQuery}
          rightIconHandler={() => setSearchQuery('')}
        />
      </Container>
    );
  }, [searchTextLabel, searchQuery]);

  const viewabilityConfigCallback = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    onViewableItemsChanged?.(viewableItems);
  });

  const viewabilityConfig = useMemo(() => ({ viewAreaCoveragePercentThreshold: 50 }), []);

  const ListComponent = useFlashList ? FlashList : FlatList;

  return (
    <Fragment>
      {filterBy && items.length > 0 && items[0] !== null && FilterByComponent}
      <ListContainer>
        <Fragment>
          {offsetY > 500 && (
            <ScrollToTopContainer style={[buttonStyle]}>
              <ScrollToTopButtonContainer>
                <BackButton onPress={handleScrollToTop} />
              </ScrollToTopButtonContainer>
            </ScrollToTopContainer>
          )}
          <ListComponent
            ref={ref}
            data={filteredData}
            keyExtractor={memoizedKeyExtractor}
            // debug={true}
            windowSize={15}
            initialNumToRender={25}
            maxToRenderPerBatch={20}
            updateCellsBatchingPeriod={50}
            onEndReachedThreshold={0.1}
            removeClippedSubviews={true} //  items who are not visible on the screen are not loaded into memory
            getItemLayout={(_, index) => ({
              // a fixed height, use getItemLayout to avoid measuring each item dynamically.
              length: itemHeight,
              offset: itemHeight * index,
              index,
            })}
            numColumns={horizontal ? 1 : numColumns}
            viewabilityConfig={viewabilityConfig}
            onViewableItemsChanged={viewabilityConfigCallback.current}
            scrollEnabled={scrollEnabled}
            onScroll={({ nativeEvent }) => {
              setOffsetY(nativeEvent.contentOffset.y);
            }}
            ListEmptyComponent={
              showEmptyData ? (
                <Fragment>
                  {listEmptyComponent ? (
                    listEmptyComponent
                  ) : (
                    <EmptyContainer>
                      <Lottie
                        ref={animationRef}
                        source={Animations.working}
                        autoPlay={true}
                        renderMode="AUTOMATIC"
                        loop={true}
                        resizeMode="contain"
                        width={125}
                        height={125}
                      />
                      <EmptyText type="Subtitle2">common:emptyList</EmptyText>
                      {showReload && (
                        <ReloadButton onPress={() => refreshHandler?.()}>
                          <ReloadText type="Subtitle2" color="tertiary600">
                            common:tryagain
                          </ReloadText>
                          <SVGIcon icon="reload" iconColor="tertiary600" width={20} />
                        </ReloadButton>
                      )}
                    </EmptyContainer>
                  )}
                </Fragment>
              ) : (
                <Fragment />
              )
            }
            ListHeaderComponent={
              <Animated.View style={{ paddingTop: extraPaddingTop }}>
                {filteredData.length > 0 && loading && refreshHandler && (
                  <LoaderContainer height={extraPaddingTop.value}>
                    <Loader
                      animationRef={animationRef}
                      width={180}
                      height={extraPaddingTop.value}
                      progress={2}
                    />
                  </LoaderContainer>
                )}
              </Animated.View>
            }
            renderItem={({ item, index }) => {
              let current: SwipeableMethods | null = null;
              return renderItemHandler({ item, index, current });
            }}
            showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
            showsVerticalScrollIndicator={showsVerticalScrollIndicator}
            horizontal={horizontal}
            ListFooterComponent={footerComponent}
            contentContainerStyle={
              containerStyle
                ? containerStyle
                : (draggable || refreshHandler) && contentContainerStyle
            }
            estimatedItemSize={100}
          />
        </Fragment>
      </ListContainer>
      <ButtonsContainer>
        {extraFunction && (
          <FloatingButton
            onPress={extraFunction}
            type="Icon"
            icon="add"
            iconType="svg"
            weight={3}
          />
        )}
      </ButtonsContainer>
    </Fragment>
  );
};

export default memo(List);
