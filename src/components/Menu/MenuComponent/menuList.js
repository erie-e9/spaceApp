import React, {useState, useEffect, useContext} from 'react';
import {Platform, Animated} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText, ETAHeaderText} from '@etaui';
import GeneralItemComponent from '@components/Menu/GeneralItemComponent';

const Root = styled.View`
  justifyContent: center;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  borderTopRightRadius: 5px;
  borderTopLeftRadius: 5px;
  paddingVertical: 10px;
  marginBottom: 12px;
`;
const HeadContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  margin: 10px 7px 5px 5px;
  paddingHorizontal: 10px;
`;
const ListContainer = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
`;
const MenuListItemsList = styled.FlatList``;
const Touchable = styled.TouchableOpacity`
  zIndex: 100;
`;

const MenuList = ({data, title}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [ items ] = useState(data.slice(0, 4)); //slice: only first 4 items
  const [ animatedValueTransform ] = useState(new Animated.Value(0));
  const [ opacity ] = useState(new Animated.Value(0));
  let delayValue = 2000;  

  useEffect(() => {
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 10,
      useNativeDriver: true
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    }).start();
  }, [])

  const _onPressAllItems = (item) => {
    console.log('_onPressAllItems pressed:', item);
    
    navigation.navigate('AllItemsScreen', {
      screen: 'MenuScreen',
      params: {
        name: item,
        allitems: data
      }
    });
  };

  const _onPressItem = (item) => {
    navigation.navigate('GetOneItemScreen', {
      screen: 'MenuScreen',
      params: {
        _id: item._id,
        item: item
      }
    });
  };

  return (
    <>
    {
      items.length > 0
      ? <Root>
          <HeadContainer>
            <ETAHeaderText
              size={14}
              weight='700'
              color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
              align={'left'}>
              {title}
            </ETAHeaderText>
            <Touchable onPress={() => _onPressAllItems(title)}>
              <ETASimpleText
                size={13}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                See more
              </ETASimpleText>
            </Touchable>
          </HeadContainer>
          <ListContainer>
            <MenuListItemsList
              contentContainerStyle={{
                flexDirection: 'column',
              }}
              data={items}
              keyExtractor={(item) => item._id.toString()}
              horizontal={!true}
              numColumns={2}
              initialNumToRender={4}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => {
                return (
                  <ETASimpleText
                    size={14}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    Empty list 
                </ETASimpleText>
                );
              }}
              ListFooterComponent={() => {
                return (
                  <ETASimpleText
                    size={7}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    Prices subject to change without notice
                </ETASimpleText>
                )
              }}
              renderItem={({item}) => {
                delayValue = delayValue + 1000;
                const translateY = animatedValueTransform.interpolate({
                  inputRange: [0, 1],
                  outputRange: [delayValue, 1]
                });

                return (
                  <Touchable key={item._id} onPress={() => _onPressItem(item)}>
                    <Animated.View style={{ opacity, transform: [{ translateY }]}}>
                      <GeneralItemComponent item={item} />
                    </Animated.View>
                  </Touchable>
                );
              }}
            />
          </ListContainer>
        </Root>
      : null
    }
    </>
  );
};

export default MenuList;
