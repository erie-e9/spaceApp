import React, {useState, useContext} from 'react';
import {Dimensions, Platform} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import {Ionicons, FontAwesome} from '@icons';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
`;
const ItemTopContainer = styled.View`
  flex: 1.5;
  zIndex: 100;
`;
const ItemPresentation = styled.View`
  width: ${width}px;
  height: 100%;
`;
const ItemImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;
const ItemBottomContainer = styled.View`
  flex: 0.6;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  justifyContent: center;
  alignItems: center;
  zIndex: 1000;
`;
const Card = styled.View`
  position: absolute;
  bottom: 100px;
  minHeight: 210px;
  width: ${width / 1.2}px;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginVertical: 10px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  borderRadius: 15px;
  padding: 25px 15px 10px 15px;
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  justifyContent: center;
  alignItems: center;
  borderWidth: 0.75px;
  borderColor: ${(props) => props.theme.GRAYFACEBOOK};
  zIndex: 100;
`;
const AddCartContainer = styled.View`
  position: absolute;
  top: -25px;
  flexDirection: row;
  height: 40px;
  width: 120px;
  borderRadius: 30px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0.2;
  elevation: 0.3;
  backgroundColor: ${(props) => props.theme.PRIMARY_COLOR};
  marginHorizontal: 7px;
  paddingHorizontal: 10px;
  justifyContent: center;
  alignItems: center;
  zIndex: 1000;
`;
const AddRemoveContainer = styled.View`
  flex: 1;
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  paddingHorizontal: 10px;
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
  flexDirection: row;
`;
const RemoveCart = styled.TouchableOpacity`
`;
const CardTop = styled.View`
  flex: 1;
  flexDirection: column;
  width: 100%;
`;
const CardTopHead = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: flex-start;
`;
const NameContainer = styled.View`
  flex: 0.7;
  flexDirection: column;
  justifyContent: space-between;
  alignItems: flex-start;
  marginVertical: 10px;
`;
const PriceContainer = styled.View`
  flex: 0.3;
  flexDirection: column;
  justifyContent: space-between;
  alignItems: flex-end;
`;
const ItemInfoContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center
  alignItems: center;
`;
const ItemInfoRating = styled.View`
  flexDirection: row;
  height: 20px;
  width: 75px;
  borderRadius: 15px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  borderWidth: 0.75px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 7px;
  justifyContent: center;
  alignItems: center;
`;
const ItemInfoCalories = styled.View`
  height: 20px;
  width: 75px;
  borderRadius: 15px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  borderWidth: 0.75px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 7px;
  justifyContent: center;
  alignItems: center;
`;
const ItemInfoWeight = styled.View`
  height: 20px;
  width: 75px;
  borderRadius: 15px;
  shadowColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  shadowOffset: 0px 1px;
  shadowRadius: 2px;
  shadowOpacity: 0;
  elevation: 0;
  borderWidth: 0.75px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  marginHorizontal: 7px;
  justifyContent: center;
  alignItems: center;
`;
const CardBottom = styled.View`
  flex: 0.6;
  flexDirection: column;
  justifyContent: space-between;
  width: 100%;
  alignItems: flex-start;
  paddingHorizontal: 10px;
  marginTop: 10px;
`;
const ItemDetailsContainer = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: space-between;
  alignItems: flex-start;
`;

const GetOneItemComponent = () => {
  const themeContext = useContext(ThemeContext);
  const [ addedCounter, setaddedCounter ] = useState(0)
  const route = useRoute();
  const { item } = route.params.params;
  console.log('item ', item);
  
  const _addCart = () => {
    setaddedCounter(addedCounter+1)
  }

  const _removeCart = () => {
    setaddedCounter(addedCounter-1)
  }
  
  return (
    <Root>
      <ItemTopContainer>
        <ItemPresentation>
          {/* <ItemImage source={{uri: item.images[0].image}} /> */}
          <ItemImage source={{uri: 'https://minimalistbaker.com/wp-content/uploads/2016/05/THE-BEST-Vegan-Chocolate-Ice-Cream-SO-creamy-rich-and-easy-to-make-vegan-glutenfree-icecream-dessert-chocolate-recipe-summer.jpg'}} />
        </ItemPresentation>
      </ItemTopContainer>
      <ItemBottomContainer>
        <Card>
          <AddCartContainer>
          {
            addedCounter === 0
            ? <AddCart onPress={() => _addCart()}>
                <ETASimpleText
                    size={20}
                    weight={Platform.OS === 'ios' ? '600' : '300'}
                    color='white'
                    align={'left'}>
                    +
                  </ETASimpleText>
                <FontAwesome name='shopping-cart' size={18} color='white' style={{ alignSelf: 'center'}}/>
              </AddCart>
            : <AddRemoveContainer>
                <RemoveCart onPress={() => _removeCart()}>
                  <ETASimpleText
                    size={20}
                    weight={Platform.OS === 'ios' ? '600' : '300'}
                    color='white'
                    align={'left'}>
                      -
                    </ETASimpleText>
                </RemoveCart>
                <CounterContainer>
                  <ETASimpleText
                    size={12}
                    weight={Platform.OS === 'ios' ? '600' : '300'}
                    color='white'
                    align={'left'}>
                    {addedCounter}
                  </ETASimpleText>
                </CounterContainer>
                <AddCart onPress={() => _addCart()}>
                  <ETASimpleText
                      size={20}
                      weight={Platform.OS === 'ios' ? '600' : '300'}
                      color='white'
                      align={'left'}>
                      +
                    </ETASimpleText>
                </AddCart>
              </AddRemoveContainer>
          }
          </AddCartContainer>
          <CardTop>
            <CardTopHead>
              <NameContainer>
                <ETASimpleText
                  size={18}
                  weight={Platform.OS === 'ios' ? '500' : '400'}
                  color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                  align={'left'}>
                  {item.name}
                </ETASimpleText>
              </NameContainer>
              <PriceContainer>
                <ETASimpleText size={16} weight={Platform.OS === 'ios' ? '600' : '600'} color={themeContext.PRIMARY_COLOR} align={'left'}
                  style={{ zIndex: 100 }}>
                  ${((100 - item.discount) * item.price / 100).toFixed(2)} 
                </ETASimpleText>
                {
                  item.discount !== 0
                  ? <ETASimpleText size={12} weight={Platform.OS === 'ios' ? '600' : '500'} color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT} align={'left'}
                      style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                      ${(item.price).toFixed(2)}
                    </ETASimpleText>
                  : null
                }
              </PriceContainer>
            </CardTopHead>
            <ItemInfoContainer>
              <ItemInfoRating>
                {/* <ETASimpleText
                  size={10}
                  weight={Platform.OS === 'ios' ? '500' : '300'}
                  color={themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT}
                  align={'left'}>
                  {item.rating}
                </ETASimpleText> */}
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
                size={14}
                weight={Platform.OS === 'ios' ? '500' : '400'}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'left'}>
                Details
              </ETASimpleText>
              <ETASimpleText
                size={13}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                {item.details}
              </ETASimpleText>
            </ItemDetailsContainer>
          </CardBottom>
        </Card>
      </ItemBottomContainer>
    </Root>
  );
};

export default GetOneItemComponent;
