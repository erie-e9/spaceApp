import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Linking, TouchableWithoutFeedback, Text } from 'react-native';
import { ETASimpleText } from '@etaui';


const ETALink = ({ url, text, size, weight, color, align }) => {
    const themeContext = useContext(ThemeContext);

    const openLink = () => {
        Linking.openURL(url).catch(err => console.error('An error occurred openning link', err));
    };
    
    return (
        <>
            <ETASimpleText
                onPress={() => openLink()} 
                size={size} 
                weight={weight} 
                color={color} 
                align={align} >
                {text}
            </ETASimpleText>
        </>
    );
}

export default ETALink;