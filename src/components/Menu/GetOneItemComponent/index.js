import React, {useState, useEffect, useContext, memo} from 'react';
import {Dimensions, Platform, Animated} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import {Ionicons, FontAwesome} from '@icons';
import SuggestionsComponent from './SuggestionsComponent';
import {Context} from '@context/cartContext';

const {width, height} = Dimensions.get('window');

const Root = styled.View`
  flex: 2;
  alignItems: center;
`;
const ItemTopContainer = styled.View`
  height: ${height - 255}px;
`;
const ItemPresentation = styled.View`
  width: ${width}px;
  height: 100%;
`;
const ItemImage = styled.ImageBackground`
  flex: 0.8;
  width: null;
  height: null;
  resizeMode: cover;
  justifyContent: center;
`;
const ItemBottomContainer = styled.View`
  flex: 1;
  backgroundColor: transparent;
  justifyContent: center;
  alignItems: center;
  position: absolute;
  height: 100%;
  zIndex: 100;
`;
// const Card = styled.Animated.View`
//   width: ${width / 1.2}px;
//   top: 150px;
//   backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
//   marginVertical: 10px;
//   shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
//   borderRadius: 15px;
//   padding: 25px 15px 10px 15px;
//   shadowOffset: 0px 1px;
//   shadowRadius: 2px;
//   shadowOpacity: 0;
//   elevation: 0;
//   justifyContent: flex-start;
//   alignItems: center;
//   borderWidth: 0px;
//   borderColor: ${(props) => props.theme.GRAYFACEBOOK};
// `;
const AddCartContainer = styled.View`
  position: absolute;
  top: -25px;
  flexDirection: row;
  height: 40px;
  width: 120px;
  borderRadius: 30px;
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
  height: 24px;
  width: 24px;
  borderRadius: 12px;
  borderWidth: 0.5px;
  borderColor: white;
  alignItems: center;
  justifyContent: center;
`;
const AddCart = styled.TouchableOpacity`
  padding: 5px;
  flexDirection: row;
  zIndex: 1000;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
`;
const AddRemoveButtonContainer = styled.View`
  height: 18px;
  width: 12px;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
`;
const RemoveCart = styled.TouchableOpacity`
  padding: 5px;
  flexDirection: row;
  zIndex: 1000;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
`;
const CardTop = styled.View`
  minHeight: 10px;
  flexDirection: column;
  width: 100%;
  justifyContent: center;
  marginTop: 10px;
`;
const NewContainer = styled.View`
  position: absolute;
  zIndex: 100;
  height: 16px;
  width: 30px;
  top: -15px;
  backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
  borderRadius: 5px;
  borderWidth: 1px;
  borderColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  justifyContent: center;
  alignItems: center;
`;
const CardTopHead = styled.View`
  minHeight: 40px;
  flexDirection: row;
  justifyContent: center;
  alignItems: flex-start;
  backgroundColor: transparent;
`;
const NameContainer = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: flex-start;
  alignItems: flex-start;
  paddingHorizontal: 2px;
`;
const ShopContainer = styled.View`
  flex: 0.35;
  minHeight: 50px;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  paddingHorizontal: 2px;
  marginBottom: 5px;
