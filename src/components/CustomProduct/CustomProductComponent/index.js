import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, KeyboardAvoidingView, Keyboard, Animated, Dimensions } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { ETATextInputOutline, ETASimpleText, ETALoader, ETAMultiStep } from '@etaui'
import { currencySeparator } from '@functions'
import { CustomProductIcon1, CustomProductIcon2 } from '@icons'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/customproduct/flavors/actions'
import { ADD_TO_CART } from '@redux/cart/actions'
import ProductComponent from './ProductComponent'
import { useTranslation } from '@etaui/translate'

const {width} = Dimensions.get('window')

const KeyboardMisser = styled.TouchableWithoutFeedback`
	flex: 1;
	width: 100%;
`
const Root = styled.TouchableWithoutFeedback`
	flex: 1;
`
const StepContainer = styled.View`
	flex: 1;
	flex-direction: column;
	background-color: transparent;
`
const ContentContainer = styled.View`
	flex: 1;
	width: 100%;
    background-color: transparent;
`
const HeadContainer = styled.View`
	flex: 0.25;
    justify-content: flex-end;
    align-items: flex-start;
	width: 100%;
	padding-horizontal: 20px;
	padding-vertical: 20px;
    background-color: transparent;
`
const FormContainer = styled.View`
	flex: 0.75;
	width: 100%;
	justify-content: center;
	flex-direction: column;
	display: flex;
    background-color: transparent;
`
const ItemContainer = styled.View`
    margin: 10px 15px;
    align-items: center;
    background-color: transparent;
`
const IconContainerButton = styled.TouchableHighlight.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
    height: 80px;
    width: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
`
const RadioContainer = styled.View`
    flex: 0.9;
	flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
`
const ItemsContainer = styled.View`
	height: 50px;
	margin-bottom: 30px;
	background-color: transparent;
`
const ItemsList = styled.FlatList``
const CustomProductIconButton = styled.TouchableOpacity`
    height: 30px;
    min-width: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
	margin: 9px 11px;
	background-color: transparent;
`
const CustomProductIconContainer = styled.View`
    flex-direction: row;
    height: 30px;
    min-width: 120px;
    padding-horizontal: 15px; 
    justify-content: center;
    align-items: center;
	border-radius: 20px;
	border-width: 0px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const CustomProductImage = styled.Image`
    min-height: 29px;
    min-width: 32px;
    position: absolute;
    bottom: 3px;
    right: 100px;
`
const CustomProductContainer = styled.View`
	justify-content: center;
	align-items: center;
	border-radius: 40px;
`
const SummaryContainer = styled.View`
    min-height: 200px;
    min-width: ${width - 30}px;
    margin: 1px 10px;
    justify-content: center;
    align-items: stretch;
    border-radius: 5px;
    elevation: 4;
    shadow-offset: 0px 1px;
    shadow-radius: 5px;
    shadow-opacity: 0.15;
	shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	border-top-width: 0px;
	border-top-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const SummaryRow = styled.View`
    min-height: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-horizontal: 20px;
    margin-vertical: 1px;
    background-color: transparent;
`
const SummaryRowFlavor = styled.View`
    height: 25px;
    width: 25px;
    border-radius: 12.5px;
	border-width: 1.5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const SizePriceContainer = styled.View`
	justify-content: flex-end;
	min-height: 13px;
	min-width: 30px;
	padding-horizontal: 4px;
	margin-top: 3px;
	border-radius: 5px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.backgroundcolor};
`
	const PriceContainer = styled.View`
	justify-content: flex-end;
	position: absolute;
	min-height: 13px;
	min-width: 30px;
	top: 23px;
	left: 2px;
	padding-horizontal: 4px;
	border-radius: 8px;
	border-width: 0.75px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
	background-color: ${(props) => props.backgroundcolor};
`

