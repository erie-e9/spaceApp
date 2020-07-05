import React from 'react';
import styled from 'styled-components/native';
import { TouchableHighlight } from 'react-native';

const Root = styled.View`
    flex: 1;
    shadowOpacity: 0.25;
    shadowRadius: 1px;
    shadowOffset: 2px 2px;
    shadowColor: #000;
    elevation: 2
`;
const MarkerContainer = styled.View`
    backgroundColor: ${props => props.background};
    minWidth: 23px;
    paddingHorizontal: 4px;
    height: 18px;
    alignItems: center;
    justifyContent: center;
    borderRadius: 3px;
    position: relative
`;
const MarkerText = styled.Text`
    color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
    fontSize: 11px;
    fontWeight: 500;
    textAlign: center;
`;
const ShapeMarker = styled.View`
    alignSelf: center; 
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