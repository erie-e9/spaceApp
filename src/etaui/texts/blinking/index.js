import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
  alignItems: center;
  justifyContent: center;
`;

const ETABlinkingText = ({
  children,
  size,
  weight,
  color,
  align,
  onPress,
  style,
  time
}) => {

    const [ textBlink, settextBlink ] = useState(true);

    useEffect(() => {
        let isSubscribed = true
        setInterval(() => {
            settextBlink(!textBlink);
        }, 1000)
        return () => isSubscribed = false
    }, [textBlink])

    return (
        <Text
        onPress={onPress ? onPress : null}
        style={{
            textAlign: align ? align : 'center',
            color: color ? color : 'black',
            fontWeight: weight ? weight : '500',
            fontSize: size ? size : 14,
            ...style,
        }}>
            {
                textBlink === true
                ?   children
                :   ' '
            }
            </Text>
        );
}

// export default React.memo(ETABlinkingText);
export default ETABlinkingText;
