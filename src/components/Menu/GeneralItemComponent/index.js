import React, {useState, useContext} from 'react';
import {Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import {Ionicons, FontAwesome} from '@icons';

const {width} = Dimensions.get('window');

const Card = styled.View`
  height: 240px;
  width: ${width / 2.55}px;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: ${width / 45}px;
  marginVertical: 10px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  borderRadius: 20px;
  shadowOffset: 2px 3px;
  shadowRadius: 2px;
  shadowOpacity: 0;
`;
const CardTop = styled.View`
  flex: 1.25;
  borderTopLeftRadius: 25px;
  borderTopRightRadius: 25px;
`;
const FavoriteContainer = styled.View`
  position: absolute;
  top: 10px;
  right: 15px;
  zIndex: 100;
`;
const DiscountContainer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  zIndex: 100;
  height: 20px;
  width: 35px;
  borderWidth: 0.5px;
  borderColor: white;
  justifyContent: center;
  alignItems: center;
  borderTopLeftRadius: 4px;
  borderTopRightRadius: 0px;
  borderBottomLeftRadius: 4px;
  borderBottomRightRadius: 0px;
  backgroundColor: ${props => props.theme.PRIMARY_COLOR};
`;
const CardBottom = styled.View`
  flex: 0.75;
  flexDirection: column;
  justifyContent: space-between;
  width: 100%;
  borderBottomLeftRadius: 20px;
  borderBottomRightRadius: 20px;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  borderWidth: 0.75px;
  borderColor: ${(props) => props.theme.GRAYFACEBOOK};
`;
const NameContainer = styled.View`
  flex: 0.7;
  flexDirection: column;
  justifyContent: flex-start;
  paddingHorizontal: 10px;
  paddingTop: 10px;
`;
const ShopContainer = styled.View`
  flex: 0.9;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: flex-start;
  paddingHorizontal: 15px;
`;
const PriceContainer = styled.View`
  flex: 1.2;
  flexDirection: column;
  justifyContent: center;
  alignItems: flex-start;
  paddingVertical: 5px;
`;
const TouchableCart = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;
  width: 28px;
  height: 28px;
  borderRadius: 28px;
  borderWidth: 0.3px;
  borderColor: ${props => props.theme.PRIMARY_COLOR};
`;
const Touchable = styled.TouchableOpacity`
  zIndex: 100
`;
const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
`;

const GeneralItemComponent = ({item}) => {
  const themeContext = useContext(ThemeContext);
  
  return (
    <Card>
      <CardTop>
        <Touchable>
          <FavoriteContainer>
            <Ionicons name='md-heart' size={20} color={'white'} />
          </FavoriteContainer>
        </Touchable>
        {
          item.discount > 0
          ? <DiscountContainer>
              <ETASimpleText size={12} weight={Platform.OS === 'ios' ? '500' : '300'} color='white' align={'left'}
                style={{ zIndex: 100 }}>
                -{item.discount}%
              </ETASimpleText>
            </DiscountContainer>
          : null
        }
        <ItemImage source={{uri: item.images[0].image}} />
      </CardTop>
      <CardBottom>
        <NameContainer>
          <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '500' : '400'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'left'}
            style={{ zIndex: 100 }}>
            {item.name}
          </ETASimpleText>
        </NameContainer>
        <ShopContainer>
          <PriceContainer>
            <ETASimpleText size={14} weight={Platform.OS === 'ios' ? '600' : '600'} color={themeContext.PRIMARY_COLOR} align={'left'}
              style={{ zIndex: 100 }}>
              ${((100 - item.discount) * item.price / 100).toFixed(2)}  
            </ETASimpleText>
            {
              item.discount !== 0
              ? <ETASimpleText size={11} weight={Platform.OS === 'ios' ? '600' : '600'} color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT} align={'left'}
                  style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                  ${(item.price.toFixed(2))}
                </ETASimpleText>
              : null
            }
          </PriceContainer>
          {/* <TouchableCart>
            <Ionicons name='md-cart' size={16} color={themeContext.PRIMARY_COLOR} />
          </TouchableCart> */}
        </ShopContainer>
      </CardBottom>
    </Card>
  );
};

export default GeneralItemComponent;
