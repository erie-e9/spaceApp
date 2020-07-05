import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { ETASimpleText } from '@etaui';

const Root = styled.View`
    flex: 1;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    marginVertical: 5px;
`;
const CheckBox = styled.View`
    height: 20px;
    width: 20px;
    borderWidth: 2px;
    margin: 10px;
    borderRadius: 3px
`;
const TitleContainer = styled.View`
    marginVertical: 10px;
    justifyContent: center;
    alignItems: center;
`;

const ETACheckBox = ({ title, checkedTitle, color, onChange, checked, onPressTitle }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <TouchableWithoutFeedback 
                onPress={onChange}
                style={{ flex: 1 }} >
                <CheckBox style={{ backgroundColor: checked ? color : 'transparent', borderColor: checked ? color : 'gray' }} />
            </TouchableWithoutFeedback>
            
            <TouchableOpacity onPress={onPressTitle}>
                <TitleContainer>
                    <ETASimpleText size={14} weight='700' color={themeContext.PRIMARY_TEXT_COLOR_LIGHT} align='left' >{checked ? checkedTitle : title}</ETASimpleText>
                </TitleContainer>
            </TouchableOpacity>
        </Root>
    );
}

export default ETACheckBox;