const mapStateToProps = (state, props) => {
	const { data } = state.flavors

	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	addToCart: (paramItem) => {
		dispatch({
			type: ADD_TO_CART,
			payload: {
				paramItem,
			},
		})
	},

	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const CustomProductComponent = ({ addToCart, getDataRequest, data }) => {
    const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const route = useRoute()
    const { paramData } = route?.params;
	const [ radioItem, setradioItem ] = useState(true)
    const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	const [ rotate ] = useState(new Animated.Value(0))
	let delayValue = 1000
	const [ flavorsData, setflavorsData ] = useState() 
	const { 
		next,
		previous,
		total,
		custom_item_title,
		custom_item_text,
		ask_size,
		ask_first_option_title,
		ask_first_option_text,
		ask_an_option,
		ask_second_option_title,
		ask_second_option_text,
		ask_last_option_title,
		ask_last_option_text,
		options_chosen,
		size_text,
		purchase_summary,
		purchase_summary_text,
		add_to_cart
	} = useTranslation()
  
    useEffect(() => {
		let isUnMounted = false
		getDataRequest()
		setflavorsData(data)
		
		return () => {
			isUnMounted = true
		}
	}, [data])
	
    useEffect(() => {
		let isUnMounted = false
        Animated.spring(animatedValueTransform, {
			toValue: 1,
			tension: 5,
			useNativeDriver: true,
		}).start()

		Animated.timing(opacity, {
			toValue: 1,
			duration: 700,
			useNativeDriver: true,
		}).start()
		
		return () => {
			isUnMounted = true
		}
    }, [])

    useEffect(() => {
		let isUnMounted = false
		Animated.spring(rotate, {
			// toValue: -0.2,
			toValue: 0,
			tension: 5,
			useNativeDriver: true,
		}).start()
		
		return () => {
			isUnMounted = true
		}
    }, [])

	const _radioChange = async (item) => {
		await setradioItem(radioItem ? !radioItem : true)
		// await _setswitchItem(item)
		// toggleNotification(id)
	}

    const SwitchIconComponent = ({ size, itemfirstcolor, itemsecondcolor, itemlastcolor, firststrokeColor, secondstrokeColor, laststrokeColor }) => {
        switch (paramData.icon) {
            case 1:
                return (<CustomProductIcon1
                        size={size}
                        firstcolor={itemfirstcolor}
                        secondcolor={itemsecondcolor}
                        lastcolor={itemlastcolor}
						firststrokeColor={firststrokeColor}
						secondstrokeColor={secondstrokeColor}
						laststrokeColor={laststrokeColor}
                    />);
            case 2:
                return (<CustomProductIcon2
                        size={size}
                        firstcolor={itemfirstcolor}
                        secondcolor={itemsecondcolor}
						lastcolor={itemlastcolor}
						firststrokeColor={firststrokeColor}
						secondstrokeColor={secondstrokeColor}
						laststrokeColor={laststrokeColor}
                    />);
            case 3:
                return (<CustomProductIcon2
                        size={size}
                        firstcolor={itemfirstcolor}
                        secondcolor={itemsecondcolor}
						lastcolor={itemlastcolor}
						firststrokeColor={firststrokeColor}
						secondstrokeColor={secondstrokeColor}
						laststrokeColor={laststrokeColor}
                    />);
        
            default:
                return null;
        }
	}
	
	const _finishFunction = (values) => {
		navigation.goBack()
		addToCart({
			"_id": 230415,
			"rating": 5,
			"link": "",
			"icon": "",
			"price": 123,
			"discount": 60,
			"points": 33,
			"calories": 143,
			"weight": 143,
			"isFavorite": false,
			"active": true,
			"gluten": false,
			"images": [
				{"image": "https://i.pinimg.com/originals/cc/44/2c/cc442cec88ee51a34fe73dea4aaa78f0.png"},
				{"image": "https://partycity6.scene7.com/is/image/PartyCity/_pdp_sq_?$_1000x1000_$&$product=PartyCity/843432"}
			],
			"imageWebps": [
				{
					"imageWeb": "item1.webp"
				}
			],
			"en": {
				"name": "Ice-cream",
				"details": "Custom ice-cream prepared with our flavors and your imagination.",
				"status": "custom"
			},
			"es": {
				"name": "Helado",
				"details": "Custom ice-cream prepared with our flavors and your imagination.",
				"status": "personalizado"
			}
		})

		console.log('_finishFunction', 
			{
				itemsize: values?.itemsize,
				itemfirstcolor: values?.itemfirstcolor,
				itemsecondcolor: values?.itemsecondcolor,
				itemlastcolor: values?.itemlastcolor
			}
		)
	}

	const form = [
		{
			title: `${custom_item_title.charAt(0).toUpperCase() + custom_item_title.slice(1)} ${paramData.name}`,
			description: custom_item_text.charAt(0).toUpperCase() + custom_item_text.slice(1),
			items: [
				{
					placeholder: ask_size.charAt(0).toUpperCase() + ask_size.slice(1),
					name: 'itemsize',
					controller: {
						type: 'radioinput1',
                        values: paramData.variations
                    }
				}
			]
		},
		{
			title: ask_first_option_title.charAt(0).toUpperCase() + ask_first_option_title.slice(1),
			description: ask_first_option_text.charAt(0).toUpperCase() + ask_first_option_text.slice(1),
			items: [
				{
					placeholder: ask_an_option.charAt(0).toUpperCase() + ask_an_option.slice(1),
					name: 'itemfirstcolor',
					controller: {
						type: 'radioinput2',
                        values: flavorsData
                    }
				}
			]
		},
		{
			title: ask_second_option_title.charAt(0).toUpperCase() + ask_second_option_title.slice(1),
			description: ask_second_option_text.charAt(0).toUpperCase() + ask_second_option_text.slice(1),
			items: [
				{
					placeholder: ask_an_option.charAt(0).toUpperCase() + ask_an_option.slice(1),
					name: 'itemsecondcolor',
					controller: {
						type: 'radioinput2',
                        values: flavorsData
                    }
				}
			]
		},
		{
			title: ask_last_option_title.charAt(0).toUpperCase() + ask_last_option_title.slice(1),
			description: ask_last_option_text.charAt(0).toUpperCase() + ask_last_option_text.slice(1),
			items: [
				{
					placeholder: ask_an_option.charAt(0).toUpperCase() + ask_an_option.slice(1),
					name: 'itemlastcolor',
					controller: {
						type: 'radioinput2',
                        values: flavorsData
                    }
				}
			]
		},
		{
			title: purchase_summary.charAt(0).toUpperCase() + purchase_summary.slice(1),
			description: purchase_summary_text.charAt(0).toUpperCase() + purchase_summary_text.slice(1),
			items: [
				{
					placeholder: ask_an_option.charAt(0).toUpperCase() + ask_an_option.slice(1),
					name: 'summary',
					controller: {
						type: 'summary',
                        values: []
                    }
				}
			]
		}
	]

	return (
		<Root>
            <ETAMultiStep
				prevText={previous.charAt(0).toUpperCase() + previous.slice(1)}
				nextText={next.charAt(0).toUpperCase() + next.slice(1)}
				finishText={add_to_cart.charAt(0).toUpperCase() + add_to_cart.slice(1)}
				finishFunction={() => _finishFunction()}
				initialValues={{
					itemsize: '',
					itemfirstcolor: '',
					itemsecondcolor: '',
					itemlastcolor: '',
				}}
			>
			{
				form.map((element, index) => (
					<ETAMultiStep.Step 
						key={index}
					>
						{({ onChangeValue, values }) => (
							<StepContainer>
								<KeyboardAvoidingView 
									behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
									style={{flex: 1}}
								>
									<KeyboardMisser onPress={() => Keyboard.dismiss()}>
										<ContentContainer>
											<HeadContainer>
												<ETASimpleText
													size={24}
													weight={
														Platform.OS === 'ios'
														? '700'
														: 'bold'
													}
													color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
													align='left'
													style={{ marginTop: 10 }}>
													{element.title}
												</ETASimpleText>
												<ETASimpleText
													size={13}
													weight={
														Platform.OS === 'ios'
														? '400'
														: '500'
													}
													color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
													align='left'
													style={{ marginTop: 10 }}>
													{element.description}
												</ETASimpleText>
											</HeadContainer>

											<FormContainer>
												{
													element.items.map((subelement, i) => {
														switch (subelement.controller.type) {
															case 'textinput':
																return (
																	<ETATextInputOutline
																		key={i}
																		value={values?.[subelement.name]}
																		placeholder={subelement.placeholder}
																		placeholderTextColor={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
																		keyboardType={subelement.controller.keyboardtype}
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
																		maxLength={10}
																		multiline={false}
																		numberOfLines={1} // android
																		returnKeyLabel='next' // android
																		secureTextEntry={false} // password
																		spellCheck
																		textContentType='none'
																		returnKeyType='next'
																		textsize={14}
																		height={40}
																		width={270}
																		borderWidth={0.3}
																		onChangeText={text => onChangeValue(
																			[subelement.name], text
																		)}
																		// onBlur={handleBlur('cellphone')}
																		selectionColor={themeContext.PRIMARY_COLOR}
																	/>
																)
															case 'radioinput1':
																return (
																	<RadioContainer key={i}>
                                                                         <ETASimpleText
                                                                            size={18}
                                                                            weight={
                                                                                Platform.OS === 'ios'
                                                                                ? '700'
                                                                                : '600'
                                                                            }
                                                                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                                                            align='center'
                                                                            style={{
																				marginBottom: 20
																			}}
                                                                            >
                                                                           {ask_size.charAt(0).toUpperCase() + ask_size.slice(1)}
                                                                        </ETASimpleText>
                                                                        {
                                                                            subelement.controller.values.length !== 0
                                                                            ?	<ItemsList
                                                                                    contentContainerStyle={{
                                                                                        alignSelf: 'stretch',
                                                                                        alignItems: 'center',
                                                                                        backgroundColor: 'transparent'
                                                                                    }}
                                                                                    // horizontal
                                                                                    numColumns={3}
                                                                                    data={subelement.controller.values}
                                                                                    keyExtractor={(item) => item._id.toString()}
                                                                                    showsVerticalScrollIndicator={false}
                                                                                    showsHorizontalScrollIndicator={false}
                                                                                    // refreshing={refresher}
                                                                                    // onRefresh={() => _getData()}
                                                                                    // renderItem={({ip}) => {
                                                                                    renderItem={({item}) => {
                                                                                        delayValue += 700
                                                                                        const translateY = animatedValueTransform.interpolate(
                                                                                            {
                                                                                                inputRange: [0, 1],
                                                                                                outputRange: [delayValue, 1],
                                                                                                extrapolate: 'clamp',
                                                                                            },
                                                                                        )

                                                                                        return (
                                                                                            <Animated.View
                                                                                                style={{
                                                                                                    opacity,
                                                                                                    transform: [
                                                                                                        {
                                                                                                            translateY,
                                                                                                        },
                                                                                                    ],
                                                                                                }}>
                                                                                                <ItemContainer>
                                                                                                    <IconContainerButton 
                                                                                                        onPress={() => onChangeValue([subelement.name], item={ size: item?.itemsize, price: item?.price })}
																										style={{ borderWidth: 3,
																											borderColor: values?.itemsize.size === item?.itemsize ? '#F3F3F3' : '#F6F6F6',
																											backgroundColor: values?.itemsize.size === item?.itemsize ? '#ffff4a' : 'transparent',
																											bottom: values?.itemsize.size === item?.itemsize ? 4 : 0  }}
                                                                                                        >
                                                                                                        {SwitchIconComponent({size: item.size, itemfirstcolor: '#EE569E', itemsecondcolor: '#F181B2', itemlastcolor: '#F6B9D3', firststrokeColor: '#EE569E', secondstrokeColor: '#F181B2', laststrokeColor: '#F6B9D3' })}
                                                                                                    </IconContainerButton>
                                                                                                    <ETASimpleText
                                                                                                        size={14}
                                                                                                        weight={
                                                                                                            Platform.OS === 'ios'
                                                                                                            ? '400'
                                                                                                            : '300'
                                                                                                        }
                                                                                                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                                                                                        align='center'
                                                                                                        style={{ marginTop: 10 }}
                                                                                                        >
                                                                                                        {item.itemsize.charAt(0).toUpperCase() + item.itemsize.slice(1)}
                                                                                                    </ETASimpleText>
																									<SizePriceContainer
																										backgroundcolor={values?.itemsize.size === item?.itemsize ?  themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
																									>
																										<ETASimpleText
																											size={12}
																											weight={
																												Platform.OS === 'ios'
																												? '400'
																												: '300'
																											}
																											color={values?.itemsize.size === item?.itemsize ?  themeContext.PRIMARY_TEXT_BACKGROUND_COLOR : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																											align='center'
																											>
																											${currencySeparator(item.price.toFixed(2))}
																										</ETASimpleText>
																									</SizePriceContainer>
                                                                                                </ItemContainer>
                                                                                            </Animated.View>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            :	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
                                                                        }
																	</RadioContainer>
																)
															case 'radioinput2':

																return (
																	<RadioContainer key={i}>
																		<ItemsContainer>
																		{
                                                                            subelement.controller.values.length !== 0
                                                                            ?	<ItemsList
																					contentContainerStyle={{
																						alignSelf: 'flex-start',
																					}}
																					horizontal
																					// numColumns={data.length / 2}
                                                                                    data={subelement.controller.values}
																					keyExtractor={(item) => item._id.toString()}
																					showsVerticalScrollIndicator={false}
																					showsHorizontalScrollIndicator={false}
                                                                                    // refreshing={refresher}
                                                                                    // onRefresh={() => _getData()}
                                                                                    // renderItem={({ip}) => {
                                                                                    renderItem={({item}) => {
                                                                                        delayValue += 700
                                                                                        const translateY = animatedValueTransform.interpolate(
                                                                                            {
                                                                                                inputRange: [0, 1],
                                                                                                outputRange: [delayValue, 1],
                                                                                                extrapolate: 'clamp',
                                                                                            },
                                                                                        )

                                                                                        return (
                                                                                            <Animated.View
                                                                                                style={{
                                                                                                    opacity,
                                                                                                    transform: [
                                                                                                        {
                                                                                                            translateY,
                                                                                                        },
                                                                                                    ],
                                                                                                }}>
                                                                                                    <CustomProductIconButton 
                                                                                                        onPress={() => onChangeValue([subelement.name], item={ color: item.color, name: item.name, price: item?.price })}
                                                                                                        style={{  backgroundColor: item.color, bottom: values?.[subelement.name]?.color === item?.color ? 2 : 0 }}
																										// onPress={() => setitemfirstcolor(item)}
																									>
																										<CustomProductIconContainer
																											style={{ backgroundColor: item.color }}>
																											<CustomProductImage 
																												source={{ uri: item.imageitem }}/>
																											<ETASimpleText
																												size={14}
																												weight={
																													Platform.OS === 'ios'
																													? '400'
																													: '300'
																												}
																												color={item.colortext}
																												align='center'
																												>
																												{item.name}
																											</ETASimpleText>
																										</CustomProductIconContainer>
																										<PriceContainer
																											backgroundcolor={values?.[subelement.name]?.color === item?.color ?  themeContext.SECONDARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
																										>
																											<ETASimpleText
																												size={9}
																												weight={
																													Platform.OS === 'ios'
																													? '400'
																													: '200'
																												}
																												color={values?.[subelement.name]?.color === item?.color ?  themeContext.PRIMARY_TEXT_BACKGROUND_COLOR : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																												align='center'
																												>
																												${currencySeparator(item.price.toFixed(2))}
																											</ETASimpleText>
																										</PriceContainer>
                                                                                                    </CustomProductIconButton>
                                                                                            </Animated.View>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            :	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
                                                                        }
																		</ItemsContainer>
																		<>
																			<ProductComponent>
																				<Animated.View
																					style={{
																						transform: [
																							{
																								rotate,
																							},
																						],
																					}}>
																					{SwitchIconComponent({ 
																						size: 4, 
																						itemfirstcolor: values?.itemfirstcolor ? values?.itemfirstcolor.color : 'transparent', 
																						itemsecondcolor: values?.itemsecondcolor ? values?.itemsecondcolor.color : 'transparent', 
																						itemlastcolor: values?.itemlastcolor ? values?.itemlastcolor.color : 'transparent', 
																						firststrokeColor: values?.itemfirstcolor ? values?.itemfirstcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR, 
																						secondstrokeColor: values?.itemsecondcolor ? values?.itemsecondcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
																						laststrokeColor: values?.itemlastcolor ? values?.itemlastcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR })} 
																					{/* <CustomProductIcon2 
																						size={4}
																						firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
																						secondcolor={itemsecondcolor ? itemsecondcolor.color : 'transparent'}
																						lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
																						firststrokeColor={itemfirstcolor ? itemfirstcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																						secondstrokeColor={itemsecondcolor ? itemsecondcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																						laststrokeColor={itemlastcolor ? itemlastcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																					/> */}
																				</Animated.View>
																			</ProductComponent>
																		</>
																	</RadioContainer>
																)
															case 'summary': 
																return (
																	<SummaryContainer key={i}>
																		{
																			true
																			?   <>
																					<SummaryRow>
																						<ETASimpleText
																							size={14}
																							weight={
																								Platform.OS === 'ios'
																								? '700'
																								: 'bold'
																							}
																							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																							align='center'
																							>
																							{size_text.charAt(0).toUpperCase() + size_text.slice(1)} {' '}
																						</ETASimpleText>
																						<ETASimpleText
																							size={14}
																							weight={
																								Platform.OS === 'ios'
																								? '400'
																								: '300'
																							}
																							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																							align='center'
																							>
																							{values?.itemsize.size}
																						</ETASimpleText>
																					</SummaryRow>

																					<SummaryRow style={{ justifyContent: 'space-between' }}>
																						<ETASimpleText
																							size={14}
																							weight={
																								Platform.OS === 'ios'
																								? '700'
																								: 'bold'
																							}
																							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																							align='center'
																							>
																							{options_chosen.charAt(0).toUpperCase() + options_chosen.slice(1)} {' '}
																						</ETASimpleText>
																						<SummaryRowFlavor style={{ backgroundColor: values?.itemfirstcolor.color }}/>
																						<SummaryRowFlavor style={{ backgroundColor: values?.itemsecondcolor.color }}/>
																						<SummaryRowFlavor style={{ backgroundColor: values?.itemlastcolor.color }}/>
																					</SummaryRow>

																					<SummaryRow>
																						<ETASimpleText
																							size={14}
																							weight={
																								Platform.OS === 'ios'
																								? '700'
																								: 'bold'
																							}
																							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																							align='center'
																							>
																							{total.charAt(0).toUpperCase() + total.slice(1)} {' '}
																						</ETASimpleText>
																						<ETASimpleText
																							size={14}
																							weight={
																								Platform.OS === 'ios'
																								? '700'
																								: '600'
																							}
																							color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
																							align='center'
																							>
																							${currencySeparator((values?.itemsize.price + values?.itemfirstcolor.price + values?.itemsecondcolor.price + values?.itemlastcolor.price).toFixed(2))}
																						</ETASimpleText>
																					</SummaryRow>
																				</>
																			:   null
																		}
																		</SummaryContainer>
																)
															default:
																return;
														}
													})
												}
											</FormContainer>
										</ContentContainer>
									</KeyboardMisser>
								</KeyboardAvoidingView>
							</StepContainer>
						)}
					</ETAMultiStep.Step>
				))
			}
            </ETAMultiStep>
        </Root>
    )
}

const CustomProductComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(CustomProductComponent)

export default CustomProductComponentConnect
