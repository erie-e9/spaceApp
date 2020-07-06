import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'

const TextInputContainer = styled.View`
	border-radius: 30px;
	margin-vertical: 5px;
	margin-horizontal: 5px;
	flex-direction: row;
	justify-content: center;
	align-items: flex-end;
	align-self: flex-end;
	align-content: flex-end;
	padding-horizontal: 25px;
	shadow-color: #ccc;
	shadow-offset: 2px 2px;
	shadow-opacity: 0.4;
	shadow-radius: 1.4px;
	elevation: 1;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`
const TextInput = styled.TextInput.attrs({})`
	width: ${(props) => (props.width ? props.width : 300)}px;
	height: ${(props) => (props.height ? props.height : 40)}px;
	font-size: ${(props) => (props.textsize ? props.textsize : 14)}px;
	color: ${(props) => props.theme.PRIMARY_COLOR};
	margin: 5px;
	justify-content: center;
	align-items: center;
	align-self: center;
	align-content: center;
`

const ETATextInputFilled = ({
	rightIcon,
	value,
	placeholder,
	placeholderTextColor,
	keyboardType,
	autoCapitalize,
	allowFontScaling,
	autoCorrect,
	autofocus,
	bluronsubmit,
	caretHidden,
	clearButtonMode,
	contextMenuHidden,
	editable,
	enablesReturnKeyAutomatically,
	keyboardAppearance,
	maxLength,
	multiline,
	numberoflines,
	returnkeylabel,
	secureTextEntry,
	selectionColor,
	spellcheck,
	textContentType,
	returnkeytype,
	textAlign,
	textsize,
	height,
	width,
	onChangeText,
	paddingHorizontal,
}) => {
	const themeContext = useContext(ThemeContext)

	return (
		<>
			<TextInputContainer style={{width, height}}>
				<TextInput
					value={value}
					placeholder={placeholder}
					placeholderTextColor={
						placeholderTextColor ||
						themeContext.PRIMARY_COLOR
					}
					keyboardType={keyboardType}
					autoCapitalize={autoCapitalize}
					allowFontScaling={allowFontScaling}
					autoCorrect={autoCorrect}
					autoFocus={autofocus}
					blurOnSubmit={false}
					caretHidden={caretHidden}
					clearButtonMode={clearButtonMode}
					contextMenuHidden={contextMenuHidden}
					editable={editable}
					enablesReturnKeyAutomatically={
						enablesReturnKeyAutomatically
					}
					// underlineColorAndroid='transparent'
					keyboardAppearance={keyboardAppearance}
					maxLength={maxLength}
					multiline={multiline}
					numberOfLines={numberoflines} // android
					returnKeyLabel={returnkeylabel} // android
					secureTextEntry={secureTextEntry} // password
					selectionColor={selectionColor}
					spellCheck={spellcheck}
					textContentType={textContentType}
					returnKeyType={returnkeytype}
					textsize={textsize}
					height={height}
					width={width}
					// selection='1, 4'//? no sé we xd
					// onBlur={text => this._onBlur(text)}
					onChangeText={onChangeText}
					// onEndEditing={text => this._onEndEditing(text)}
					// onFocus={text => this._onFocus(text)}
					// ref={(input) => {this.emailInput = input }}
					// onKeyPress={}
					// onScroll={}
					paddingHorizontal={paddingHorizontal || 15}
				/>
				{rightIcon}
			</TextInputContainer>
		</>
	)
}

export default ETATextInputFilled
/*  Notes
autoCapitalize enum:('none', 'sentences', 'words', 'characters')

keyboardType enum:('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation',
                'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password')

textContentType enum:('none', 'URL', 'addressCity', 'addressCityAndState', 'addressState', 'countryName', 'creditCardNumber',
'emailAddress', 'familyName', 'fullStreetAddress', 'givenName', 'jobTitle', 'location', 'middleName', 'name', 'namePrefix',
'nameSuffix', 'nickname', 'organizationName', 'postalCode', 'streetAddressLine1', 'streetAddressLine2', 'sublocality',
'telephoneNumber', 'username', 'password')

returnKeyType enum:('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call',
                    'google', 'join', 'route', 'yahoo')
clearButtonMode enum:('never', 'while-editing', 'unless-editing', 'always')
secureTextEntry boolean: default false
*/
