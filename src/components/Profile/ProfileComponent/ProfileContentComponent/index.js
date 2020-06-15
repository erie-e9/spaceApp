import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, FontAwesome, AntDesign, Feather, SimpleLineIcons} from '@icons';
import {Context} from '@context';
import {ETASimpleText} from '@etaui';

const iconSize = 23;

const Root = styled.View`
  flex: 0.3;
  flexDirection: column;
  backgroundColor: transparent;
`;
const Card = styled.View`
  flexDirection: row;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  marginBottom: 1px;
  minHeight: 40px;
  alignItems: center;
  paddingHorizontal: 10px;
`;
const Spacevertical = styled.View`
  marginTop: 50px;
`;
const Metadata = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  minHeight: 50px;
`;
const Touchable = styled.TouchableOpacity`
  flex: 1;
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
  padding: 15px;
`;
 const OptionTitleContainer = styled.View`
  marginLeft: 15px;
`;

const ProfileContentComponent = () => {
  const themeContext = useContext(ThemeContext);
  const {logOut} = useContext(Context);

  const logout = () => {
    logOut();
  };

  return (
    <Root>
      <Card>
        <Metadata>
          <Touchable onPress={() => alert('touchable')}>
            <FontAwesome
              name='bell-o'
              size={iconSize - 6}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            />
            <OptionTitleContainer>
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                Notifications
              </ETASimpleText>
            </OptionTitleContainer>
          </Touchable>
        </Metadata>
      </Card>
      <Card>
        <Metadata>
          <Touchable onPress={() => alert('touchable')}>
            <SimpleLineIcons
              name='directions'
              size={iconSize - 5}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            />
            <OptionTitleContainer>
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                Directions
              </ETASimpleText>
            </OptionTitleContainer>
          </Touchable>
        </Metadata>
      </Card>
      <Card>
        <Metadata>
          <Touchable onPress={() => alert('touchable')}>
            <Ionicons 
              name='md-heart-empty'
              size={iconSize - 5}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            />
            <OptionTitleContainer>
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '400' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                Favorites
              </ETASimpleText>
            </OptionTitleContainer>
          </Touchable>
        </Metadata>
      </Card>

      <Spacevertical>
        {/* <Card>
          <Metadata>
            <Touchable>
              <Octicons
                name='mail'
                size={iconSize}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              />
              <OptionTitleContainer>
                <ETASimpleText
                  size={14}
                  weight={Platform.OS === 'ios' ? '400' : '300'}
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                  align={'left'}>
                  Contact
                </ETASimpleText>
                </OptionTitleContainer>
            </Touchable>
          </Metadata>
        </Card> */}

        {/* <Card>
          <Metadata>
            <Touchable>
              <Ionicons
                name='ios-heart'
                size={iconSize}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              />
              <OptionTitleContainer>
                <ETASimpleText
                  size={14}
                  weight={Platform.OS === 'ios' ? '400' : '300'}
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                  align={'left'}>
                  About us
                </ETASimpleText>
                </OptionTitleContainer>
            </Touchable>
          </Metadata>
        </Card> */}
        <Card>
          <Metadata>
            <Touchable onPress={() => alert('touchable')}>
              <SimpleLineIcons
                name='credit-card'
                size={iconSize - 3}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              />
              <OptionTitleContainer>
                <ETASimpleText
                  size={14}
                  weight={Platform.OS === 'ios' ? '400' : '300'}
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                  align={'left'}>
                  Payment methods
                </ETASimpleText>
              </OptionTitleContainer>
            </Touchable>
          </Metadata>
        </Card>
        <Card>
          <Metadata>
            <Touchable onPress={() => alert('touchable')}>
              <Ionicons
                name='ios-information-circle-outline'
                size={iconSize - 2}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              />
              <OptionTitleContainer>
                <ETASimpleText
                  size={14}
                  weight={Platform.OS === 'ios' ? '400' : '300'}
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                  align={'left'}>
                  Help
                </ETASimpleText>
                </OptionTitleContainer>
            </Touchable>
          </Metadata>
        </Card>

        <Card>
          <Metadata>
            <Touchable onPress={() => logout()}>
              <AntDesign
                name='logout'
                size={iconSize - 6}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              />
              <OptionTitleContainer>
                <ETASimpleText
                  size={14}
                  weight={Platform.OS === 'ios' ? '400' : '300'}
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                  align={'left'}>
                  Log out
                </ETASimpleText>
                </OptionTitleContainer>
            </Touchable>
          </Metadata>
        </Card>
        
      </Spacevertical>
    </Root>
  );
};

export default ProfileContentComponent;
