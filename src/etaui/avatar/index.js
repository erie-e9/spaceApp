import React from 'react'
import styled from 'styled-components'
import {variables} from '@utils/constants'

const Touchable = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	height: 40px;
`
const AvatarContainer = styled.View``
const Avatar = styled.Image``

const ETAAvatar = ({image, size}) => {
	const avatarSizeMiddle = 45
	const avatarSizeSmall = 30

	return (
		<>
			<Touchable
				style={{
					height:
						size === 'middle'
							? avatarSizeMiddle
							: avatarSizeSmall,
					width:
						size === 'middle'
							? avatarSizeMiddle
							: avatarSizeSmall,
				}}>
				<AvatarContainer>
					<Avatar
						style={{
							height:
								size === 'middle'
									? avatarSizeMiddle
									: avatarSizeSmall,
							width:
								size === 'middle'
									? avatarSizeMiddle
									: avatarSizeSmall,
							borderRadius:
								size === 'middle'
									? avatarSizeMiddle / 2
									: avatarSizeSmall / 2,
						}}
						source={{
							uri:
								image ||
								variables.AVATAR_USER_DEFAULT,
						}}
					/>
				</AvatarContainer>
			</Touchable>
		</>
	)
}

export default ETAAvatar
