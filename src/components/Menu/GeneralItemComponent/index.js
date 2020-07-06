import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components';
import {Dimensions, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@icons';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');

const Touchable = styled.TouchableOpacity`
  z-index: 100;
`;
const Card = styled.View`
  height: 220px;
  width: ${width / 2.65}px;
  background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  margin-horizontal: ${width / 30}px;
  margin-vertical: 10px;
  shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  border-radius: 15px;
  shadow-offset: 2px 3px;
  shadow-radius: 2px;
  shadow-opacity: 0;
`;
const CardTop = styled.View`
  flex: 1.25;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;
const NewContainer = styled.View`
  position: absolute;
  z-index: 100;
  height: 14px;
  width: 28px;
  top: 10px;
  left: 8px;
  background-color: ${(props) => props.theme.PRIMARY_COLOR};
  border-radius: 5px;
  border-width: 0px;
  border-color: white;
  justify-content: flex-end;
`;
const CardBottom = styled.View`
  flex: 0.75;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  border-width: 0.5px;
  border-color: ${(props) => props.theme.GRAYFACEBOOK};
`;
const ShopContainer = styled.View`
  flex: 0.6;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-horizontal: 10px;
  margin-bottom: 6px;
`;
const NameContainer = styled.View`
  flex: 0.5;
  flex-direction: column;
  justify-content: flex-start;
  padding-horizontal: 10px;
  padding-top: 5px;
`;
const PriceContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
`;
const DiscountContainer = styled.View`
  flex: 0.5;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  margin-top: 2px;
  z-index: 100;
  margin-bottom: 3px;
`;
const PercentContainer = styled.View`
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-width: 0px;
  padding-horizontal: 5px;
  padding-vertical: 1px;
  border-color: white;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
  margin-left: 5px;
`;
const FavoriteContainer = styled.View`
  position: absolute;
  bottom: 7px;
  right: 15px;
  z-index: 1000;
`;

const GeneralItemComponent = ({propitem}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  const _onPressItem = (item) => {
    navigation.navigate('GetOneItemNavigator', {
      screen: 'GetOneItemScreen',
      params: {
        item: item,
      },
    });
  };

  return (
    <Touchable key={propitem._id} onPress={() => _onPressItem(propitem)}>
      <Card>
        <CardTop>
          {propitem.isNew ? (
            <NewContainer>
              <ETASimpleText
                size={11}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                // color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                color="white"
                align={'center'}>
                new
              </ETASimpleText>
            </NewContainer>
          ) : null}
          <ItemImage source={{uri: propitem.images[0].image}} />
        </CardTop>
        <CardBottom>
          <NameContainer>
            <ETASimpleText
              size={13}
              weight={Platform.OS === 'ios' ? '500' : '600'}
              color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
              align={'left'}
              style={{zIndex: 100}}>
              {propitem.name}
            </ETASimpleText>
          </NameContainer>
          <ShopContainer>
            <PriceContainer>
              <ETASimpleText
                size={12}
                weight={Platform.OS === 'ios' ? '600' : '600'}
                color={themeContext.PRIMARY_COLOR}
                align={'left'}
                style={{zIndex: 100}}>
                $
                {(((100 - propitem.discount) * propitem.price) / 100).toFixed(
                  2,
                )}
              </ETASimpleText>
            </PriceContainer>
            <DiscountContainer>
              {propitem.discount > 0 ? (
                <>
                  <ETASimpleText
                    size={10}
                    weight={Platform.OS === 'ios' ? '400' : '400'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'center'}
                    style={{
                      textDecorationLine: 'line-through',
                      textDecorationStyle: 'solid',
                    }}>
                    ${propitem.price.toFixed(2)}
                  </ETASimpleText>
                  <PercentContainer>
                    <ETASimpleText
                      size={9}
                      weight={Platform.OS === 'ios' ? '500' : '900'}
                      color={themeContext.PRIMARY_COLOR}
                      align={'left'}
                      style={{zIndex: 100}}>
                      -{propitem.discount}%
                    </ETASimpleText>
                  </PercentContainer>
                </>
              ) : null}
            </DiscountContainer>
            <FavoriteContainer>
              <Touchable onPress={() => console.log('ñeñe ñeñe ñeñe')}>
                <Ionicons
                  name={propitem.isFavorite ? 'md-heart' : 'md-heart-empty'}
                  size={20}
                  color={
                    propitem.isFavorite
                      ? themeContext.PRIMARY_COLOR
                      : themeContext.PRIMARY_TEXT_COLOR_LIGHT
                  }
                />
              </Touchable>
            </FavoriteContainer>
            {/* {
                propitem.discount !== 0
                ? <ETASimpleText size={10} weight={Platform.OS === 'ios' ? '400' : '400'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'center'}
                    style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                    ${(propitem.price.toFixed(2))}
                  </ETASimpleText>
                : null
              } */}
            {/* <TouchableCart>
              <Ionicons name='md-cart' size={16} color={themeContext.PRIMARY_COLOR} />
            </TouchableCart> */}
          </ShopContainer>
        </CardBottom>
      </Card>
    </Touchable>
  );
};

export default React.memo(GeneralItemComponent);
