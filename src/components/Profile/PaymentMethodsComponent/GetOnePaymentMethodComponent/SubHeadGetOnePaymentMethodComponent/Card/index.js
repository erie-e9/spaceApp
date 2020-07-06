import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const Card = styled.View`
  flex-direction: row;
  margin-bottom: 1px;
  min-height: 40px;
  align-items: center;
  padding-horizontal: 10px;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const MetadataInfo = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 5px;
  padding-horizontal: 1px;
  background-color: transparent;
`;
const MetadaInfoHead = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;
const MessageContainer = styled.View`
  flex-direction: row;
  min-height: 20px;
  align-items: center;
  padding-horizontal: 0px;
  background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const PaymentCardComponent = ({headTitle, message}) => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <Card>
        <MetadataInfo>
          <MetadaInfoHead>
            <ETASimpleText
              size={13}
              weight={Platform.OS === 'ios' ? '500' : 'bold'}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              align={'left'}>
              {headTitle}
            </ETASimpleText>
          </MetadaInfoHead>
          <MessageContainer>
            <ETASimpleText
              size={11}
              weight={Platform.OS === 'ios' ? '300' : '200'}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              align={'left'}>
              {message}
            </ETASimpleText>
          </MessageContainer>
        </MetadataInfo>
      </Card>
    </>
  );
};

export default React.memo(PaymentCardComponent);
