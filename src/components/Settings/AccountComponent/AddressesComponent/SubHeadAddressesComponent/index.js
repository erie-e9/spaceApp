import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { ETAButtonFilled } from '@etaui'
import { useTranslation } from '@etaui/translate'

const Root = styled.View`
	min-height: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const ContentContainer = styled.View`
	min-height: 10px;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	margin: 5px;
	background-color: transparent;
`

const SubHeadAddressesComponent = () => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const { new_address } = useTranslation()

	return (
		<Root>
			<ContentContainer>
				<ETAButtonFilled
					title={new_address.charAt(0).toUpperCase() + new_address.slice(1)}
					onPress={() =>
						navigation.navigate('SettingsNavigator', {
							screen: 'MapAddressesScreen',
							params: {
								data: null,
							},
						})
					}
					colorButton={themeContext.PRIMARY_COLOR}
					padding={10}
					width={250}
					borderRadius={3}
				/>
			</ContentContainer>
		</Root>
	)
}

export default React.memo(SubHeadAddressesComponent)
