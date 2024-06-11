/* eslint-disable react/no-array-index-key */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Platform, useWindowDimensions, ListRenderItem } from 'react-native';
import { DefaultTheme } from 'styled-components';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { useSVG, useTheme } from '@hooks';
import {
  screen_height,
  listToObject,
  clamp,
  objectMove,
  removeItemFromArrray,
} from '@utils/functions';
import ListMenuItem from '@components/organisms/List/components/ListMenuItem';
import ListItemView from '@components/organisms//List/components/ListItem';
// import { Features } from '@redux/types/features';
import {
  DeleteItemButton,
  MoveItemButton,
  ItemContainer,
  ItemContent,
  ListContainer,
  StyledInput,
  TouchableItem,
  TitleText,
  ValueText,
  ChildrenView,
  ValueTextContainer,
  ListMenuItemRightSide,
  ListMenuItemBadgeContainer,
  CallToActionButton,
  CallToActionLabel,
  ButtonContainer,
  PrimaryButton,
  CallToActionView,
  SorteableListView,
  MovableItemAnimatedContainer,
  PanHandlerAnimatedView,
} from './styles';

interface ListItemProps {
  value: string;
  title?: string;
  icon?: JSX.Element;
  onPress?: () => void;
  testID?: string;
  isGreyed?: boolean;
  featureFlags?: string[];
  badge?: JSX.Element;
}
export const ListItem: React.FC<ListItemProps> = ({
  value,
  title = undefined,
  icon = undefined,
  onPress = undefined,
  testID = 'listItem',
  isGreyed = false,
  featureFlags = [],
  badge = undefined,
}) => {
  const RightArrow = useSVG('right-arrow');

  const featureProps: Record<string, unknown> = {
    featureFlags: featureFlags || [],
    disabled: featureFlags === undefined ? isGreyed : false,
  };

  if (featureFlags === undefined) {
    featureProps.isGreyed = isGreyed;
  }

  const handleColorText = (): keyof DefaultTheme['tokens']['colors'] => {
    let documentStatus = 'darkBlueD4';
    if (value.includes('Up')) {
      documentStatus = `success_accent`;
    } else if (value.includes('Expired')) {
      documentStatus = `danger_accent`;
    }
    return documentStatus as keyof DefaultTheme['tokens']['colors'];
  };

  return (
    <TouchableItem testID={testID} onPress={onPress} {...featureProps}>
      <ItemContainer>
        <ItemContent>
          {title && (
            <TitleText testID={`${testID}_title`} type="Body3">
              {title}
            </TitleText>
          )}
          {title === 'ID' ? (
            <ValueTextContainer>
              <ValueText color="darkBlueD4">
                {value.split('#').shift()}
              </ValueText>
              <ValueText color={handleColorText()}>
                {value.split('#').pop()}
              </ValueText>
            </ValueTextContainer>
          ) : (
            <ValueText color="darkBlueD4">{value}</ValueText>
          )}
        </ItemContent>
      </ItemContainer>
      <ListMenuItemRightSide>
        {!!badge && (
          <ListMenuItemBadgeContainer testID="badgeItem">
            {badge}
          </ListMenuItemBadgeContainer>
        )}
      </ListMenuItemRightSide>
      {icon || <RightArrow />}
    </TouchableItem>
  );
};

interface ListMenuProps {
  children: any;
}

interface ListProps {
  children: any;
}

export const ListMenu: React.FC<ListMenuProps> = ({ children }) => {
  return <ListContainer>{children}</ListContainer>;
};

export const List: React.FC<ListProps> = ({ children }) => {
  return <ChildrenView>{children}</ChildrenView>;
};

export interface MovableItemProps {
  item: any;
  left?: JSX.Element | JSX.Element[] | any;
  itemHeight: number;
  idkey: string;
  setIndexes: Dispatch<SetStateAction<SoretableListIndex | undefined>>;
  scrollY: {
    value: number;
  };
  positions: any;
  dataCount: number;
  handlePressDeleteItem?: ((item: any) => Promise<void>) | undefined;
}

