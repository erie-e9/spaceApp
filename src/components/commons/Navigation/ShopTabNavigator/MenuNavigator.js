import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import {FontAwesome, AntDesign} from '@commons/Icons';
import {ETASimpleText, ETASearchBar} from '@etaui';
import MenuScreen from '@screens/Menu/MenuScreen';
import GetOneItemScreen from '@screens/Menu/GetOneItemScreen';
import CategoryItemsScreen from '@screens/Menu/CategoryItemsScreen';
import AllItemsScreen from '@screens/Menu/AllItemsScreen';

const Header = styled.View`
    marginLeft: 15px;
`;
const HeaderLeft = styled.TouchableOpacity`
    marginLeft: 15px;
`;
const HeaderLeftCard = styled.TouchableOpacity`
    marginLeft: 15px;
    marginTop: 25px;
    alignItems: center;
    height: 30px;
    width: 30px;
    borderRadius: 15px;
`;
const HeaderRight = styled.View`
    flexDirection: row;
    marginRight: 15px;
`;
const Touchable = styled.TouchableOpacity`
    marginLeft: 10px;
`;

const MenuStack = createStackNavigator();
const MenuNavigator = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <MenuStack.Navigator
      screenOptions={{
        headerTransparent: !true,
        headerShown: !true,
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        headerStyle: {
          backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    > 

    <MenuStack.Screen
      name='MenuScreen'
      component={MenuScreen}
      options={{
        headerTitle: '',
        headerShown: true,
        headerLeft: () => {
          return (
            <Header>
              <ETASimpleText
                size={22}
                weight={Platform.OS === 'ios' ? '600' : '600'}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'left'}>
                  iceCream
              </ETASimpleText>
            </Header>
          );
        },
        headerRight: () =>  <ETASearchBar />,
        // header: () =>  <ETASearchBar />,
      }}
    />

    <MenuStack.Screen
      name='GetOneItemScreen'
      component={GetOneItemScreen}
      options={({navigation, route}) => ({
        headerTitle: '',
        headerShown: true,
        headerTransparent: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontWeight: '500',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
        },
        headerLeft: () => {
          return (
            <HeaderLeftCard onPress={() => navigation.goBack()}>
              <AntDesign name='closecircle' size={25} color={themeContext.SECONDARY_BACKGROUND_COLOR}/>
            </HeaderLeftCard>
          );
        },
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      })}
    />

    <MenuStack.Screen
      name='CategoryItemsScreen'
      component={CategoryItemsScreen}
      options={({navigation, route}) => ({
        headerTitle: '',
        headerShown: true,
        headerTransparent: !true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontWeight: '500',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
        },
        headerLeft: () => {
          return (
            <HeaderLeft onPress={() => navigation.goBack()}>
              <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
            </HeaderLeft>
          );
        },
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
    />

    <MenuStack.Screen
      name='AllItemsScreen'
      component={AllItemsScreen}
      options={({navigation, route}) => ({
        headerTitle: 'Products',
        headerShown: true,
        headerTransparent: !true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            fontWeight: '500',
            color: themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
        },
        headerLeft: () => {
          return (
            <HeaderLeft onPress={() => navigation.goBack()}>
              <FontAwesome name='angle-left' size={25} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
            </HeaderLeft>
          );
        },
        headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      })}
  />
    </MenuStack.Navigator>
  );
};

export default MenuNavigator;