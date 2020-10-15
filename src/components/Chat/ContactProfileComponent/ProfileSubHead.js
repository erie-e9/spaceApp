import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform } from 'react-native'
import { ETASimpleText } from '@etaui'

const Root = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    padding-vertical: 5px;
	background-color: transparent;
`
const PointsContainer = styled.View`
    height: 30px;
    min-width: 130px;
    padding-horizontal: 5px;
    justify-content: center;
    align-items: center;
	border-radius: 5px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`

const ProfileSubHeadComponent = () => {
    const themeContext = useContext(ThemeContext)

    return (
        <Root>
            <PointsContainer>
                <ETASimpleText
                    size={14}
                    weight={Platform.OS === 'ios' ? '400' : '300'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'>
                    3,203 °pts
                </ETASimpleText>
            </PointsContainer>
        </Root>
    )
}

export default ProfileSubHeadComponent
