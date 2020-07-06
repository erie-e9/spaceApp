import React from 'react';
import styled from 'styled-components/native';
import ChatComponent from '@components/Chat/ChatComponent';
import data from '@utils/chats.json';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ChatScreen = () => {
  return (
    <Root>
      <ChatComponent data={data} />
    </Root>
  );
};

export default ChatScreen;