`;
const DiscountContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  paddingVertical: 1px;
  zIndex: 100;
`;
const PercentContainer = styled.View`
  justifyContent: center;
  alignItems: center;
  zIndex: 100;
  borderWidth: 0px;
  paddingHorizontal: 4px;
  paddingVertical: 1.5px;
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
  justifyContent: center;
  alignItems: center;
  marginBottom: 3px;
`;
const ItemInfoContainer = styled.View`
  minHeight: 10px;
  flexDirection: row;
  justifyContent: space-between;
  paddingHorizontal: 10px;
  alignItems: stretch;
  backgroundColor: transparent;
`;
const ItemInfoRating = styled.View`
  flexDirection: row;
  height: 20px;
  width: 75px;
  borderRadius: 20px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  borderWidth: 0.5px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 7px;
  justifyContent: center;
  alignItems: center;
`;
const ItemInfoCalories = styled.View`
  height: 20px;
  width: 75px;
  borderRadius: 20px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  borderWidth: 0.5px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 7px;
  justifyContent: center;
  alignItems: center;
`;
const ItemInfoWeight = styled.View`
  height: 20px;
  width: 75px;
  borderRadius: 20px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  borderWidth: 0.5px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 7px;
  justifyContent: center;
  alignItems: center;
`;
const CardBottom = styled.View`
  flexDirection: column;
  justifyContent: space-between;
  minHeight: 100px;
  width: 100%;
  alignItems: flex-start;
  paddingHorizontal: 10px;
  marginTop: 10px;
`;
const ItemDetailsContainer = styled.View`
  minHeight: 50px;
  flexDirection: column;
  justifyContent: flex-start;
  alignItems: flex-start;
`;
const FavoriteContainer = styled.View`
  position: absolute;
  bottom: 0px;
  right: 5px;
  zIndex: 1000;
`;
const Touchable = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;
`;

const GetOneItemComponent = () => {
  const themeContext = useContext(ThemeContext);
  const {addToCart, removeToCart, state} = useContext(Context);
  const [ addedCounter, setaddedCounter ] = useState(0);
  const [ animatedValueTransform ] = useState(new Animated.Value(0.9));
  const route = useRoute();
  const { item } = route.params.params;
  let delayValue = 1000;

  useEffect(() => {
    if (state.data.length > 0) {
      let itemFound = state.data.find(element => element._id === item._id);
      // console.log('itemFound:', itemFound);
      if (itemFound) {
        setaddedCounter(itemFound.howMany);
      }
    } else {
      // console.log('state.data: ', state.data);
    }
  }, [state]);

  useEffect(() => {   
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 5,
      useNativeDriver: true
    }).start();
  }, []);

  const translateY = animatedValueTransform.interpolate({
    inputRange: [0, 1],
    outputRange: [delayValue, 1]
  });  
  
  const _addCart = (item) => {
    setaddedCounter(addedCounter + 1)
    addToCart(item);
  }

  const _removeCart = (_id) => {
    removeToCart(_id);
    setaddedCounter(addedCounter - 1)
  }
  
  return (
    <>
      <Root>
        <ItemTopContainer>
          <ItemPresentation>
            {/* <ItemImage source={{uri: item.images[0].image}} /> */}
            <ItemImage source={{uri: 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg'}} />
          </ItemPresentation>
        </ItemTopContainer>
        <ItemBottomContainer>
          <Animated.View style={{ 
            width: width - 60,
            top: 160,
            bottom: 10,
            backgroundColor:  themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
            marginVertical: 15,
            shadowColor: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
            borderRadius: 15,
            shadowOffset: {width: 0, height: 1},
            shadowRadius: 2,
            shadowOpacity: 0,          
            paddingTop: 25,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            elevation: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 0,
            borderColor: themeContext.GRAYFACEBOOK,
            transform: [{ translateY }]}}
          >
            <AddCartContainer>
            {
              addedCounter === 0
              ? <AddCart onPress={() => _addCart(item)}>
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
              : <AddRemoveContainer>
                  <RemoveCart onPress={() => _removeCart(item._id)}>
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
                  <AddCart onPress={() => _addCart(item)}>
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
              <CardTopHead>
                <NameContainer>
                  <ETASimpleText
                    size={16}
                    weight={Platform.OS === 'ios' ? '500' : '400'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
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
                            weight={Platform.OS === 'ios' ? '500' : '900'} 
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
                </ShopContainer>
              </CardTopHead>
              <ItemInfoContainer>
                <ItemInfoRating>
                  <Ionicons name='ios-star' size={8.5} color='#f2f20d' style={{ marginHorizontal: 1 }} />
                  <Ionicons name='ios-star' size={8.5} color='#f2f20d' style={{ marginHorizontal: 1 }} />
                  <Ionicons name='ios-star' size={8.5} color='#f2f20d' style={{ marginHorizontal: 1 }} />
                  <Ionicons name='ios-star' size={8.5} color='#f2f20d' style={{ marginHorizontal: 1 }} />
                  <Ionicons name='ios-star' size={8.5} color='#f2f20d' style={{ marginHorizontal: 1 }} />
                </ItemInfoRating>
                <ItemInfoCalories>
                  <ETASimpleText
                    size={8.5}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT}
                    align={'left'}>
                    {item.calories} calories
                  </ETASimpleText>
                </ItemInfoCalories>
                <ItemInfoWeight>
                  <ETASimpleText
                    size={8.5}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT}
                    align={'left'}>
                    {item.weight} g
                  </ETASimpleText>
                </ItemInfoWeight>
              </ItemInfoContainer>
            </CardTop>
            <CardBottom>
              <ItemDetailsContainer>
                <ETASimpleText
                  size={12}
                  weight={Platform.OS === 'ios' ? '500' : '500'}
                  color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                  align={'center'}>
                  Details
                </ETASimpleText>
                <ETASimpleText
                  size={11}
                  weight={Platform.OS === 'ios' ? '300' : '300'}
                  color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT}
                  align={'left'}>
                  {item.details}
                </ETASimpleText>
              </ItemDetailsContainer>
              <FavoriteContainer>
                <Touchable onPress={() => console.log('ñeñe ñeñe ñeñe')}>
                  <Ionicons 
                    name={item.isFavorite ? 'md-heart' : 'md-heart-empty'} 
                    size={20} 
                    color={item.isFavorite ? themeContext.PRIMARY_COLOR  : themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                />
                </Touchable>
              </FavoriteContainer>
            </CardBottom>
          </Animated.View>
        </ItemBottomContainer>
      </Root>
      <SuggestionsComponent selectedItemName={item.name}/>
    </>
  );
};

export default memo(GetOneItemComponent);
