import React, {useState, useContext, useLayoutEffect} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText, ETAButtonFilled} from '@etaui';

const {width, height} = Dimensions.get('window');

const CreditCardTopContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${width}px;
  background-color: transparent;
`;
const Card = styled.View`
  height: ${height / 4.75}px;
  width: ${width - 50}px;
  margin: 15px;
  border-radius: 10px;
  background-color: #efefef;
`;
const CardFrontContainer = styled.View`
  flex: 1;
`;
const CardBackContainer = styled.View`
  flex: 1;
`;
const CardItemsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px 20px 20px 20px;
`;
const CreditCardBottomContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: ${width}px;
  background-color: transparent;
`;
const CardBackBand = styled.View`
  height: 35px;
  width: 100%;
  margin-top: 20px;
  background-color: #282828;
`;
const CardIBacktemsContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px 20px 20px 20px;
`;
const TextInputsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${width}px;
  background-color: transparent;
`;
const TextInputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
const TextInput = styled.TextInput.attrs({})`
  height: ${(props) => (props.height ? props.height : 40)}px;
  width: 100%;
  font-size: ${(props) => (props.textsize ? props.textsize : 14)}px;
  color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
  justify-content: center;
  align-items: center;
  align-self: center;
  align-content: center;
  background-color: transparent;
  padding-horizontal: 15px;
  margin-vertical: 7px;
  border-bottom-width: 0.3px;
  border-color: ${(props) => props.theme.GRAYFACEBOOK};
