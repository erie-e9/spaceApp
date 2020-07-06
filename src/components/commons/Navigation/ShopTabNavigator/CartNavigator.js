import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Platform} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import CartScreen from '@screens/Cart/CartScreen';
import {ETASimpleText} from '@etaui';

const Header = styled.View`
  margin-left: 15px;
`;

const CartStack = createStackNavigator();
const CartNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <CartStack.Navigator
      screenOptions={{
        headerTransparent: !true,
        headerShown: !true,
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        headerStyle: {
          backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
          shadowColor: 'black',
          shadowOpacity: 0.15,
          shadowOffset: {height: 0.2},
          shadowRadius: 5,
          elevation: 5,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={({navigation, route}) => ({
          headerTitle: '',
          headerShown: true,
          headerTransparent: !true,
          headerLeft: () => {
            return (
              <Header>
                <ETASimpleText
                  size={22}
                  weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
                  color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                  align={'left'}>
                  Cart
                </ETASimpleText>
              </Header>
            );
          },
          // headerRight: () => {
          //     return (
          //         <IconButton
          //             activeOpacity={1}
          //             underlayColor='#ccd0d5'
          //             // onPress={(event) => _onFocus(event)}
          //         >
          //             <FontAwesome name='search' size={18} color='#000' />
          //         </IconButton>
          //     )
          // },
          headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        })}
      />
    </CartStack.Navigator>
  );
};

export default CartNavigator;
