import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';

const Card = styled.View`
  flexDirection: row;
  marginBottom: 1px;
  minHeight: 40px;
  alignItems: center;
  paddingHorizontal: 10px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const MetadataInfo = styled.View`
  width: 100%;
  flexDirection: column;
  justifyContent: center;
  paddingBottom: 5px;
  paddingHorizontal: 1px;
  backgroundColor: transparent;
`;
const MetadaInfoHead = styled.View`
  flexDirection: row;
  justifyContent: space-between;
  alignItems: center;
  backgroundColor: transparent;
`;
const MessageContainer = styled.View`
  flexDirection: row;
  minHeight: 20px;
  alignItems: center;
  paddingHorizontal: 0px;
  backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;

const PaymentCardComponent = ({ headTitle, message }) => {
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
}

export default React.memo(PaymentCardComponent);
