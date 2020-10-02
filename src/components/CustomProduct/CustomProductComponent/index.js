import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Platform, KeyboardAvoidingView, Keyboard, Animated, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ETATextInputOutline, ETASimpleText, ETAErrorMessage, ETALoader, ETAMultiStep, ETARadio } from '@etaui'
import { currencySeparator } from '@functions'
import { CustomProductIcon1, CustomProductIcon2, FontAwesome } from '@icons'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/customproduct/flavors/actions'
import ProductComponent from './ProductComponent'

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
const GenreContainer = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: space-around;
	padding-horizontal: 10px;
	margin-top: 15px;
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
	margin: 4px 11px;
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
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: green;
`

const mapStateToProps = (state, props) => {
	const { data } = state.flavors

	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
		})
	},
})

const CustomProductComponent = ({ getDataRequest, data }) => {
    const themeContext = useContext(ThemeContext)
	const route = useRoute()
    const { paramData } = route?.params;
	const [ radioItem, setradioItem ] = useState(true)
    const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	const [ rotate ] = useState(new Animated.Value(0))
	let delayValue = 1000
  
    useEffect(() => {
		getDataRequest()
		// console.log('[CustomProductComponent] data: ', data);
	}, [data])
	
    useEffect(() => {
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
    }, [])

    useEffect(() => {
		Animated.spring(rotate, {
			// toValue: -0.2,
			toValue: 0,
			tension: 5,
			useNativeDriver: true,
		}).start()
    })

	const _radioChange = async (item) => {
		await setradioItem(radioItem ? !radioItem : true)
		// await _setswitchItem(item)
		// toogleNotification(id)
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

	const form = [
		{
			title: `Create your own ${paramData.name}`,
			description: `Here you can choose that flavors and colors you want to taste.`,
			items: [
				{
					placeholder: 'Choose a size',
					name: 'itemsize',
					controller: {
						type: 'radioinput1',
                        values: paramData.variations
                    }
				}
			]
		},
		{
			title: `Choose your first flavor`,
			description: `We have fruit, cream, milk and alcohol flavors.`,
			items: [
				{
					placeholder: 'Choose a flavor',
					name: 'itemfirstcolor',
					controller: {
						type: 'radioinput2',
                        values: data
                    }
				}
			]
		},
		{
			title: `Choose your second flavor`,
			description: `We have fruit, cream, milk and alcohol flavors.`,
			items: [
				{
					placeholder: 'Choose a flavor',
					name: 'itemsecondcolor',
					controller: {
						type: 'radioinput2',
                        values: data
                    }
				}
			]
		},
		{
			title: `Delicious!, choose your last flavor`,
			description: `We have fruit, cream, milk and alcohol flavors.`,
			items: [
				{
					placeholder: 'Choose a flavor',
					name: 'itemlastcolor',
					controller: {
						type: 'radioinput2',
                        values: data
                    }
				}
			]
		}
	]
	

	return (
		<Root>
            <ETAMultiStep
				prevText='Previous'
				nextText='Next'
				finishText='Add to cart'
				initialValues={{
					itemsize: '',
					itemfirstcolor: '',
					itemsecondcolor: '',
					itemlastcolor: '',
				}}
			>
             {
				 form.map((element, index) => (
					<ETAMultiStep.Step key={index}>
						{({ onChangeValue, values }) => (
							<StepContainer>
								<KeyboardAvoidingView 
										behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
										// contentContainerStyle=''
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
                                                                                : 'bold'
                                                                            }
                                                                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                                                            align='center'
                                                                            style={{
																				marginBottom: 20
																			}}
                                                                            >
                                                                            Choose a size
                                                                        </ETASimpleText>
                                                                        {
                                                                            subelement.controller.values.length !== 0
                                                                            ?	<ItemsList
                                                                                    contentContainerStyle={{
                                                                                        // height: 160,
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
                                                                                                        onPress={() => onChangeValue([subelement.name], item?.itemsize)}
                                                                                                        style={{ borderWidth: 3, borderColor: values?.itemsize === item?.itemsize ? '#ffff4a' : '#F6F6F6', backgroundColor: values?.itemsize === item?.itemsize ? '#ffff4a' : 'transparent' }}
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
                                                                                                    <ETASimpleText
                                                                                                        size={12}
                                                                                                        weight={
                                                                                                            Platform.OS === 'ios'
                                                                                                            ? '400'
                                                                                                            : '300'
                                                                                                        }
                                                                                                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                                                                                        align='center'
                                                                                                        >
                                                                                                        ${currencySeparator(item.price.toFixed(
                                                                                                            2,
                                                                                                        ))}
                                                                                                    </ETASimpleText>
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
                                                                                                <>
                                                                                                    <CustomProductIconButton 
                                                                                                        onPress={() => onChangeValue([subelement.name], item={ color: item.color, name: item.name })}
                                                                                                        style={{  backgroundColor: item.color }}
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
                                                                                                    </CustomProductIconButton>
                                                                                                </>
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
