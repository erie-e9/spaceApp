import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import {Dimensions, styles} from 'react-native'
import { ETASimpleText, ETAButtonOutline, ETAButtonFilled } from '@etaui'

const {width} = Dimensions.get('window')

const Root = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`
const SummaryContainer = styled.View``
const SummaryCard = styled.View``

const PaymentComponent = () => {
    const themeContext = useContext(ThemeContext)
    
    return (
        <Root>
            <ETASimpleText
                size={15}
                weight={Platform.OS === 'ios' ? '600' : '400'}
                color={
                    themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                }
                align='left'>
                Checkout
            </ETASimpleText>
            <SummaryContainer>
                <SummaryCard>
                    <ETASimpleText
                        size={15}
                        weight={Platform.OS === 'ios' ? '600' : '400'}
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='left'>
                        1 Contact information
                    </ETASimpleText>
                </SummaryCard>

                <SummaryCard>
                    <ETASimpleText
                        size={15}
                        weight={Platform.OS === 'ios' ? '600' : '400'}
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='left'>
                        2 Delivery information
                    </ETASimpleText>
                </SummaryCard>

                <SummaryCard>
                    <ETASimpleText
                        size={15}
                        weight={Platform.OS === 'ios' ? '600' : '400'}
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='left'>
                        3 Payment information
                    </ETASimpleText>
                </SummaryCard>
            </SummaryContainer>
        </Root>
    )
}

export default PaymentComponent