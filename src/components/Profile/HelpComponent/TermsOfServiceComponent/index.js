import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import HeadTermsOfServiceComponent from './HeadTermsOfServiceComponent';
import SubHeadTermsOfServiceComponent from './SubHeadTermsOfServiceComponent';

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const TermsOfServiceComponent = () => {

  return (
    <Root>
      <HeadTermsOfServiceComponent/>
      <SubHeadTermsOfServiceComponent />
    </Root>
  );
}

export default TermsOfServiceComponent;
