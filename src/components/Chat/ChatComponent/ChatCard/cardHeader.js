import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import eoLocale from 'date-fns/locale/es';
import { truncateString } from '@functions';

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
  flex: 1;
  flexDirection: column;
  alignItems: center;
  justifyContent: flex-end;
  right: 5px; 
`;
const Touchable = styled.TouchableOpacity``;

const CardHeader = ({username, firstname, lastname, createdAt}) => {
  // console.log('ewe', createdAt);
  const themeContext = useContext(ThemeContext);
  var fullname = `${firstname} ${lastname}`;

  return (
    <Root>
      <MetaContainer>
        <UserDataContainer>
          <ETASimpleText
            size={14}
            weight={Platform.OS === 'ios' ? '500' : '800'}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            align={'left'}>
            {
              truncateString(fullname, 40)
            }
          </ETASimpleText>
          <Touchable>
            <ETASimpleText
              size={11}
              weight={Platform.OS === 'ios' ? '500' : '300'}
              color={themeContext.LINK}
              align={'left'}>
              @
              {
                truncateString(username, 40)
              }
            </ETASimpleText>
          </Touchable>
        </UserDataContainer>

        <TimeContainer>
          <ETASimpleText
            size={11}
            weight={Platform.OS === 'ios' ? '500' : '300'}
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align={'left'}>
            {formatDistanceToNow(new Date(), { 
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
