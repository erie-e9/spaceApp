import React from 'react';
import styled from 'styled-components/native';
import TermsOfServiceComponent from '@components/Profile/HelpComponent/TermsOfServiceComponent';

const Root = styled.View`
  flex: 1;
`;

const TermsOfServiceScreen = () => {
  return (
    <Root>
      <TermsOfServiceComponent />
    </Root>
  );
};

export default TermsOfServiceScreen;
