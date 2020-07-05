import React, { useLayoutEffect, useContext } from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import ChatItemComponent from '@components/Chat/ChatItemComponent';
import {ETASimpleText, ETAAvatar} from '@etaui';
import { truncateString } from '@functions';

const Root = styled.View`
  flex: 1;
`;
const HeaderContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: space-between;
  alignItems: stretch;
  backgroundColor: transparent;
`;
const NameContainer = styled.View`
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
`;
const Touchable = styled.TouchableOpacity``;
const AvatarContainer = styled.View`
  padding: 2px 10px;
  borderRadius: 50px;
  justifyContent: center;
  alignItems: center;
`;

const ChatItemScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const themeContext = useContext(ThemeContext);
  var fullname = `${item.employee.firstname} ${item.employee.lastname}`;
  
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: () => (
      <HeaderContainer>
        <AvatarContainer>
          <ETAAvatar image={item.employee.avatar} size='small' />
        </AvatarContainer>
        <NameContainer>
          <ETASimpleText
            size={15}
            weight={Platform.OS === 'ios' ? '500' : '400'}
            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            align={'left'}>
            {
              truncateString(fullname, 40)
            }
          </ETASimpleText>
          <Touchable>
            <ETASimpleText
              size={12}
              weight={Platform.OS === 'ios' ? '400' : '300'}
              color={themeContext.LINK}
              align={'left'}>
              @
              {
                truncateString(item.employee.username, 30)
              }
            </ETASimpleText>
          </Touchable>
        </NameContainer>
      </HeaderContainer>
    )});
  }, [ navigation, route ]);
  
  return (
    <Root>
      <ChatItemComponent />
    </Root>
  );
};

export default ChatItemScreen;
