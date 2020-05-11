import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import data from './items.json';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  marginHorizontal: 10px;
`;
const ItemList = styled.FlatList`
  width: ${width - 20}px;
`;
const Item = styled.View`
  width: 70px;
  height: 90px;
  borderRadius: 35px;
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  margin: 8px;
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

const Items = () => {
  const [items, setitems] = useState([]);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    setitems(data.data);
    console.log('items', items);
  }, []);

  return (
    <Root>
      {items && items.length ? (
        <>
          <ItemList
            data={items}
            keyExtractor={(item) => item._id.toString()}
            horizontal
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <Touchable
                // onPress={() => navigation.navigate('MenuItemScreen')}
                >
                  <Item>
                    <ItemImage source={{uri: item.image}} />
                  </Item>
                  <ETASimpleText
                    size={14}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    {item.name}
                  </ETASimpleText>
                </Touchable>
              );
            }}
          />
        </>
      ) : null}
    </Root>
  );
};

export default Items;
