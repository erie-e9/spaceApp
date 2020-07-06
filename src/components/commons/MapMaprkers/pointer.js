import React from 'react';
import styled from 'styled-components/native';

const FixedDotContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const FixedDot = styled.View`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.background};
`;
const ShapeMarker = styled.View`
  align-self: center;
  width: 2px;
  height: 10px;
  border-right-width: 0;
  border-left-width: 0;
  border-top-width: 20px;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top-color: ${(props) => props.background};
`;

const MarkerMap = ({children, onPress, onLongPress, background}) => {
  return (
    <FixedDotContainer>
      <FixedDot background={background} />
      <ShapeMarker background={background} />
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
};

export default React.memo(MarkerMap);
