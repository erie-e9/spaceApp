import React from 'react';
import styled from 'styled-components/native';

const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;
const T = styled.Text`

`;

const ChatsScreen = () => {
    return (
        <Root>
            <T>Chats</T>
        </Root>  
      );
}

export default ChatsScreen;