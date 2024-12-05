import React, {
  Fragment,
  lazy,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FlatList } from 'react-native';
// import FlashList from '@shopify/flash-list/src/FlashList';
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
import { useResponseHandler } from '@hooks';
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
  refreshHandler?: () => void;
  itemHeight?: number;
  footerComponent?: React.ReactElement;
  containerStyle?: any;
  filterBy?: string | string[];
  listEmptyComponent?: React.ReactElement;
  searchLabel?: string;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  renderRightAction?: (item: any) => void;
  renderRightActions?: (item: any) => JSX.Element;
  renderLeftAction?: (item: any) => void;
  renderLeftActions?: (item: any) => JSX.Element;
  extraFunction?: () => void;
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
  refreshHandler,
  itemHeight = 60,
  footerComponent,
  containerStyle,
  filterBy,
  listEmptyComponent,
  searchLabel,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  renderRightAction,
  renderRightActions,
  renderLeftAction,
  renderLeftActions,
  extraFunction,
}) => {
  const ref = useRef<FlatList>(null);
  const animationRef = useRef<LottieView>(null);
  const swipeableRef = useRef<SwipeableMethods | null>(null);
  const { getCopyValue } = useCopy();
  const { loading, setLoading } = useResponseHandler();
  const [offsetY, setOffsetY] = useState<number>(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<Array<any>>(data);
  const extraPaddingTop = useSharedValue(0);

  const items = useMemo(() => data, [data]);
  const searchTextLabel = useMemo(() => {
    return truncate(getCopyValue(searchLabel ? searchLabel : 'common:forms.fields.inputs.search'), {
      length: 45,
      omission: '...',
    });
  }, [searchLabel]);

  const getInitialPositions = useCallback(() => {
    let positions: any = {};
    items.forEach((item, index) => {
      positions[index] = {
        updatedIndex: index,
        updatedTop: index * itemHeight,
      };
    });
    return positions;
  }, [items]);

  const currentPositions = useSharedValue(getInitialPositions());

  const contentContainerStyle = useMemo(
    () => ({
      height: data.length * itemHeight * 1.025,
    }),
    [data, itemHeight],
  );

  useEffect(() => {
    if (searchQuery) {
      const updatedItems = data.filter(
        (item) =>
          typeof item === 'object' &&
          item !== null &&
          (Array.isArray(filterBy) ? filterBy : [filterBy || 'id']).some((key) =>
            String(item[key])?.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
      setFilteredUsers(updatedItems);
    } else {
      setFilteredUsers(data);
    }
  }, [searchQuery, data, filterBy]);

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
    [swipeableRef.current],
  );

  const handleScrollToTop = () => {
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
      return (
        <Item
          ref={(swipeableItemRef: SwipeableMethods | null) => (current = swipeableItemRef)}
          item={item}
          key={item}
          index={index}
          renderItem={renderItem}
          currentPositions={currentPositions}
          filteredUsers={filteredUsers}
          itemHeight={itemHeight}
          swipeable={swipeable}
          draggable={draggable}
          onSwipeableWillOpen={(direction) => onSwipeableWillOpen(direction, current)}
          renderRightActions={renderRightActions}
          renderRightAction={(item) => {
            // swipeableRef?.current?.close();
            renderRightAction?.(item);
          }}
          renderLeftActions={renderLeftActions}
          renderLeftAction={(item) => {
            // swipeableRef?.current?.close();
            renderLeftAction?.(item);
          }}
        />
      );
    },
    [
      renderItem,
      onSwipeableWillOpen,
      swipeable,
      draggable,
      currentPositions,
      filteredUsers,
      itemHeight,
      renderRightActions,
      renderRightAction,
      renderLeftActions,
      renderLeftAction,
    ],
  );

  const ListComponent = useFlashList ? FlashList : FlatList;

  return (
    <Fragment>
      {filterBy && (
        <Container>
          <TextInput
            label={searchTextLabel}
            value={searchQuery}
            onChangeText={setSearchQuery}
            rightIcon="clear"
            rightIconHandler={() => setSearchQuery('')}
          />
        </Container>
      )}
      <ListContainer>
        <ScrollToTopContainer style={[buttonStyle]}>
          <ScrollToTopButtonContainer>
            <BackButton onPress={handleScrollToTop} />
          </ScrollToTopButtonContainer>
        </ScrollToTopContainer>
        <ListComponent
          ref={ref}
          data={filteredUsers}
          keyExtractor={(_, index) => `key${index}`}
          // debug={true}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          // removeClippedSubviews={true}
          numColumns={horizontal ? 1 : numColumns}
          scrollEnabled={scrollEnabled}
          onScroll={({ nativeEvent }) => {
            setOffsetY(nativeEvent.contentOffset.y);
          }}
          ListEmptyComponent={listEmptyComponent}
          ListHeaderComponent={
            <Animated.View style={{ paddingTop: extraPaddingTop }}>
              {filteredUsers.length > 0 && loading && refreshHandler && (
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
            containerStyle ? containerStyle : (draggable || refreshHandler) && contentContainerStyle
          }
          estimatedItemSize={itemHeight}
        />
      </ListContainer>
      <ButtonsContainer>
        {extraFunction && (
          <FloatingButton
            onPress={extraFunction}
            type="Icon"
            icon="add"
            iconType="svg"
            fontWeight={3}
          ></FloatingButton>
        )}
      </ButtonsContainer>
    </Fragment>
  );
};

export default memo(List);