`;

const ETACreditCard = ({lang, placeholderTextColor}) => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [creditCard, setcreditCard] = useState('1234 5678 9012 3456');
  const [expiry, setexpiry] = useState(lang === 'es' ? 'MM/AA' : 'MM/YY');
  const [cvc, setcvc] = useState('123');
  const [onwerName, setonwerName] = useState(
    lang === 'es' ? 'NOMBRE DE PROPIETARIO' : 'ONWER NAME',
  );
  const animatedValue = new Animated.Value(0);

  useLayoutEffect(() => {
    animatedValue.addListener(({value}) => {
      // let letvalue = value;
    });
  }, []);

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipCard = (deg) => {
    console.log('flip switch', animatedValue);
    switch (true) {
      case deg === 180: // front to back
        console.log('front to back');
        Animated.spring(animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 0,
          useNativeDriver: true,
        }).start();
        break;
      case deg < 80: // back to front
        console.log('back to front');
        Animated.spring(animatedValue, {
          toValue: 0,
          friction: 8,
          tension: 0,
          useNativeDriver: true,
        }).start();
        break;
      case deg > 80: // back to front
        console.log('front to back');
        Animated.spring(animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 0,
          useNativeDriver: true,
        }).start();
        break;
      default:
        return false;
        break;
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{flex: 1}}>
        <CreditCardTopContainer>
          <Animated.View
            style={{
              backfaceVisibility: 'hidden',
              transform: [{rotateY: frontInterpolate}],
            }}>
            <Card>
              <CardFrontContainer>
                <CardItemsContainer style={{...StyleSheet.absoluteFillObject}}>
                  <ETASimpleText
                    size={20}
                    weight={Platform.OS === 'ios' ? '500' : 'bold'}
                    color="#333"
                    align={'center'}>
                    {creditCard === ''
                      ? '1234 5678 9012 3456'.padEnd(19, '•')
                      : creditCard.padEnd(19, '•')}
                  </ETASimpleText>
                  <ETASimpleText
                    size={13}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color="#333"
                    align={'center'}>
                    {expiry === ''
                      ? lang === 'es'
                        ? 'MM/AA'
                        : 'MM/YY'
                      : expiry}
                  </ETASimpleText>
                  <ETASimpleText
                    size={13}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color="#333"
                    align={'center'}>
                    {onwerName === ''
                      ? lang === 'es'
                        ? 'NOMBRE DE PROPIETARIO'
                        : 'ONWER NAME'
                      : onwerName.toUpperCase()}
                  </ETASimpleText>
                </CardItemsContainer>
              </CardFrontContainer>
            </Card>
          </Animated.View>

          <Animated.View
            style={{
              backfaceVisibility: 'hidden',
              position: 'absolute',
              top: 0,
              transform: [{rotateY: backInterpolate}],
            }}>
            <Card>
              <CardBackContainer style={{...StyleSheet.absoluteFillObject}}>
                <CardBackBand />
                <CardIBacktemsContainer>
                  <ETASimpleText
                    size={14}
                    weight={Platform.OS === 'ios' ? '500' : '300'}
                    color="#333"
                    align={'center'}>
                    {cvc === '' ? (lang === 'es' ? 'MM/AA' : 'MM/YY') : cvc}
                  </ETASimpleText>
                </CardIBacktemsContainer>
              </CardBackContainer>
            </Card>
          </Animated.View>
        </CreditCardTopContainer>

        <CreditCardBottomContainer>
          <TextInputsContainer>
            <TextInputContainer>
              <TextInput
                // value={''}
                defaultValue={''}
                placeholder={'1234 5678 9012 3456'}
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                }
                keyboardType="phone-pad"
                autoCapitalize="none"
                allowFontScaling={true}
                autoCorrect={true}
                autoFocus={false}
                blurOnSubmit={false}
                caretHidden={false}
                clearButtonMode="while-editing"
                contextMenuHidden={false}
                editable={true}
                enablesReturnKeyAutomatically={false}
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                maxLength={19}
                multiline={false}
                numberOfLines={1} //android
                returnKeyLabel="next" //android
                secureTextEntry={false} //password
                spellCheck={true}
                textContentType="postalCode"
                returnKeyType="none"
                textsize={14}
                clearButtonMode="always"
                onChangeText={(value) =>
                  setcreditCard(value.replace(/[^0-9]/g, ''))
                }
                // onFocus={() => flipCard(0)}
                // onBlur={() => flipCard(0)}
              />
            </TextInputContainer>
          </TextInputsContainer>

          <TextInputsContainer>
            <TextInputContainer>
              <TextInput
                // value={}
                defaultValue={''}
                placeholder={lang === 'es' ? 'MM/AA' : 'MM/YY'}
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                }
                keyboardType="phone-pad"
                autoCapitalize="none"
                allowFontScaling={true}
                autoCorrect={true}
                autoFocus={false}
                blurOnSubmit={false}
                caretHidden={false}
                clearButtonMode="while-editing"
                contextMenuHidden={false}
                editable={true}
                enablesReturnKeyAutomatically={false}
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                maxLength={4}
                multiline={false}
                numberOfLines={1} //android
                returnKeyLabel="next" //android
                secureTextEntry={false} //password
                spellCheck={true}
                textContentType="none"
                returnKeyType="none"
                textsize={14}
                clearButtonMode="always"
                onChangeText={(value) => setexpiry(value)}
                // onFocus={() => flipCard(0)}
                // onBlur={() => flipCard(0)}
              />
            </TextInputContainer>
            <TextInputContainer>
              <TextInput
                // value={}
                defaultValue={''}
                placeholder={lang === 'es' ? 'CVC/CCV' : 'CVC/CCV'}
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                }
                keyboardType="phone-pad"
                autoCapitalize="none"
                allowFontScaling={true}
                autoCorrect={true}
                autoFocus={false}
                blurOnSubmit={false}
                caretHidden={false}
                clearButtonMode="while-editing"
                contextMenuHidden={false}
                editable={true}
                enablesReturnKeyAutomatically={false}
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                maxLength={3}
                multiline={false}
                numberOfLines={1} //android
                returnKeyLabel="next" //android
                secureTextEntry={false} //password
                spellCheck={true}
                textContentType="none"
                returnKeyType="none"
                textsize={14}
                clearButtonMode="always"
                onChangeText={(value) => setcvc(value)}
                onFocus={() => flipCard(180)}
                onBlur={() => flipCard(0)}
              />
            </TextInputContainer>
          </TextInputsContainer>

          <TextInputsContainer>
            <TextInputContainer>
              <TextInput
                // value={}
                defaultValue={''}
                placeholder={
                  lang === 'es' ? 'NOMBRE DE PROPIETARIO' : 'ONWER NAME'
                }
                placeholderTextColor={
                  placeholderTextColor
                    ? placeholderTextColor
                    : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                }
                keyboardType="default"
                autoCapitalize="characters"
                allowFontScaling={true}
                autoCorrect={true}
                autoFocus={false}
                blurOnSubmit={false}
                caretHidden={false}
                clearButtonMode="while-editing"
                contextMenuHidden={false}
                editable={true}
                enablesReturnKeyAutomatically={false}
                underlineColorAndroid="transparent"
                keyboardAppearance="dark"
                maxLength={100}
                multiline={false}
                numberOfLines={1} //android
                returnKeyLabel="next" //android
                secureTextEntry={false} //password
                spellCheck={true}
                textContentType="none"
                returnKeyType="none"
                textsize={14}
                clearButtonMode="always"
                onChangeText={(value) => setonwerName(value)}
                // onFocus={() => flipCard(0)}
                // onBlur={() => flipCard(0)}
              />
            </TextInputContainer>
          </TextInputsContainer>

          <ETAButtonFilled
            title="Save"
            onPress={() =>
              navigation.navigate('SettingsNavigator', {
                screen: 'NewPaymentMethodScreen',
              })
            }
            colorButton={themeContext.PRIMARY_COLOR}
            padding={10}
            width={250}
            border-radius={3}
          />
        </CreditCardBottomContainer>
      </KeyboardAvoidingView>
    </>
  );
};

export default ETACreditCard;
