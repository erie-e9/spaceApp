import React from 'react';
import styled from 'styled-components/native';
import ChatsList from '@components/ChatsList';
import data from '@utils/chats.json';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const ChatsScreen = () => {
  return (
    <Root>
      <ChatsList data={data} />
    </Root>
  );
};

export default ChatsScreen;
