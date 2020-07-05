import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import QuestionsList from './QuestionsList';

const Root = styled.View`
  flex: 1;
  flexDirection: column;
  alignItems: center;
  paddingTop: 15px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const FAQSComponent = () => {

  return (
    <Root>
      <QuestionsList />
    </Root>
  );
}

export default React.memo(FAQSComponent);
