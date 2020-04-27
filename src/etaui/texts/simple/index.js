import React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text`
    alignItems: center;
    justifyContent: center;
`;

const ETASimpleText = ({ children, size, weight, color, align, onPress }) => {
    
    return (
        <Text
            onPress={onPress ? onPress : null}
            style={{
                textAlign: align ? align : 'center',
                color: color ? color : 'black',
                fontWeight: weight ? weight : 500,
                fontSize: size ? size : '14px'
            }}>
            {children ? children : 'Text'}
        </Text>
    );
}

export default ETASimpleText;