import React, {useContext} from 'react'
import {Platform, Dimensions} from 'react-native'
import styled, {ThemeContext} from 'styled-components'
import {ETASimpleText} from '@etaui'
import {Ionicons, Feather} from '@icons'

const {width} = Dimensions.get('window')

const Root = styled.View`
	flex-direction: column;
    background-color: transparent
`
const Item = styled.View`
    width: ${width}px;
    flex-direction: column;
	justify-content: center;
	align-items: stretch;
	min-height: 65px;
	padding: 5px 20px 0px 20px;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	shadow-offset: 2px 3px;
	shadow-radius: 2px;
	shadow-opacity: 0;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ItemHeadContainer = styled.View`
    flex-direction: row;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
`
const StatusContainer = styled.View`
    flex-direction: row;
	justify-content: flex-start;
	align-items: center;
    border-width: 0px;
    border-color: ${(props) => props.theme.GRAYFACEBOOK};
    border-radius: 5px;
    background-color: transparent;
`;
const ItemBodyContainer = styled.View`
    margin-top: 5px;
    margin-left: 20px;
    flex-direction: row;
	justify-content: space-between;
    background-color: transparent;
`
const IconContainer = styled.View`
	flex: 0.1;
	justify-content: center;
	align-items: flex-end;
	background-color: transparent;
`

const PreviousOrdersItemComponent = ({ item }) => {
    const themeContext = useContext(ThemeContext)


    return (
        <Root>
            <Item>
                <ItemHeadContainer>
                    <StatusContainer>
                        <Ionicons
                            name={item.status === 1 ? 'md-checkmark-circle-outline' : 'md-close-circle-outline'}
                            size={18}
                            color={item.status === 1 ? themeContext.SUCCESS_COLOR : themeContext.FAIL_COLOR}
                        />
                        <ETASimpleText
                            size={13}
                            weight={
                                Platform.OS ===
                                'ios'
                                ? '400'
                                : 'bold'
                            }
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                            align='left'
                            style={{
                                marginHorizontal: 5
                            }}>
                            {
                                item.status === 1
                                ? 'Delivered order'
                                : 'Canceled order'
                            }
                        </ETASimpleText>
                        <ETASimpleText
                            size={13}
                            weight={
                                Platform.OS ===
                                'ios'
                                ? '400'
                                : '800'
                            }
                            color={
                                themeContext.PRIMARY_TEXT_COLOR_LIGHT
                            }
                            align='left'>
                            {item._id}
                        </ETASimpleText>
                    </StatusContainer>
                    <ETASimpleText
                        size={11}
                        weight={
                            Platform.OS === 'ios'
                            ? '400'
                            : '300'
                        }
                        color={
                            themeContext.PRIMARY_TEXT_COLOR_LIGHT
                        }
                        align='left'>
                        {item.orderdate}
                    </ETASimpleText>
                </ItemHeadContainer>
                <ItemBodyContainer>
                    <ETASimpleText
                        size={13}
                        weight={
                            Platform.OS ===
                            'ios'
                            ? '400'
                            : '300'
                        }
                        color={
                            themeContext.PRIMARY_TEXT_COLOR_LIGHT
                        }
                        align='left'>
                        {item.items.length} Items
                    </ETASimpleText>
                    <IconContainer>
                        <Feather
                            name='chevron-right'
                            size={15}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
				</IconContainer>
                </ItemBodyContainer>

            </Item>
        </Root>
    )
}

export default React.memo(PreviousOrdersItemComponent)