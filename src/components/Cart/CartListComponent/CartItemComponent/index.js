import React, {useState, useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import {Ionicons, FontAwesome} from '@icons';

const {width} = Dimensions.get('window');

const Root = styled.View`
    flexDirection: column;
    height: 100px;
    width: ${width}px;
`;
const Item = styled.View`
    flex: 1;
    flexDirection: row;
    paddingHorizontal: 5px;
    shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
    shadowOffset: 2px 3px;
    shadowRadius: 2px;
    shadowOpacity: 0;
    justifyContent: center;
    alignItems: center;
    margin: 1px 0px;
    backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const ItemImage = styled.Image`
    height: 70px;
    width: 70px;
    borderRadius: 5px;
    marginLeft: 5px;
`;
const NewContainer = styled.View`
    position: absolute;
    zIndex: 100;
    height: 15px;
    width: 30px;
    top: 14px;
    left: 10px;
    backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
    borderRadius: 5px;
    borderWidth: 1px;
    borderColor: white;
    justifyContent: flex-end;
`;
const CartItemData = styled.View`
    flex: 1;
    flexDirection: column;
    marginLeft: 15px;
    alignItems: flex-start;
    justifyContent: center;
    backgroundColor: transparent;
`;
const CartItemHeadContainer = styled.View`
    minHeight: 30px;
    justifyContent: center;
    alignItems: center;
    flexDirection: row;
    backgroundColor: transparent;
    padding: 5px 5px 0px 5px;
`;
const CartTitleContainer = styled.View`
    flex: 1;
    backgroundColor: transparent;
    alignItems: flex-start;
`;
const CardItemFunctions = styled.View`
    flex: 0.5;
    alignItems: flex-end;
    justifyContent: center;
    margin: 0px 10px 10px 0px;
    paddingHorizontal: 2px;
`;
const Touchable = styled.TouchableOpacity`
`;
const CartItemContainer = styled.View`
    flex: 0.8;
    flexDirection: row;
`;
const CartItemLeftContainer = styled.View`
    flexDirection: column;
    justifyContent: center;
    alignItems: flex-start;
    margin: 5px 0px 10px 0px;
    paddingHorizontal: 2px;
`;
const DiscountContainer = styled.View`
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    zIndex: 100;
`;
const PercentContainer = styled.View`
    justifyContent: flex-start;
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
    flex: 0.4;
    flexDirection: column;
    justifyContent: flex-start;
    alignItems: center;
`;
const CartItemRightContainer = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    alignItems: flex-end;
    margin: 5px 0px 10px 5px;
    paddingHorizontal: 2px;
`;
const AddCartContainer = styled.View`
    position: absolute;
    right: 5px;
    flexDirection: row;
    height: 30px;
    width: 90px;
    borderRadius: 20px;
    shadowOffset: 0px 1px;
    shadowRadius: 2px;
    shadowOpacity: 0.2;
    elevation: 0.3;
    backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
    marginHorizontal: 7px;
    paddingHorizontal: 10px;
    justifyContent: center;
    alignItems: center;
    alignSelf: center;
    zIndex: 1000;
`;
const AddRemoveContainer = styled.View`
    width: 100%; 
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
`;
const CounterContainer = styled.View`
    height: 20px;
    width: 20px;
    borderRadius: 12px;
    borderWidth: 0.5px;
    borderColor: white;
    alignItems: center;
    justifyContent: center;
`;
const AddRemoveButtonContainer = styled.View`
    height: 18px;
    width: 12px;
    alignItems: center;
    justifyContent: center;
`;
const AddCart = styled.TouchableOpacity`
    paddingHorizontal: 5px;
    flexDirection: row;
    zIndex: 1000;
`;
const RemoveCart = styled.TouchableOpacity`
    paddingHorizontal: 5px;
    flexDirection: row;
    zIndex: 1000;
`;

const CartItemComponent = ({item}) => {
    const themeContext = useContext(ThemeContext);
    const [ addedCounter, setaddedCounter ] = useState(item.howMany);

    const _addCart = () => {
        setaddedCounter(addedCounter + 1)
    }

    const _removeCart = () => {
    setaddedCounter(addedCounter - 1)
    }

    return (
        <Root>
          <Item>
            <ItemImage source={{uri: item.images[0].image}} />
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
            <CartItemData>
                <CartItemHeadContainer>
                    <CartTitleContainer>
                        <ETASimpleText
                            size={15}
                            weight={Platform.OS === 'ios' ? '400' : '800'}
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align={'left'}
                        >
                        {item.name}
                        </ETASimpleText>
                    </CartTitleContainer>
                    <CardItemFunctions>
                        <Touchable onPress={() => console.warn('item removed')}>
                            <Ionicons 
                                name='md-close' 
                                size={18} 
                                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                style={{ alignSelf: 'center'}}
                            />
                        </Touchable>
                    </CardItemFunctions>
                </CartItemHeadContainer>
                <CartItemContainer>
                    <CartItemLeftContainer>
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
                        size={14} 
                        weight={Platform.OS === 'ios' ? '500' : '400'}
                        color={themeContext.PRIMARY_COLOR} 
                        align={'center'}
                        style={{ zIndex: 100 }}>
                        ${((100 - item.discount) * item.price / 100).toFixed(2)} 
                        </ETASimpleText>
                    </PriceContainer>
                    </CartItemLeftContainer>
                    <CartItemRightContainer>  
                        <AddCartContainer>
                        {
                            addedCounter === 0
                            ?   <AddCart onPress={() => _addCart()}>
                                    <AddRemoveButtonContainer>
                                        <ETASimpleText
                                        size={18}
                                        weight={Platform.OS === 'ios' ? '600' : '300'}
                                        color='white'
                                        align={'center'}>
                                        +
                                        </ETASimpleText>  
                                    </AddRemoveButtonContainer>
                                    <FontAwesome 
                                        name='shopping-cart' 
                                        size={18} 
                                        color='white' 
                                        style={{ alignSelf: 'center'}}
                                    />
                                </AddCart>
                            :   <AddRemoveContainer>
                                    <RemoveCart onPress={() => _removeCart()}>
                                        <AddRemoveButtonContainer>
                                        {/* <CounterContainer> */}
                                            <ETASimpleText
                                            size={22}
                                            weight={Platform.OS === 'ios' ? '600' : '300'}
                                            color='white'
                                            align={'center'}>
                                            -
                                            </ETASimpleText>
                                        {/* </CounterContainer> */}
                                        </AddRemoveButtonContainer>
                                    </RemoveCart>
                                    <CounterContainer>
                                        <ETASimpleText
                                        size={12}
                                        weight={Platform.OS === 'ios' ? '600' : '300'}
                                        color='white'
                                        align={'center'}>
                                        {addedCounter}
                                        </ETASimpleText>
                                    </CounterContainer>
                                    <AddCart onPress={() => _addCart()}>
                                        <AddRemoveButtonContainer>                  
                                        {/* <CounterContainer> */}
                                            <ETASimpleText
                                            size={22}
                                            weight={Platform.OS === 'ios' ? '600' : '300'}
                                            color='white'
                                            align={'center'}>
                                            +
                                            </ETASimpleText>
                                        {/* </CounterContainer> */}
                                        </AddRemoveButtonContainer>
                                    </AddCart>
                                </AddRemoveContainer>
                        }
                        </AddCartContainer>
                    </CartItemRightContainer>
                </CartItemContainer>
            </CartItemData>
          </Item>
        </Root>
    );
  }

  export default React.memo(CartItemComponent);