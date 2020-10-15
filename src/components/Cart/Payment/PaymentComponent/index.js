import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import {Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ETASimpleText, ETAButtonOutline, ETAButtonFilled } from '@etaui'
import { currencySeparator } from '@functions'

const {width} = Dimensions.get('window')

const Root = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`
const SummaryContainer = styled.View`
    flex: 1;
    margin-top: 5px;
`
const SummaryCard = styled.View`
    min-height: 60px;
    width: ${width - 30}px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
	padding: 15px 30px;
    background-color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const SummaryRow = styled.View`
    min-height: 30px;
    flex-direction: row;
	justify-content: space-between;
    align-items: stretch;
    width: 100%;
	margin: 2px 0px 0px 0px;
    margin-vertical: 1px;
    background-color: transparent;
`

const PaymentComponent = () => {
    const themeContext = useContext(ThemeContext)
	const route = useRoute()
    const { data, total, subtotal, totalItems } = route?.params

    return (
        <Root>
            <SummaryContainer>
                <SummaryCard>
                    <ETASimpleText
                        size={15}
                        weight={Platform.OS === 'ios' ? '600' : 'bold'}
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='left'>
                        1 Summary
                    </ETASimpleText>

                    <SummaryRow>
                        <ETASimpleText
                            size={15}
                            weight={Platform.OS === 'ios' ? '600' : '400'}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'>
                            Total
                        </ETASimpleText>
                        <ETASimpleText
                            size={15}
                            weight={Platform.OS === 'ios' ? '600' : '400'}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'>
                            ${currencySeparator(
                                total.toFixed(2),
                            )}
                        </ETASimpleText>
                    </SummaryRow>

                    <SummaryRow>
                        <ETASimpleText
                            size={15}
                            weight={Platform.OS === 'ios' ? '600' : '400'}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'>
                            {totalItems} Products
                        </ETASimpleText>
                    </SummaryRow>
                </SummaryCard>

                <SummaryCard>
                    <ETASimpleText
                        size={15}
                        weight={Platform.OS === 'ios' ? '600' : 'bold'}
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
                        weight={Platform.OS === 'ios' ? '600' : 'bold'}
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