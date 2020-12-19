import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'
import { ETASimpleText, ETALink } from '@etaui'
import {
	Octicons,
	SimpleLineIcons,
    FontAwesome,
    AntDesign
} from '@icons'
import { variables } from '@utils/constants'

const iconSize = 23
const {width} = Dimensions.get('window')

const Root = styled.View`
    flex: 0.2;
    justify-content: flex-start;
    align-items: center;
    padding-vertical: 5px;
	background-color: transparent;
`
const PointsContainer = styled.View`
    height: 30px;
    min-width: 130px;
    padding-horizontal: 5px;
    margin-bottom: 7px;
    justify-content: center;
    align-items: center;
	border-radius: 5px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
    background-color: transparent;
`
const AccountsContainer = styled.View`
    width: ${width}px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 60px;
    background-color: transparent;
`
const ButtonContainer = styled.TouchableOpacity`
	height: 30px;
	width: 30px;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
	background-color: ${props => props.theme.GRAYFACEBOOK};
`
const TitleContainer = styled.View`
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
            <AccountsContainer>
                <ButtonContainer>
                    <ETALink
                        url={`tel:`}
                        size={13}
                        weight={
                            Platform.OS === 'ios' ? '300' : '200'
                        }
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='justify'
                        text={null}
                    >
                        <AntDesign
                            name='phone'
                            size={iconSize - 6}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </ETALink>
                </ButtonContainer>
                <ButtonContainer>
                    <ETALink
                        url={`https://wa.me/${variables.COMPANYWHATSAPP}`}
                        size={13}
                        weight={
                            Platform.OS === 'ios' ? '300' : '200'
                        }
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='justify'
                        text={null}
                    >
                        <FontAwesome
                            name='whatsapp'
                            size={iconSize - 6}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </ETALink>
                        
                </ButtonContainer>
                <ButtonContainer>
                    <ETALink
                        url={variables.COMPANYFACEBOOK}
                        size={13}
                        weight={
                            Platform.OS === 'ios' ? '300' : '200'
                        }
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='justify'
                        text={null}
                    >
                        <SimpleLineIcons
                            name='social-facebook'
                            size={iconSize - 6}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </ETALink>
                </ButtonContainer>
                <ButtonContainer>
                    <ETALink
                        url={variables.COMPANYTWITTER}
                        size={13}
                        weight={
                            Platform.OS === 'ios' ? '300' : '200'
                        }
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='justify'
                        text={null}
                    >
                        <SimpleLineIcons
                            name='social-twitter'
                            size={iconSize - 6}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </ETALink>
                </ButtonContainer>
                <ButtonContainer>
                    <ETALink
                        url={variables.COMPANYINSTAGRAM}
                        size={13}
                        weight={
                            Platform.OS === 'ios' ? '300' : '200'
                        }
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='justify'
                        text={null}
                    >
                        <SimpleLineIcons
                            name='social-instagram'
                            size={iconSize - 8}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </ETALink>
                </ButtonContainer>
                <ButtonContainer>
                    <ETALink
                        url={variables.COMPANYINSTAGRAM}
                        size={13}
                        weight={
                            Platform.OS === 'ios' ? '300' : '200'
                        }
                        color={
                            themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                        }
                        align='justify'
                        text={null}
                    >
                        <Octicons
                            name='mail'
                            size={iconSize - 6}
                            color={
                                themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                            }
                        />
                    </ETALink>
                </ButtonContainer>
            </AccountsContainer>
        </Root>
    )
}

export default ProfileSubHeadComponent
