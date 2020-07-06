import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {ETASimpleText} from '@etaui';

const Root = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 5px;
`;
const CheckBox = styled.View`
  height: 20px;
  width: 20px;
  border-width: 2px;
  margin: 10px;
  border-radius: 3px;
`;
const TitleContainer = styled.View`
  margin-vertical: 10px;
  justify-content: center;
  align-items: center;
`;

const ETACheckBox = ({
  title,
  checkedTitle,
  color,
  onChange,
  checked,
  onPressTitle,
}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <TouchableWithoutFeedback onPress={onChange} style={{flex: 1}}>
        <CheckBox
          style={{
            backgroundColor: checked ? color : 'transparent',
            borderColor: checked ? color : 'gray',
          }}
        />
      </TouchableWithoutFeedback>

      <TouchableOpacity onPress={onPressTitle}>
        <TitleContainer>
          <ETASimpleText
            size={14}
            weight="700"
            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
            align="left">
            {checked ? checkedTitle : title}
          </ETASimpleText>
        </TitleContainer>
      </TouchableOpacity>
    </Root>
  );
};

export default ETACheckBox;
