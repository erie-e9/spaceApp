import React, { useLayoutEffect, useContext } from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import ChatItemComponent from '@components/Chat/ChatItemComponent';
import {ETASimpleText} from '@etaui';

const Root = styled.View`
  flex: 1;
`;
const HeaderContainer = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
`;
const Touchable = styled.TouchableOpacity``;

const ChatItemScreen = ({ navigation, route }) => {
  const { item } = route.params.params;
  const themeContext = useContext(ThemeContext);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: () => (
      <HeaderContainer>
        <ETASimpleText
          size={15}
          weight={Platform.OS === 'ios' ? '500' : '400'}
          color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          align={'left'}>
          {item.employee.firstname} {item.employee.lastname}
        </ETASimpleText>
        <Touchable>
          <ETASimpleText
            size={13}
            weight={Platform.OS === 'ios' ? '500' : '300'}
            color={themeContext.LINK}
            align={'left'}>
            @{item.employee.username}
          </ETASimpleText>
        </Touchable>
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
