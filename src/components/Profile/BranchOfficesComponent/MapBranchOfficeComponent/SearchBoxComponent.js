import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ETATextInputOutline} from '@etaui'
import {FontAwesome} from '@icons'

const SearchBox = styled.View`
	position: absolute;
	margin-top: ${Platform.OS === 'ios' ? 40 : 20}px;
	flex-direction: row;
	width: 90%;
	border-radius: 5px;
	justify-content: center;
	align-self: center;
	align-items: flex-start;
	align-content: center;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
	elevation: 1;
`
const HeaderLeft = styled.TouchableOpacity`
	margin-left: 15px;
	margin-top: 10px;
`
const HeaderRight = styled.TouchableOpacity`
	margin-right: 15px;
	margin-top: 15px;
`

const SearchBoxComponent = ({currentPosition}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	return (
		<SearchBox
			style={{
				shadowColor: '#333',
				shadowOpacity: 0.5,
				shadowOffset: {height: 7},
				shadowRadius: 2,
				elevation: 5,
			}}>
			<HeaderLeft onPress={() => navigation.goBack()}>
				<FontAwesome
					name='angle-left'
					size={25}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
			</HeaderLeft>
			<ETATextInputOutline
				value=''
				placeholder='Search branch office'
				placeholderTextColor={
					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
				}
				keyboardType='default'
				autoCapitalize='none'
				allowFontScaling
				autoCorrect
				autoFocus
				blurOnSubmit={false}
				caretHidden={false}
				clearButtonMode='while-editing'
				contextMenuHidden={false}
				editable
				enablesReturnKeyAutomatically={false}
				underlineColorAndroid='transparent'
				keyboardAppearance='dark'
				maxLength={100}
				multiline={false}
				numberOfLines={1} // android
				returnKeyLabel='next' // android
				secureTextEntry={false} // password
				spellCheck
				textContentType='none'
				returnKeyType='next'
				textsize={14}
				height={40}
				width={240}
				borderWidth={0}
				// onChangeText={handleChange('search')}
				// onBlur={handleBlur('search')}
				selectionColor={themeContext.PRIMARY_COLOR}
				paddingHorizontal={15}
			/>
			<HeaderRight onPress={currentPosition}>
				<FontAwesome
					name='location-arrow'
					size={20}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
			</HeaderRight>
		</SearchBox>
	)
}

export default React.memo(SearchBoxComponent)
