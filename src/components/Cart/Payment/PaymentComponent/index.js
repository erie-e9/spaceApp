import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
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
const DirectionContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 40px;
	margin: 20px 0px 0px 0px;
	padding-vertical: 5px;
	padding-horizontal: 10px;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: transparent;
`

const PaymentComponent = () => {
    const themeContext = useContext(ThemeContext)
	const route = useRoute()
	const navigation = useNavigation()
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
                    <DirectionContainer>
                        <ETAButtonOutline
                            title='Send to Home'
                            onPress={() =>
                                navigation.navigate(
                                    'SettingsNavigator',
                                    {
                                        screen:
                                            'MapAddressesScreen',
                                        params: {
                                            data: {
                                                _id: 1,
                                                headTitle:
                                                    'Home',
                                                details:
                                                    'Josue Junction, Ohio, 12661 42616-7741, Liechtenstein.',
                                                latitude: 24.02574090527505,
                                                isDefault: true,
                                                longitude: -104.67300467638253,
                                            },
                                        },
                                    },
                                )
                            }
                            // disabled={data.length === 0 ? true : false}
                            colorButton={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            padding={10}
                            width={240}
                            borderRadius={3}
                            borderWidth={0.3}
                        />
                    </DirectionContainer>
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