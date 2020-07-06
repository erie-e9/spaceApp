import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {ETAButtonFilled} from '@etaui';

const Root = styled.View`
  min-height: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;
const ContentContainer = styled.View`
  min-height: 10px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin: 5px;
  background-color: transparent;
`;

const SubHeadPaymentMethodComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <Root>
      <ContentContainer>
        <ETAButtonFilled
          title='New payment method'
          onPress={() => navigation.navigate('SettingsNavigator', {screen: 'NewPaymentMethodScreen'})}
          colorButton={themeContext.PRIMARY_COLOR}
          padding={10}
          width={250}
          border-radius={3}
        />
      </ContentContainer>
    </Root>
  );
}

export default React.memo(SubHeadPaymentMethodComponent);
