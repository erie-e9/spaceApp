import React from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight } from 'react-native';

const Root = styled.View`
    flex: 1;
    shadow-opacity: 0.25;
    shadow-radius: 1px;
    shadow-offset: 2px 2px;
    shadow-color: #000;
    elevation: 2
`;
const MarkerContainer = styled.View`
    background-color: ${props => props.background};
    min-width: 23px;
    padding-horizontal: 4px;
    height: 18px;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    position: relative
`;
const MarkerText = styled.Text`
    color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
    fontSize: 11px;
    fontWeight: 500;
    textAlign: center;
`;
const ShapeMarker = styled.View`
    align-self: center; 
    width: 0px;
    height: 0px;
    bottom: 4px;
    borderRightWidth: 5px;
    borderRightColor: transparent;    
    borderTopWidth: 8px;
    borderTopColor: ${props => props.background};
    borderLeftWidth: 5px;
    borderLeftColor: transparent;
`;

const GeneralPointer = ({ children, onPress, onLongPress, background }) => {
    return (
        <TouchableHighlight onLongPress={onLongPress} onPress={onPress}>
            <Root>
                <MarkerContainer background={background} >
                    <MarkerText>
                        {children}
                    </MarkerText>
                </MarkerContainer>
                <ShapeMarker background={background}/>
            </Root>
        </TouchableHighlight>
    );
}

export default React.memo(GeneralPointer);