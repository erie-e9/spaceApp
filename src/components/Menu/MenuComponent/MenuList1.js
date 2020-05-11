import React, {useContext} from 'react';
import {FlatList, Dimensions, Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText, ETAHeaderText} from '@etaui';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  marginTop: 15px;
`;
const Card = styled.View`
  height: 110px;
  width: ${width / 2.2}px;
  backgroundColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  margin: 5px;
  borderRadius: 4px;
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
const Touchable = styled.TouchableOpacity``;
const ItemImage = styled.Image`
  height: 110px;
  width: ${width / 2.2}px;
  borderRadius: 4px;
`;

const MenuList = ({data}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const _onPress = (item) => {
    navigation.navigate('MenuItemScreen');
  };

  return (
    <Root>
      <HeadContainer>
        <ETAHeaderText
          size={15}
          weight="700"
          color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}>
          Title List
        </ETAHeaderText>
        <Touchable>
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
        <FlatList
          contentContainerStyle={{
            flexDirection: 'column',
          }}
          data={data}
          keyExtractor={(item) => item._id.toString()}
          horizontal={!true}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <Touchable key={item._id} onPress={() => _onPress(item)}>
                <Card>
                  <ItemImage source={{uri: item.images[0].image}} />
                  {/* <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '300'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}
                                        style={{ zIndex: 100 }}>
                                        {item.name}
                                    </ETASimpleText> */}
                </Card>
              </Touchable>
              // <ETACard {...item} />
            );
          }}
        />
      </ListContainer>
    </Root>
  );
};

export default MenuList;
