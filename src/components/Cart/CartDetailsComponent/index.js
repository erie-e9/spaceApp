import React, {useState, useEffect, useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {ETASimpleText, ETAButtonOutline, ETAButtonFilled} from '@etaui';
import {Context} from '@context/cartContext';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 0.6;
  flexDirection: column;
  width: ${width - 20}px;
  borderTopLeftRadius: 15px;
  borderTopRightRadius: 15px;
  borderBottomLeftRadius: 0px;
  borderBottomRightRadius: 0px;
  position: absolute;
  padding: 20px 20px;
  alignSelf: center;
  bottom: -2px;
  backgroundColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
  borderWidth: 0px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
`;
const ResumeContainer = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: stretch;
  width: 100%;
  margin: 5px 0px 0px 0px;
  padding: 5px 10px;
  backgroundColor: transparent;
`;
const DirectionContainer = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  width: 100%;
  height: 40px;
  marginVertical: 3px;
  paddingVertical: 5px;
  paddingHorizontal: 10px;
  borderWidth: 0px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: transparent;
`;
const TotalContainer = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  width: 100%;
  height: 40px;
  marginVertical: 3px;
  paddingVertical: 5px;
  paddingHorizontal: 10px;
  borderWidth: 0px;
  borderColor: ${props => props.theme.GRAYFACEBOOK};
  backgroundColor: transparent;
`;
const ResumeTotalContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  minHeight: 30px;
  width: 100%;
  marginVertical: 3px;
  paddingVertical: 5px;
  backgroundColor: transparent;
`;
const ButtonPayContainer = styled.View`
  height: 50px;
  width: 100%;
  alignItems: center;
  backgroundColor: transparent;
`;

const CartDetailsComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const {getCartItems, state} = useContext(Context);
  const [ totalItems, settotalItems ] = useState(0);
  const [ total, settotal ] = useState(0);
  const [ subtotal, setsubtotal ] = useState(0);
  const [ shipping, setshipping ] = useState(35);
  const [ isSubmitting, setisSubmitting ] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCartItems();
    darta();
    console.log('CartDetailsComponent isFocused', isFocused);
    
  }, [state.data]);

  const darta = async () => {
    let itemsArray = state.data;
    let sum = 0
    let subtotal = 0
    let total = 0
    await itemsArray.forEach(element => {
      console.log('element.howMany', element.howMany);
      sum = sum + element.howMany;
      subtotal = subtotal + (element.price * element.howMany);
      console.log('subtotal:', subtotal);
        
    });
    settotalItems(sum);
    setsubtotal(subtotal);
    settotal(subtotal + shipping);
  }

  return (
    <Root>
      <ETASimpleText
        size={16}
        weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
        align={'left'}>
        Summary ({totalItems} items)
      </ETASimpleText>
      <ResumeContainer>
        <ETASimpleText
          size={11}
          weight={Platform.OS === 'ios' ? '400' : '400'}
          color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          align={'left'}>
          Subtotal
        </ETASimpleText>
        
        <ETASimpleText
          size={11}
          weight={Platform.OS === 'ios' ? '400' : '400'}
          color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          align={'left'}>
          ${(subtotal).toFixed(2)}
        </ETASimpleText>
      </ResumeContainer>
      <ResumeContainer>
        <ETASimpleText
          size={11}
          weight={Platform.OS === 'ios' ? '400' : '400'}
          color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          align={'left'}>
          Shipping
        </ETASimpleText>
        
        <ETASimpleText
          size={11}
          weight={Platform.OS === 'ios' ? '400' : '400'}
          color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
          align={'left'}>
          ${(shipping).toFixed(2)}
        </ETASimpleText>
      </ResumeContainer>
      <TotalContainer>                
        <ResumeTotalContainer>
          <ETASimpleText
            size={16}
            weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            align={'left'}>
            Total
          </ETASimpleText>
          
          <ETASimpleText
            size={16}
            weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            align={'left'}>
            ${(total).toFixed(2)}
          </ETASimpleText>
        </ResumeTotalContainer>
      </TotalContainer>
      <DirectionContainer>
        <ETAButtonOutline
          title='Send to Home'
          onPress={() => navigation.navigate('SettingsNavigator', {screen: 'MapAddressesScreen', params: { data: {
            '_id': 1,
            'headTitle': 'Home',
            'details': 'Josue Junction, Ohio, 12661 42616-7741, Liechtenstein.',
            'latitude': 24.02574090527505,
            'isDefault': true,
            'longitude': -104.67300467638253
          }}})}
          disabled={false}
          colorButton={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          padding={10}
          width={250}
          borderRadius={3}
        />
      </DirectionContainer>
      <ButtonPayContainer>
        <ETAButtonFilled
          title='Check out'
          onPress={() => console.log(state.data)}
          disabled={isSubmitting ? true : false}
          colorButton={themeContext.SECONDARY_BACKGROUND_COLOR}
          padding={10}
          width={isSubmitting ? 40 : 250}
          borderRadius={isSubmitting ? 20 : 3}
        />
      </ButtonPayContainer>
    </Root>
  );
}

export default React.memo(CartDetailsComponent);