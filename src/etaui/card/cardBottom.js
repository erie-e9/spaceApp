import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';

let isSubmitting = !true;

const Root = styled.View`
  height: 40px;
  width: 100%;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  marginVertical: 15px;
`;

const CardBottom = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
    </Root>
  );
};

export default CardBottom;
