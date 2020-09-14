import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {useRoute} from '@react-navigation/native'
import {ETASimpleText, ETAButtonFilled, ETAMultiStep} from '@etaui'

const Root = styled.View`
	flex: 1;
    width: 100%;
`
const StepContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const CustomProductComponent = () => {
    const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const { itemTitle } = route?.params
    
    return(
        <Root>
            <ETAMultiStep>
                <ETAMultiStep.Step>
                    <StepContainer>
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                ? '400'
                                : '300'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'>
                            {itemTitle ? itemTitle : 'Custom product'}
                        </ETASimpleText>
                        
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                ? '400'
                                : '300'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'>
                                Step 1
                        </ETASimpleText>
                    </StepContainer>
                </ETAMultiStep.Step>
                
                <ETAMultiStep.Step>
                    <StepContainer>
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                ? '400'
                                : '300'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'>
                            {itemTitle ? itemTitle : 'Custom product'}
                        </ETASimpleText>
                        
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                ? '400'
                                : '300'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'>
                                Step 2
                        </ETASimpleText>
                    </StepContainer>
                </ETAMultiStep.Step>
                
                <ETAMultiStep.Step>
                    <StepContainer>
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                ? '400'
                                : '300'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'>
                            {itemTitle ? itemTitle : 'Custom product'}
                        </ETASimpleText>
                        
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                ? '400'
                                : '300'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'>
                                Step 3
                        </ETASimpleText>
                    </StepContainer>
                </ETAMultiStep.Step>
            </ETAMultiStep>
        </Root>
    )
}

export default CustomProductComponent
