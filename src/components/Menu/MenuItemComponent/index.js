import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';

const Root = styled.View`
  flex: 1;
`;

const MenuItemComponent = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <Root>
      <ETASimpleText
        size={14}
        weight={Platform.OS === 'ios' ? '500' : '300'}
        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
        align={'left'}>
        Item
      </ETASimpleText>
    </Root>
  );
};

export default MenuItemComponent;
