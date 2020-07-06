import React from 'react';
import styled from 'styled-components/native';
import HeadAccountComponent from './HeadAccountComponent';
import SubHeadAccountComponent from './SubHeadAccountComponent';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const AccountComponent = () => {
  return (
    <Root>
      <HeadAccountComponent />
      <SubHeadAccountComponent />
    </Root>
  );
};

export default AccountComponent;
