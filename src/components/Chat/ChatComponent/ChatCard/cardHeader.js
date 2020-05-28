import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import eoLocale from 'date-fns/locale/es';

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  alignContent: center;
  paddingHorizontal: 10px;
  paddingRight: 20px;
`;
const MetaContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  paddingHorizontal: 10px;
`;
const UserDataContainer = styled.View`
  flex: 1;
  flexDirection: column;
  alignItems: flex-start;
  justifyContent: center;
`;
const TimeContainer = styled.View`
  flex: 0.6;
  flexDirection: column;
  alignItems: center;
  justifyContent: flex-end;
`;
const Touchable = styled.TouchableOpacity``;

const CardHeader = ({username, firstname, lastname}) => {
  // , avatar, createdAt
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <MetaContainer>
        <UserDataContainer>
          <ETASimpleText
            size={15}
            weight={Platform.OS === 'ios' ? '500' : '400'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {firstname} {lastname}
          </ETASimpleText>
          <Touchable>
            <ETASimpleText
              size={13}
              weight={Platform.OS === 'ios' ? '500' : '300'}
              color={themeContext.LINK}
              align={'left'}>
              @{username}
            </ETASimpleText>
          </Touchable>
        </UserDataContainer>

        <TimeContainer>
          <ETASimpleText
            size={13}
            weight={Platform.OS === 'ios' ? '500' : '300'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {formatDistanceToNow(new Date(2019, 6, 2), { 
              addSuffix: true, 
              // locale: eoLocale // Esp
              })}
          </ETASimpleText>
        </TimeContainer>
      </MetaContainer>
    </Root>
  );
};

export default CardHeader;
