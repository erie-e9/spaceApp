import React, {useContext} from 'react';
import {Platform} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, FontAwesome, AntDesign, Octicons} from '@icons';
import {Context} from '@context';
import {ETAAvatar, ETASimpleText} from '@etaui';

const Root = styled.View`
    flex: 0.6;
    width: 100%;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;

const ProfileHeadComponent = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <ETASimpleText
                size={42}
                weight={Platform.OS === 'ios' ? '700' : '600'}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'left'}>
                100
            </ETASimpleText>
            <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '400' : '600'}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'left'}>
                pts
            </ETASimpleText>
        </Root>
    );
}

export default React.memo(ProfileHeadComponent);