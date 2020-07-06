import React, {useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import { TouchableHighlight } from 'react-native';
import { ETASimpleText } from '@etaui';

const FixedDotContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const FixedDot = styled.View`
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${props => props.background};
`;
const ShapeMarker = styled.View`
    align-self: center; 
    width: 2px;
    height: 10px;
    borderRightWidth: 0;
    borderLeftWidth: 0;
    borderTopWidth: 20px;
    borderRightColor: transparent;    
    borderLeftColor: transparent;
    borderTopColor: ${props => props.background};
`;

const MarkerMap = ({ children, onPress, onLongPress, background }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <FixedDotContainer>
            <FixedDot background={background}/>
            <ShapeMarker background={background}/>
        </FixedDotContainer>

        // <TouchableHighlight 
        // >
        //     <Root>
        //         <MarkerContainer background={background} >
        //         </MarkerContainer>
        //         <ShapeMarker background={background}/>
        //     </Root>
        // </TouchableHighlight>
    );
}

export default React.memo(MarkerMap);
