import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETAAvatar, ETASimpleText} from '@etaui';
import ProfileHeadComponent from './ProfileHeadComponent';
import ProfileContentComponent from './ProfileContentComponent';
import {truncateString} from '@functions';
import {fakeavatar} from '@utils/constants';

const firstname = 'Scarlett';
const lastname = 'Johansson';
const username = 'BWidow';
const info = 'Member from 5 jun 2017';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ProfileUserContent = styled.View`
  flex-direction: column;
  justify-content: flex-start;
`;
const Scroll = styled.ScrollView``;
const Card = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
  margin-bottom: 1px;
  min-height: 40px;
  align-items: center;
  padding-horizontal: 10px;
`;
const MetadataHeader = styled.View`
  flex-direction: column;
  justify-content: center;
  min-height: 80px;
  margin-horizontal: 10px;
`;
const MetadataInfo = styled.View`
  flex-direction: column;
  justify-content: center;
  padding-horizontal: 5px;
  margin-right: 50px;
  margin-vertical: 5px;
  padding-right: 40px;
`;
const Touchable = styled.TouchableOpacity``;

const ProfileComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <Root>
      <ProfileHeadComponent />
      <ProfileUserContent>
        <Touchable
          onPress={() =>
            navigation.navigate('SettingsNavigator', {screen: 'AccountScreen'})
          }>
          <Card>
            <ETAAvatar image={fakeavatar} size="middle" />
            <MetadataHeader>
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '700' : 'bold'}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'left'}>
                {firstname} {lastname}
              </ETASimpleText>
              <MetadataInfo>
                <ETASimpleText
                  size={13}
                  weight={Platform.OS === 'ios' ? '500' : '300'}
                  color={themeContext.LINK}
                  align={'left'}>
                  @{truncateString(username, 40)}
                </ETASimpleText>
                <ETASimpleText
                  size={11}
                  weight={Platform.OS === 'ios' ? '300' : '300'}
                  color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                  align={'left'}>
                  {info}
                </ETASimpleText>
              </MetadataInfo>
            </MetadataHeader>
          </Card>
        </Touchable>
      </ProfileUserContent>
      <Scroll>
        <ProfileContentComponent />
      </Scroll>
    </Root>
  );
};

export default ProfileComponent;