const MovableItem = ({
  item,
  left = undefined,
  itemHeight,
  idkey,
  setIndexes,
  scrollY,
  positions,
  dataCount,
  handlePressDeleteItem = undefined,
}: MovableItemProps): JSX.Element => {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(
    positions.value[item.favorite_user_id] * itemHeight,
  );
  const MovableItemIcon = useSVG('movableitem');
  const fullName = item?.favorite_name || '';
  const DeleteItem = useSVG('remove_circle-item');
  const { darkMode: isDarkMode } = useTheme();

  useAnimatedReaction(
    () => positions.value[item.favorite_user_id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * itemHeight);
        }
      }
    },
    [moving],
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY =
        event.absoluteY +
        scrollY.value -
        (Platform.OS === 'ios' ? screen_height / 5 : itemHeight + 10);

      if (positionY <= scrollY.value + itemHeight) {
        scrollY.value = withTiming(0, { duration: 1500 });
      } else if (positionY >= scrollY.value + dimensions.height - itemHeight) {
        const contentHeight = dataCount * itemHeight;
        const containerHeight = dimensions.height - insets.top - insets.bottom;
        const maxScroll = contentHeight - containerHeight;
        scrollY.value = withTiming(maxScroll, { duration: 1500 });
      } else {
        cancelAnimation(scrollY);
      }

      top.value = withTiming(positionY - itemHeight, {
        duration: Platform.OS === 'ios' ? 16 : 1,
      });

      const newPosition = clamp(
        Math.floor(positionY / itemHeight),
        0,
        dataCount - 1,
      ) as unknown as any;

      if (newPosition !== positions.value[item.favorite_user_id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[item.favorite_user_id],
          newPosition,
        );
      }
    },
    onFinish() {
      top.value = positions.value[item.favorite_user_id] * itemHeight;
      runOnJS(setIndexes)(positions.value);
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      elevation: moving ? 5 : 0,
    };
  }, [moving]);

  return (
    <MovableItemAnimatedContainer style={animatedStyle}>
      <ListItemView
        // {...testProperties('sorteable-item')}
        title={fullName}
        verified={item?.verified}
        badgeUrl={item?.badge_url}
        subtitle={item?.favorite_lynk_id}
        left={
          left && (
            <>
              {handlePressDeleteItem && (
                <DeleteItemButton
                  onPress={() => handlePressDeleteItem(item)}
                  // {...testProperties('delete-sorteable-item')}
                >
                  <DeleteItem />
                </DeleteItemButton>
              )}
              {left(item as JSX.Element as any)}
            </>
          )
        }
        right={
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <PanHandlerAnimatedView>
              <MoveItemButton>
                <MovableItemIcon />
              </MoveItemButton>
            </PanHandlerAnimatedView>
          </PanGestureHandler>
        }
        isPressable
        color={isDarkMode ? 'secondaryD5' : undefined}
      />
    </MovableItemAnimatedContainer>
  );
};

export interface SoretableListIndex {
  [key: string]: number;
}

interface SorteableListProps {
  data: any[];
  idkey: string;
  left?: ListRenderItem<any>;
  callToAction?: boolean;
  labelCallToAction?: string;
  onPressCallToAction?: () => void;
  primaryButton?: boolean;
  labelPrimaryButton?: string;
  onPressPrimaryButton?: (positionsValue?: SoretableListIndex) => void;
  isGreyedPrimaryButton?: boolean;
  itemHeight?: number;
  handlePressDeleteItem?: (item: any) => void;
}

export const SorteableList = ({
  data,
  idkey,
  left = undefined,
  callToAction = undefined,
  labelCallToAction = undefined,
  onPressCallToAction = undefined,
  primaryButton = undefined,
  labelPrimaryButton = undefined,
  onPressPrimaryButton = undefined,
  isGreyedPrimaryButton = false,
  itemHeight = 80,
  handlePressDeleteItem = undefined,
}: SorteableListProps): JSX.Element => {
  const [indexes, setIndexes] = useState<SoretableListIndex>();
  const positions = useSharedValue(listToObject(data));
  const scrollY = useSharedValue(0);
  const scrollViewRef = useAnimatedRef();
  const MoreIcon = useSVG('more');
  const limitOfFavourites: boolean = data.length < 10;
  const heightList = screen_height - screen_height * 0.25;

  useAnimatedReaction(
    () => scrollY.value,
    scrolling => scrollTo(scrollViewRef, 0, scrolling, false),
  );

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const [favourites, setFavourites] = useState<any[]>(data);
  useEffect(() => {
    setFavourites(
      data.map((itm, index) => (
        <MovableItem
          key={idkey + index}
          item={itm}
          left={left}
          idkey={idkey}
          itemHeight={itemHeight || 80}
          scrollY={scrollY}
          setIndexes={setIndexes}
          positions={positions}
          dataCount={favourites.length}
          handlePressDeleteItem={
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            handlePressDeleteItem && handlePressDeleteItemfn
          }
        />
      )),
    );
  }, []);

  const handlePressDeleteItemfn = async (item: any): Promise<void> => {
    if (handlePressDeleteItem) {
      await handlePressDeleteItem(item);
    }
    const newData = await removeItemFromArrray(data, item);
    setFavourites(
      newData.map(newitem => (
        <MovableItem
          item={newitem}
          left={left}
          idkey={idkey}
          itemHeight={itemHeight || 80}
          scrollY={scrollY}
          setIndexes={setIndexes}
          positions={positions}
          dataCount={favourites.length}
          handlePressDeleteItem={
            handlePressDeleteItem && handlePressDeleteItemfn
          }
        />
      )),
    );
  };

  return (
    <SorteableListView heightList={heightList}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Animated.ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            contentContainerStyle={{
              height: favourites.length * (itemHeight || 80),
              justifyContent: 'center',
            }}
          >
            <>{favourites}</>
          </Animated.ScrollView>
          {callToAction && limitOfFavourites && (
            <CallToActionButton
              onPress={onPressCallToAction}
              // {...testProperties('call-to-action-button')}
            >
              <MoreIcon />
              <CallToActionView>
                <CallToActionLabel
                  type="Button"
                  // {...testProperties('call-to-action-text')}
                  color="opposing"
                  weight="bold"
                >
                  {labelCallToAction}
                </CallToActionLabel>
              </CallToActionView>
            </CallToActionButton>
          )}
          {primaryButton && (
            <ButtonContainer>
              <PrimaryButton
                title={labelPrimaryButton}
                type="Button"
                buttonTheme="Primary"
                textTransform="capitalize"
                onPress={() =>
                  onPressPrimaryButton && onPressPrimaryButton(indexes)
                }
                isGreyed={isGreyedPrimaryButton}
                // {...testProperties('primary-button')}
              />
            </ButtonContainer>
          )}
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </SorteableListView>
  );
};

export { ListMenuItem };
