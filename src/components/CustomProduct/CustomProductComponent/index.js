import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {useRoute} from '@react-navigation/native'
import {ETASimpleText, ETAButtonFilled, ETAMultiStep} from '@etaui'
import { IceCreamComponent } from '@icons'

const Root = styled.View`
	flex: 1;
    width: 100%;
    background-color: transparent
`
const StepContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
`
const HeadContainer = styled.View`
    flex: 0.3;
    justify-content: center;
    align-items: center;
    padding-horizontal: 30px;
    background-color: transparent
`
const ItemsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding-horizontal: 30px;
    background-color: transparent
`
const IconContainer = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 90px;
    width: 90px;
    border-radius: 45px;
	background-color: #F6F6F6;
`
const ItemContainer = styled.View`
    flex: 1;
    align-items: center;
    background-color: transparent
`

const CustomProductComponent = () => {
    const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const { itemTitle } = route?.params;
    
    return (
        <Root>
            <HeadContainer>
                <ETASimpleText
                    size={20}
                    weight={
                        Platform.OS === 'ios'
                        ? '700'
                        : 'bold'
                    }
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'
                    style={{ marginTop: 10 }}>
                    Create your own style
                </ETASimpleText>
                <ETASimpleText
                    size={14}
                    weight={
                        Platform.OS === 'ios'
                        ? '400'
                        : '500'
                    }
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'
                    style={{ marginTop: 10 }}>
                    Here you can choose flavors and color for your {itemTitle}
                </ETASimpleText>
            </HeadContainer>

            <ETAMultiStep>
                <ETAMultiStep.Step>
                    <StepContainer>
                        <ETASimpleText
                            size={16}
                            weight={
                                Platform.OS === 'ios'
                                ? '700'
                                : 'bold'
                            }
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align='center'
                            style={{ marginBottom: 20 }}
                            >
                            Choose a size
                        </ETASimpleText>
                        <ItemsContainer>
                            <ItemContainer>
                                <IconContainer>
                                    <IceCreamComponent size={14} />
                                </IconContainer>
                                <ETASimpleText
                                    size={14}
                                    weight={
                                        Platform.OS === 'ios'
                                        ? '400'
                                        : '300'
                                    }
                                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    align='center'
                                    style={{ marginTop: 10 }}
                                    >
                                    small
                                </ETASimpleText>
                            </ItemContainer>
                        
                            <ItemContainer>
                                <IconContainer>
                                    <IceCreamComponent size={13} />
                                </IconContainer>
                                <ETASimpleText
                                    size={14}
                                    weight={
                                        Platform.OS === 'ios'
                                        ? '400'
                                        : '300'
                                    }
                                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    align='center'
                                    style={{ marginTop: 10 }}
                                    >
                                    middle
                                </ETASimpleText>
                            </ItemContainer>
                        
                            <ItemContainer>
                                <IconContainer>
                                    <IceCreamComponent size={11} />
                                </IconContainer>
                                <ETASimpleText
                                    size={14}
                                    weight={
                                        Platform.OS === 'ios'
                                        ? '400'
                                        : '300'
                                    }
                                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    align='center'
                                    style={{ marginTop: 10 }}
                                    >
                                    big
                                </ETASimpleText>
                            </ItemContainer>
                        </ItemsContainer>
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
