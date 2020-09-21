import React, { useContext, memo } from 'react'
import { Dimensions } from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText} from '@etaui'

const { width } = Dimensions.get('window')

const Root = styled.View`
	min-width: ${width - 100}px;
    min-height: 300px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
    shadow-offset: 1px 3px;
    shadow-radius: 5px;
    shadow-opacity: 0.15;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const ProductComponent = memo(({ stepTtitle, children }) => {
    const themeContext = useContext(ThemeContext)

    return (
        <Root>
            {children}
            <ETASimpleText
                size={16}
                weight={
                    Platform.OS === 'ios'
                    ? '700'
                    : 'bold'
                }
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align='center'
                style={{ marginTop: 20 }}
                >
                {stepTtitle}
            </ETASimpleText>
        </Root>
    )
})

export default ProductComponent