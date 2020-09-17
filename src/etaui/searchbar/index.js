import React from 'react'
import styled from 'styled-components/native'
import {FontAwesome} from '@icons'
import {ETASimpleText} from '@etaui'
import {variables} from '@utils/constants'
import { Dimensions, StyleSheet, TextInput } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'

const { Value, timing } = Animated
const { height, width } = Dimensions.get('window')

const HeaderSafeArea = styled.SafeAreaView`
	z-index: 1000;
`
const Header = styled.View`
	height: 50px;
	padding-horizontal: 10px;
	background-color: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR}
`
const HeaderInner = styled.View`
	flex: 1;
	flex-direction: row;
	overflow: hidden;
	justify-content: space-between;
	align-items: center;
	position: relative;
`
const HeaderContainer = styled.View``
// const Img = styled.Image``;
const IconButton = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	border-radius: 32px;
	margin-horizontal: 5px;
	margin-right: 15px;
	background-color: #e4e6eb;
`
const IconButtonClose = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border-radius: 40px;
	margin-horizontal: 5px;
`
const ContentSafeArea = styled.SafeAreaView`
	flex: 1;
	z-index: 1000;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ContentInner = styled.View`
	flex: 1;
    padding-top: 50px
`
const Separator = styled.View`
	height: 1px;
	margin-top: 5px;
	background-color: #e4e6eb;
`
const EmptySearchContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: -50%;
`
const EmptySearchImage = styled.Image`
	width: 50px;
	height: 50px;
	align-self: center;
	margin-vertical: 10px;
`
const Scroll = styled.ScrollView``
const SearchItem = styled.View`
	flex-direction: row;
	height: 40px;
	align-items: center;
	margin-left: 16px;
    border-bottom-width: 1px;
    border-bottom-color: #e6e4eb;
`

class ETASearchBar extends React.Component {
  
  constructor(props){
    super(props)

    // state
    this.state = {
      isFocused: false,
      keyword: ''
    }

    // animation values
    this._input_box_translate_x = new Value(width)
    this._back_button_opacity = new Value(0)
    this._content_translate_y = new Value(height)
    this._content_opacity = new Value(0)
  }

  _onFocus = () => {
    // update state
    this.setState({isFocused: true, keyword: ''})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 100,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force focus
    this.refs.input.focus()

  }

  _onBlur = () => {
    // update state
    this.setState({isFocused: false, keyword: ''})
    // animation config
    // input box
    const input_box_translate_x_config = {
      duration: 100,
      toValue: width,
      easing: Easing.inOut(Easing.ease)
    }
    const back_button_opacity_config = {
      duration: 50,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // content
    const content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease)
    }
    const content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease)
    }

    // run animation
    timing(this._input_box_translate_x, input_box_translate_x_config).start()
    timing(this._back_button_opacity, back_button_opacity_config).start()
    timing(this._content_translate_y, content_translate_y_config).start()
    timing(this._content_opacity, content_opacity_config).start()

    // force blur
    this.refs.input.blur();

  }
  
  render() {
	return (
    	<>
			<HeaderSafeArea>
				<Header>
					<HeaderInner>
						<HeaderContainer>
							{/* <Img
							//   source={require('../Assets/Facebook-Logo.png')} 
							style={{width: 152, height: 30}}
							/> */}
							<ETASimpleText
								size={22}
								weight={
									Platform.OS === 'ios'
										? 'bold'
										: 'bold'
								}
								color={this.props.leftContentColor}
								align='left'>
								{this.props.leftContent}
							</ETASimpleText>
						</HeaderContainer>
						<IconButton
							activeOpacity={1}
							underlayColor='#ccd0d5'
							// onPress={(event) => _onFocus(event)}
							onPress={this._onFocus}
							>
							<FontAwesome
								name='search'
								size={18}
								color='#000'
							/>
						</IconButton>
					<Animated.View
						style={{
							height: 50,
							flexDirection: 'row',
							alignItems: 'center',
							position: 'absolute',
							top:0,
							left:0,
							backgroundColor: 'white',
							width: width - 32,
							transform: [
								{
									translateX: this._input_box_translate_x
								},
							]
						}}
					>
						<Animated.View style={{opacity: this._back_button_opacity}}>
							<IconButtonClose
								activeOpacity={1}
								underlayColor={"#ccd0d5"}
								onPress={this._onBlur}
								style={styles.back_icon_box}
							>
							<FontAwesome
								name='chevron-left'
								size={18}
								color='#000'
								style={{
									zIndex: 2000,
								}}
							/>
						</IconButtonClose>
						</Animated.View>
							<TextInput
								ref="input"
								placeholder={this.props.placeholderText}
								placeholderTextColor='#333'
								clearButtonMode='always'
								// value={keyword}
								onChangeText={(value) => this.setState({keyword: value}) }
								underlineColorAndroid='transparent'
								style={{
									flex: 1,
									height: 40,
									backgroundColor:
										'#e4e6eb',
									borderRadius: 18,
									paddingHorizontal: 16,
									fontSize: 15,
									marginRight: 15,
									color: '#333',
								}}
							/>
					</Animated.View>
					</HeaderInner>
				</Header>
			</HeaderSafeArea>

			<Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{translateY: this._content_translate_y }] }]}>
			<ContentSafeArea>
				<ContentInner>
				<Separator />
				{
					this.state.keyword === ''
					?
					<EmptySearchContainer>
							<EmptySearchImage
								source={require('@assets/search.png')}
							/>
							<ETASimpleText
								size={14}
								weight={
									Platform.OS ===
									'ios'
										? '500'
										: '300'
								}
								color='#333'
								// color={
								// 	themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								// }
								align='center'>
								Enter a few
								words
								{'\n'}
								to search on{' '}
								{
									variables.COMPANYNAME
								}
							</ETASimpleText>
					</EmptySearchContainer>
					:
					<Scroll>
						<SearchItem style={styles.search_item}>
							<FontAwesome
								name='search'
								size={16}
								color='#ccc'
								style={{
									marginRight: 15,
								}}
							/>
							<ETASimpleText
								size={14}
								weight={
									Platform.OS ===
									'ios'
										? '700'
										: '600'
								}
								// color={
								// 	themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
								// }
								color='#333'
								align='left'>
								Fake result 1
							</ETASimpleText>
						</SearchItem>
					</Scroll>
				}
				</ContentInner>
			</ContentSafeArea>
			</Animated.View>
		</>
    )
  }
}

export default ETASearchBar

const styles = StyleSheet.create({
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },
  content: {
    width: width,
    // height: height,
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '-50%'
  },
  image_placeholder_text: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 5
  }
})
