import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText, ETAHeaderText} from '@etaui';
import GeneralItemComponent from '@components/Menu/GeneralItemComponent';

const Root = styled.View`
  justifyContent: center;
  marginTop: 10px;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  paddingVertical: 10px;
  borderTopRightRadius: 5px;
  borderTopLeftRadius: 5px;
`;
const HeadContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  margin: 10px;
  paddingHorizontal: 10px;
`;
const ListContainer = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
`;
const Touchable = styled.TouchableOpacity`
  zIndex: 100
`;
const MenuListItems = styled.FlatList``;

const MenuList = ({data, title}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

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
      data.length > 0
      ? <Root>
          <HeadContainer>
            <ETAHeaderText
              size={15}
              weight='700'
              color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}>
              {title}
            </ETAHeaderText>
            <Touchable onPress={() => _onPressAllItems(title)}>
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '500' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                See more
              </ETASimpleText>
            </Touchable>
          </HeadContainer>
          <ListContainer>
            <MenuListItems
              contentContainerStyle={{
                flexDirection: 'column',
              }}
              data={data}
              keyExtractor={(item) => item._id.toString()}
              horizontal={!true}
              numColumns={2}
              initialNumToRender={2}
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
                )
              }}
              ListFooterComponent={() => {
                return (
                  <ETASimpleText
                    size={7}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    Price subject to change without notice
                </ETASimpleText>
                )
              }}
              renderItem={({item}) => <Touchable key={item._id} onPress={() => _onPressItem(item)}><GeneralItemComponent item={item} /></Touchable>}
            />
          </ListContainer>
        </Root>
      : null
    }
    </>
  );
};

export default MenuList;
