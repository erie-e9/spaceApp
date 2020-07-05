import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, FontAwesome, AntDesign, SimpleLineIcons, Feather, EvilIcons, Octicons} from '@icons';
import {Context} from '@context';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText} from '@etaui';

const iconSize = 23;

const Scroll = styled.ScrollView``;
const Root = styled.View`
  flex: 1;
  flexDirection: column;
  backgroundColor: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const Card = styled.View`
  flexDirection: row;
  alignItems: stretch;
  minHeight: 30px;
  paddingHorizontal: 10px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const Metadata = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  minHeight: 50px;
  backgroundColor: transparent;
`;
const Touchable = styled.TouchableWithoutFeedback`
`;
const SettingContainer = styled.View`
  flex: 1;
  flexDirection: row;
  paddingHorizontal: 10px;
  alignItems: center;
  minHeight: 50px;
  backgroundColor: transparent
`;
const LeftContainer = styled.View`
  flex: 1;
  flexDirection: row;
`;
 const OptionTitleContainer = styled.View`
  marginLeft: 13px;
`;
const IconContainer = styled.View`
  flex: 0.12;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
`;

const ProfileContentComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const { logOut } = useContext(Context);

  const logout = () => {
    logOut();
  };

  return (
    <Scroll>
      <Root>
        <Card>
          <Metadata>
            <Touchable onPress={() => navigation.navigate('SettingsNavigator', {screen: 'NotificationsScreen'})}>
              <SettingContainer>
                <LeftContainer>
                  <IconContainer>
                    <FontAwesome
                      name='bell-o'
                      size={iconSize - 6}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    />
                  </IconContainer>
                  <OptionTitleContainer>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '400' : '800'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Notifications
                    </ETASimpleText>
                  </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                  <Feather name='chevron-right' size={13} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
              </SettingContainer>
            </Touchable>
          </Metadata>
        </Card>

        <Card>
          <Metadata>
            <Touchable onPress={() => navigation.navigate('SettingsNavigator', {screen: 'AddressesScreen'})}>
              <SettingContainer>
                <LeftContainer>
                  <IconContainer>
                    <SimpleLineIcons
                      name='directions'
                      size={iconSize - 6}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    />
                  </IconContainer>
                  <OptionTitleContainer>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '400' : '800'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Addresses
                    </ETASimpleText>
                  </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                  <Feather name='chevron-right' size={13} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
              </SettingContainer>
            </Touchable>
          </Metadata>
        </Card>

        {/* <Card>
          <Metadata>
            <Touchable onPress={() => navigation.navigate('SettingsNavigator', {screen: 'FavoritesScreen'})}>
              <Ionicons 
                name='md-heart-empty'
                size={iconSize - 5}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
              />
              <OptionTitleContainer>
                <ETASimpleText
                  size={13}
                  weight={Platform.OS === 'ios' ? '400' : '300'}
                  color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                  align={'left'}>
                  Favorites
                </ETASimpleText>
              </OptionTitleContainer>
            </Touchable>
          </Metadata>
        </Card> */}

        <Card>
          <Metadata>
            <Touchable onPress={() => navigation.navigate('SettingsNavigator', {screen: 'PaymentMethodsScreen'})}>
              <SettingContainer>
                <LeftContainer>
                  <IconContainer>
                    <AntDesign
                      name='creditcard'
                      size={iconSize - 7}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    />
                  </IconContainer>
                  <OptionTitleContainer>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '400' : '800'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Payment methods
                    </ETASimpleText>
                  </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                  <Feather name='chevron-right' size={13} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
              </SettingContainer>
            </Touchable>
          </Metadata>
        </Card>

        <Card>
          <Metadata>
            <Touchable onPress={() => navigation.navigate('SettingsNavigator', {screen: 'BranchOfficesScreen'})}>
              <SettingContainer>
                <LeftContainer>
                  <IconContainer>
                    <Octicons
                      name='location'
                      size={iconSize - 5}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    />
                  </IconContainer>
                  <OptionTitleContainer>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '400' : '800'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Branch offices
                    </ETASimpleText>
                  </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                  <Feather name='chevron-right' size={13} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
              </SettingContainer>
            </Touchable>
          </Metadata>
        </Card>

        <Card>
          <Metadata>
            <Touchable onPress={() => navigation.navigate('SettingsNavigator', {screen: 'HelpScreen'})}>
              <SettingContainer>
                <LeftContainer>
                  <IconContainer>
                    <Ionicons
                      name='ios-information-circle-outline'
                      size={iconSize - 2}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    />
                  </IconContainer>
                  <OptionTitleContainer>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '400' : '300'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Help
                    </ETASimpleText>
                  </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                  <Feather name='chevron-right' size={13} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
              </SettingContainer>
            </Touchable>
          </Metadata>
        </Card>

        <Card>
          <Metadata>
            <Touchable onPress={() => logout()}>
              <SettingContainer>
                <LeftContainer>
                  <IconContainer>
                    <AntDesign
                      name='logout'
                      size={iconSize - 6}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    />
                  </IconContainer>
                  <OptionTitleContainer>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '400' : '300'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Log out
                    </ETASimpleText>
                  </OptionTitleContainer>
                </LeftContainer>
                <IconContainer>
                  <Feather name='chevron-right' size={13} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
              </SettingContainer>
            </Touchable>
          </Metadata>
        </Card>
      </Root>
    </Scroll>
  );
};

export default ProfileContentComponent;
