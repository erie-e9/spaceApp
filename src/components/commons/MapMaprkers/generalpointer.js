import React from 'react';
import styled from 'styled-components/native';
import {TouchableHighlight} from 'react-native';

const Root = styled.View`
  flex: 1;
  shadow-opacity: 0.25;
  shadow-radius: 1px;
  shadow-offset: 2px 2px;
  shadow-color: #000;
  elevation: 2;
`;
const MarkerContainer = styled.View`
  background-color: ${(props) => props.background};
  min-width: 23px;
  padding-horizontal: 4px;
  height: 18px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  position: relative;
`;
const MarkerText = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  font-size: 11px;
  font-weight: 500;
  text-align: center;
`;
const ShapeMarker = styled.View`
  align-self: center;
  width: 0px;
  height: 0px;
  bottom: 4px;
  border-right-width: 5px;
  border-right-color: transparent;
  border-top-width: 8px;
  border-top-color: ${(props) => props.background};
  border-left-width: 5px;
  border-left-color: transparent;
`;

const GeneralPointer = ({children, onPress, onLongPress, background}) => {
  return (
    <TouchableHighlight onLongPress={onLongPress} onPress={onPress}>
      <Root>
        <MarkerContainer background={background}>
          <MarkerText>{children}</MarkerText>
        </MarkerContainer>
        <ShapeMarker background={background} />
      </Root>
    </TouchableHighlight>
  );
};

export default React.memo(GeneralPointer);
