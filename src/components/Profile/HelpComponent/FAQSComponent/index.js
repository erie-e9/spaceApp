import React from 'react';
import styled from 'styled-components/native';
import QuestionsList from './QuestionsList';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const FAQSComponent = () => {
  return (
    <Root>
      <QuestionsList />
    </Root>
  );
};

export default React.memo(FAQSComponent);
