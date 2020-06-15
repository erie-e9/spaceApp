import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import ProfileScreen from '@screens/Profile/ProfileScreen';;
import {ETASimpleText} from '@etaui';

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
const Header = styled.View`
    marginLeft: 15px;
`;

const ProfileStack = createStackNavigator();
const ProfileNavigator = () => {
  const themeContext = useContext(ThemeContext);

    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerTransparent: !true,
                headerShown: !true,
                headerTintColor: themeContext.PRIMARY_TEXT_COLOR_LIGHT,
                headerStyle: {
                    backgroundColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
                    shadowColor: 'black',
                    shadowOpacity: 0.15,
                    shadowOffset: { height: 0.2 },
                    shadowRadius: 5,
                    elevation: 5
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>

            <ProfileStack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                options={({navigation, route}) => ({
                    headerTitle: '',
                    headerShown: !true,
                    headerTransparent: !true,
                    headerLeft: () => {
                        return (
                            <Header>
                                <ETASimpleText
                                    size={22}
                                    weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
                                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    align={'left'}>
                                    Profile
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
        </ProfileStack.Navigator>
    );
};

export default ProfileNavigator;