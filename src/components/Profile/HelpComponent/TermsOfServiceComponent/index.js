import React from 'react';
import styled from 'styled-components/native';
import HeadTermsOfServiceComponent from './HeadTermsOfServiceComponent';
import SubHeadTermsOfServiceComponent from './SubHeadTermsOfServiceComponent';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const TermsOfServiceComponent = () => {
  return (
    <Root>
      <HeadTermsOfServiceComponent />
      <SubHeadTermsOfServiceComponent />
    </Root>
  );
};

export default TermsOfServiceComponent;
