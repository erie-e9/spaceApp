import React from 'react';
import styled from 'styled-components/native';
import GetOneItemComponent from '@components/Menu/GetOneItemComponent';

const Root = styled.View`
  flex: 1;
`;

const GetOneItemScreen = () => {
  
  return (
    <Root>
      <GetOneItemComponent />
    </Root>
  );
};

export default GetOneItemScreen;
