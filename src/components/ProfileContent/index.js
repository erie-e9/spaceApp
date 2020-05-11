import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, FontAwesome, AntDesign, Octicons} from '@icons';
import {Context} from '@context';
import {ETAAvatar, ETASimpleText} from '@etaui';

const iconSize = 23;
const firstname = 'Scarlett';
const lastname = 'Johansson';
const info = '❝ Besame... las muestras publicas de afecto incomodan a las personas. (Black Widow) ❞';

const Card = styled.View`
  flex: 1;
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
const MetadataHeader = styled.View`
  flexDirection: column;
  justifyContent: center;
  minHeight: 100px;
  marginHorizontal: 10px;
`;
const MetadataInfo = styled.View`
  flexDirection: row;
  justifyContent: center;
  paddingHorizontal: 5px;
  marginRight: 50px;
  paddingRight: 40px;
`;
const Touchable = styled.TouchableOpacity`
  flexDirection: row;
  justifyContent: flex-start;
  alignItems: center;
  margin: 15px;
`;
 const OptionTitleContainer = styled.View`
  marginLeft: 15px;
`;

const SettingsContent = () => {
  const themeContext = useContext(ThemeContext);
  const {logOut} = useContext(Context);

  const logout = () => {
    logOut();
  };

  return (
    <>
      <Card>
        <ETAAvatar size="middle" />
        <MetadataHeader>
          <ETASimpleText
            size={14}
            weight={Platform.OS === 'ios' ? '700' : '600'}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            align={'left'}>
            {firstname} {lastname}
          </ETASimpleText>
          <MetadataInfo>
            <ETASimpleText
              size={14}
              weight={Platform.OS === 'ios' ? '400' : '300'}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              align={'left'}>
              {info}
            </ETASimpleText>
          </MetadataInfo>
        </MetadataHeader>
      </Card>
      <Card>
        <Metadata>
          <Touchable>
            <FontAwesome
              name="bell-o"
              size={iconSize - 5}
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
          <Touchable>
            <Ionicons
              name="ios-information-circle-outline"
              size={iconSize}
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
              name="logout"
              size={iconSize - 5}
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
      <Spacevertical>
        <Card>
          <Metadata>
            <Touchable>
              <Octicons
                name="mail"
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
        </Card>
        <Card>
          <Metadata>
            <Touchable>
              <Ionicons
                name="ios-heart"
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
        </Card>
      </Spacevertical>
    </>
  );
};

export default SettingsContent;
