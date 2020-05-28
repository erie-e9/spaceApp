import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText} from '@etaui';
import data from './items.json';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  paddingVertical: 10px
  
`;
const ItemList = styled.FlatList`
  width: ${width - 20}px;
`;
const Item = styled.View`
  width: 70px;
  height: 90px;
  borderRadius: 35px;
  borderWidth: 0.5px;
  borderColor: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  margin: 8px;
  justifyContent: center;
  alignItems: center;
`;
const ItemImage = styled.Image`
  width: 70px;
  height: 90px;
  borderRadius: 35px;
`;
const Touchable = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;
`;

const Categories = ({categories}) => {
  const [items, setitems] = useState([]);
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  useEffect(() => {
    setitems(data.data);
  }, []);

  const _onPressCategory = (item) => {
    navigation.navigate('CategoryItemsScreen', {
      screen: 'MenuScreen',
      params: {
        category: item.name,
        categories: categories
      }
    });
  };

  return (
    <Root>
      {items && items.length ? (
        <>
          <ItemList
            data={items}
            keyExtractor={(item) => item._id.toString()}
            horizontal
            snapToAlignment='center'
            scrollEventThrottle={16}
            decelerationRate='fast'
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <Touchable key={item._id} onPress={() => _onPressCategory(item)}>
                  <Item>
                    <ItemImage source={{uri: item.image}} />
                  </Item>
                  <ETASimpleText
                    size={13}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    {item.name}
                  </ETASimpleText>
                </Touchable>
              );
            }}
            ListFooterComponent={() => {
              return (
                <Touchable onPress={() => console.log('All categories')}>
                  <Item>
                    <ETASimpleText
                      size={20}
                      weight={Platform.OS === 'ios' ? '600' : '300'}
                      color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                      align={'center'}>
                      +
                    </ETASimpleText>
                  </Item>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '500' : '300'}
                      color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                      align={'center'}>
                      All categories
                    </ETASimpleText>
              </Touchable>
              )
            }}
          />
        </>
      ) : null}
    </Root>
  );
};

export default Categories;
