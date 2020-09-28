import React, {useState, useRef, memo} from 'react'
import styled from 'styled-components/native'

const Root = styled.View`
    justify-content: center;
    align-items: center;
    min-height: 20px;
    min-width: 40px;
    margin: 30px 0px;
    background-color: transparent;
`
const Circle = styled.View`
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	width: ${(props) => (props.size ? props.size : 30)}px;
	height: ${(props) => (props.size ? props.size : 30)}px;
	border-radius: ${(props) => (props.size ? props.size / 2 : 30 / 2)}px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	margin: 0px 5px;
	z-index: 1000;
	background-color: ${(props) => (props.activated ? props.color : 'transparent' )};
`
const Touchable = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
    flex-direction: row;
    justify-content: center;
`

const ETAStepperPoint = memo(({ onChange, activated, size,  color, direction }) => {
    console.log('direction: ', direction);

    return (
        <Root direction={direction}>
			<Touchable
                onPress={onChange}
            >
                <Circle
                    activated={activated}
                    size={size}
                    color={color}
                />
            </Touchable>
        </Root>
    )
})

export default ETAStepperPoint