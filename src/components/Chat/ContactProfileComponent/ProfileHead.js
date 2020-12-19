import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'
import { ETASimpleText, ETAProgressiveImage } from '@etaui'
import { SharedElement } from 'react-navigation-shared-element'

const {width} = Dimensions.get('window')
const avatarSize = 90

const Root = styled.View`
    flex: 0.5;
	justify-content: flex-end;
	align-items: center;
    padding: 15px 0px 5px 0px;
	background-color: transparent;
`
const AvatarContainer = styled.View`
    align-items: center;
    justify-content: center;
	height: ${Platform.OS === 'ios' ? avatarSize + 10: avatarSize + 10}px;
	width: ${Platform.OS === 'ios' ? avatarSize + 10: avatarSize + 10}px;
    border-radius: ${avatarSize + 10 / 2}px;
    padding: 1px;
	border-width: 0.3px;
	border-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
	background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`
const DataContainer = styled.View`
    margin-top: 10px;
    padding-vertical: 7px;
    background-color: transparent;
`

const ProfileHeadComponent = ({ username, firstname, lastname, createdAt, avatar }) => {
	const themeContext = useContext(ThemeContext)

	return (
		<Root>
            <AvatarContainer>
                <SharedElement id={`chat.1.avatar`}>
                    <ETAProgressiveImage
                        thumbnailSource={{ uri: `${avatar}?w=50&buster=${Math.random()}` }}
                        source={{ uri: `${avatar}?w=${width * 2}&buster=${Math.random()}` }}
                        style={{ height: avatarSize, width: avatarSize, borderRadius: avatarSize / 2 }}
                        resizeMode='cover'
                    />
                </SharedElement>
            </AvatarContainer>
            <DataContainer> 
                <ETASimpleText
                    size={16}
                    weight={Platform.OS === 'ios' ? '400' : '600'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'>
                    {firstname} {lastname}
                </ETASimpleText>
                <ETASimpleText
                    size={13}
                    weight={Platform.OS === 'ios' ? '400' : '600'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'>
                    @{username}
                </ETASimpleText>
                <ETASimpleText
                    size={13}
					weight={Platform.OS === 'ios' ? '300' : '300'}
					color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align='center'>
                    Member from {createdAt}
                </ETASimpleText>
            </DataContainer>
		</Root>
	)
}

export default React.memo(ProfileHeadComponent)
