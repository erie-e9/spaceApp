import React, {useContext} from 'react';
import {Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import {Ionicons} from '@icons';

const {width} = Dimensions.get('window');

const Card = styled.View`
  height: 220px;
  width: ${width / 2.65}px;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: ${width / 30}px;
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
const ItemImage = styled.Image`
  height: 100%;
  width: 100%;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
`;
const NewContainer = styled.View`
  position: absolute;
  zIndex: 100;
  height: 15px;
  width: 30px;
  top: 10px;
  left: 8px;
  backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
  borderRadius: 5px;
  borderWidth: 1px;
  borderColor: white;
  justifyContent: flex-end;
`;
const Touchable = styled.TouchableOpacity`
  zIndex: 1000;
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
const ShopContainer = styled.View`
  flex: 0.6;
  flexDirection: column;
  justifyContent: flex-end;
  alignItems: flex-start;
  paddingHorizontal: 10px;
  marginBottom: 6px;
`;
const NameContainer = styled.View`
  flex: 0.5;
  flexDirection: column;
  justifyContent: flex-start;
  paddingHorizontal: 10px;
  paddingTop: 5px;
`;
const DiscountContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: flex-end;
  marginTop: 2px;
  zIndex: 100;
`;
const PercentContainer = styled.View`
  justifyContent: center;
  alignItems: center;
  zIndex: 100;
  borderWidth: 0px;
  paddingHorizontal: 5px;
  paddingVertical: 1px;
  borderColor: white;
  borderTopLeftRadius: 4px;
  borderTopRightRadius: 4px;
  borderBottomLeftRadius: 4px;
  borderBottomRightRadius: 4px;
  backgroundColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
  marginLeft: 5px;
`;
const PriceContainer = styled.View`
  flex: 0.8;
  flexDirection: column;
  justifyContent: flex-end;
  alignItems: flex-start;
  marginBottom: 3px;
`;
const FavoriteContainer = styled.View`
  position: absolute;
  bottom: 7px;
  right: 15px;
  zIndex: 1000;
`;

const GeneralItemComponent = ({item}) => {
  const themeContext = useContext(ThemeContext);
  
  return (
    <Card>
      <CardTop>
        {
          item.isNew
          ? <NewContainer>
              <ETASimpleText
                size={11}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                // color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                color='white'
                align={'center'}>
                new
              </ETASimpleText>
            </NewContainer>
          : null
        }
        <ItemImage source={{uri: item.images[0].image}} />
      </CardTop>
      <CardBottom>
        <NameContainer>
          <ETASimpleText 
            size={13} 
            weight={Platform.OS === 'ios' ? '500' : '600'} 
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} 
            align={'left'}
            style={{ zIndex: 100 }}>
            {item.name}
          </ETASimpleText>
        </NameContainer>
        <ShopContainer>
          {
            item.discount > 0
            ? <DiscountContainer>            
                <ETASimpleText 
                  size={10} 
                  weight={Platform.OS === 'ios' ? '400' : '400'} 
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} 
                  align={'center'}
                  style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
               ${(item.price.toFixed(2))} 
                </ETASimpleText>
                <PercentContainer>
                  <ETASimpleText 
                    size={9} 
                    weight={Platform.OS === 'ios' ? '900' : '900'} 
                    color={themeContext.PRIMARY_COLOR} 
                    align={'left'}
                    style={{ zIndex: 100 }}>
                    -{item.discount}%
                  </ETASimpleText>
              </PercentContainer>
              </DiscountContainer>
            : null
          }
          <PriceContainer>
            <ETASimpleText 
              size={12} 
              weight={Platform.OS === 'ios' ? '600' : '600'}
              color={themeContext.PRIMARY_COLOR} 
              align={'left'}
              style={{ zIndex: 100 }}>
              ${((100 - item.discount) * item.price / 100).toFixed(2)}  
            </ETASimpleText>    
          </PriceContainer>
          <FavoriteContainer>
            <Touchable onPress={() => console.log('ñeñe ñeñe ñeñe')}>
              <Ionicons 
                name={item.isFavorite ? 'md-heart' : 'md-heart-empty'} 
                size={20} 
                color={item.isFavorite ? themeContext.PRIMARY_COLOR  : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            />
            </Touchable>
          </FavoriteContainer>
            {/* {
              item.discount !== 0
              ? <ETASimpleText size={10} weight={Platform.OS === 'ios' ? '400' : '400'} color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align={'center'}
                  style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                  ${(item.price.toFixed(2))}
                </ETASimpleText>
              : null
            } */}
          {/* <TouchableCart>
            <Ionicons name='md-cart' size={16} color={themeContext.PRIMARY_COLOR} />
          </TouchableCart> */}
        </ShopContainer>
      </CardBottom>
    </Card>
  );
};

export default React.memo(GeneralItemComponent);