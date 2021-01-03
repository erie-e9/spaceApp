import React, { useContext, memo } from 'react'
import styled, { ThemeContext} from 'styled-components/native'
import { ETASimpleText } from '@etaui'
import { AntDesign } from '@icons'

const Root = styled.View`
    justify-content: center;
    align-items: center;
    min-height: 20px;
    min-width: 40px;
    background-color: transparent;
`
const Circle = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: ${(props) => (props.size ? props.size : 30)}px;
	height: ${(props) => (props.size ? props.size : 30)}px;
	border-radius: ${(props) => (props.size ? props.size / 2 : 30 / 2)}px;
	border-width: 0.75px;
	border-color: ${(props) => (props.activated ? 'transparent' : props.theme.SECONDARY_TEXT_BACKGROUND_COLOR )};
	z-index: 1000;
	background-color: ${(props) => props.color};
`
const Touchable = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const ETAStepperPoint = memo(({ onChange, activated, size,  color, direction, position }) => {
    console.log('direction: ', direction)
    const themeContext = useContext(ThemeContext)

    return (
        <Root direction={direction}>
			<Touchable
                onPress={onChange}
            >
                <Circle
                    activated={activated}
                    size={size}
                    color={color}
                >
                    <ETASimpleText
                        size={14}
                        weight={
                            Platform.OS === 'ios'
                                ? '400'
                                : '400'
                        }
                        color={color == '#25D366' ? '#f7f7f7' : activated ? '#333' : themeContext.SECONDARY_BACKGROUND_COLOR_LIGHT}
                        align='center'
                        style={{
                            elevation: 4,
                            textShadowColor:
                                themeContext.THIRD_TEXT_COLOR_LIGHT,
                            textShadowOffset: {
                                width: 0.5,
                                height: 0.7,
                            },
                            textShadowRadius: 3,
                        }}>
                        {position}
                    </ETASimpleText>
                </Circle>
            </Touchable>
        </Root>
    )
})

export default ETAStepperPoint