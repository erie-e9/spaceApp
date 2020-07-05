import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import Card from './Card'

const Root = styled.ScrollView`
  flex: 1;
  flexDirection: column;
  paddingTop: 15px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const NotificationSettingContainer = styled.View`
  flexDirection: column;
  padding: 5px 15px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const NotificationsComponent = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <NotificationSettingContainer>
        <ETASimpleText
          size={15}
          weight={Platform.OS === 'ios' ? '700' : '800'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          Messages
        </ETASimpleText>
        <Card 
          headTitle='Email' 
          message='Will send you info relevant, promotions and offers about our products via email.' 
        />
        <Card 
          headTitle='Push notifications' 
          message='Will send you info relevant, promotions and offers about our products via notifications.' 
        />
        <Card 
          headTitle='SMS' 
          message='Will send you info relevant, promotions and offers about our products via message sms.' 
        />
      </NotificationSettingContainer>

      <NotificationSettingContainer>
        <ETASimpleText
          size={15}
          weight={Platform.OS === 'ios' ? '700' : '800'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          Reminders
        </ETASimpleText>
        <Card 
          headTitle='Paused orders' 
          message='Will send you info relevant, promotions and offers about our products via email.' 
        />
      </NotificationSettingContainer>

      <NotificationSettingContainer>
        <ETASimpleText
          size={15}
          weight={Platform.OS === 'ios' ? '700' : '800'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          Promotions
        </ETASimpleText>
        <Card 
          headTitle='Weekly offers' 
          message='Will send you info relevant, promotions and offers about our products via email.' 
        />
      </NotificationSettingContainer>
    </Root>
  );
}

export default NotificationsComponent;
