import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Animated, Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ETASimpleText, ETAMultiStep, ETALoader } from '@etaui'
import { currencySeparator } from '@functions'
import { CustomProductIcon1, CustomProductIcon2, FontAwesome } from '@icons'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST } from '@redux/customproduct/flavors/actions'
import ProductComponent from './ProductComponent'
import { interpolate } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const Root = styled.View`
	flex: 1;
    background-color: transparent;
`
const StepContainer = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    margin-top: 40px;
    background-color: transparent;
`
const HeadContainer = styled.View`
    flex: 0.3;
    justify-content: center;
    align-items: center;
    padding-horizontal: 30px;
    background-color: transparent;
`
const ItemsContainer = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
`
const ItemsList = styled.FlatList``
const StepItemContainer = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
`
const ListContainer = styled.View`
    flex: 0.7;
    justify-content: center;
    padding-horizontal: 10px;
    background-color: transparent;
`
const ItemSecondStepsList = styled.FlatList`
    flex: 1;
    background-color: transparent;
`
const CustomProductContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`
const ItemContainer = styled.View`
    margin: 10px 15px;
    align-items: center;
    background-color: transparent;
`
const IconContainerButton = styled.TouchableOpacity`
    height: 80px;
    width: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
	background-color: #F6F6F6;
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
const CustomProductIconButton = styled.TouchableOpacity`
    height: 30px;
    min-width: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
	margin: 4px 11px;
	background-color: transparent;
`
const CustomProductImage = styled.Image`
    min-height: 29px;
    min-width: 32px;
    position: absolute;
    bottom: 3px;
    right: 100px;
`
const SumamryView = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
`
const SumamryContainer = styled.View`
    min-height: 100px;
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
const SumamryRow = styled.View`
    min-height: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-horizontal: 20px;
    margin-vertical: 1px;
    background-color: transparent;
`
const SumamryRowFlavor = styled.View`
    height: 25px;
    width: 25px;
    border-radius: 12.5px;
	border-width: 1.5px;
	border-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const ButtonAddToCartContainer = styled.View`
	height: 50px;
	width: 100%;
	align-items: center;
	margin-vertical: 8px;
	background-color: transparent;
`
const AddCart = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
    height: 40px;
    width: 250px;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: ${Platform.OS === 'ios' ?  10 : 0}px;
    z-index: 1000;
	background-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
`
const AddCartPlus = styled.View`
	height: 20px;
	width: 12px;
	justify-content: center;
	align-items: center;
	background-color: transparent;
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
    const [ items, setitems ] = useState([])
    const [ itemsize, setitemsize ] = useState()
    const [ itemfirstcolor, setitemfirstcolor ] = useState()
    const [ itemmiddlecolor, setitemsecondcolor ] = useState()
    const [ itemlastcolor, setitemlastcolor ] = useState()
    const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	const [ rotate ] = useState(new Animated.Value(0))
	let delayValue = 1000
    
    useEffect(() => {
        let isUnMounted = false
        getDataRequest()
        
		return () => {
			isUnMounted = true
		}
    }, [data])
    
    useEffect(() => {
        let isUnMounted = false
        setitems(paramData.variations)
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
    
    // const rotate = interpolate(rotate,{
    //     inputRange: [0, 2],
    //     outputRange: [3, 2],
    //     extrapolate: 'clamp',
    // });
    
    const SwitchIconComponent = ({ size }) => {
        switch (paramData.icon) {
            case 1:
                return (<CustomProductIcon1
                        size={size}
                        firstcolor='#EE569E'
                        middlecolor='#F181B2'
                        lastcolor='#F6B9D3'
                        strokeColor={themeContext.GRAYFACEBOOK} 
                    />);
            case 2:
                return (<CustomProductIcon2
                        size={size}
                        firstcolor='#EE569E'
                        middlecolor='#F181B2'
                        lastcolor='#F6B9D3'
                        strokeColor={themeContext.GRAYFACEBOOK} 
                    />);
            case 3:
                return (<CustomProductIcon2
                        size={size}
                        firstcolor='#EE569E'
                        middlecolor='#F181B2'
                        lastcolor='#fff'
                        strokeColor={themeContext.GRAYFACEBOOK} 
                    />);
        
            default:
                return null;
        }
    }

    const _submitCustomProduct = () => {
        const vars = {
            itemsize,
            itemfirstcolor,
            itemmiddlecolor,
            itemlastcolor
        }

    }

    return (
        <Root>
            <HeadContainer>
                <ETASimpleText
                    size={20}
                    weight={
                        Platform.OS === 'ios'
                        ? '700'
                        : 'bold'
                    }
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'
                    style={{ marginTop: 10 }}>
                    Create your own style
                </ETASimpleText>
                <ETASimpleText
                    size={14}
                    weight={
                        Platform.OS === 'ios'
                        ? '400'
                        : '500'
                    }
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align='center'
                    style={{ marginTop: 10 }}>
                    Here you can choose flavors and colors for your {paramData.name}
                </ETASimpleText>
            </HeadContainer>

            <ETAMultiStep>
                <ETAMultiStep.Step>
                    <StepContainer>
                        <StepItemContainer>
                            <ETASimpleText
                                size={16}
                                weight={
                                    Platform.OS === 'ios'
                                    ? '700'
                                    : 'bold'
                                }
                                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                align='center'
                                style={{ marginBottom: 20 }}
                                >
                                Choose a size
                            </ETASimpleText>
                            <ItemsContainer>
                                {
                                    items.length !== 0
                                    ?	<ItemsList
                                            contentContainerStyle={{
                                                // height: 160,
                                                alignSelf: 'stretch',
                                                alignItems: 'center',
                                                backgroundColor: 'transparent'
                                            }}
                                            // horizontal
                                            numColumns={3}
                                            data={items}
                                            keyExtractor={(item) => item._id.toString()}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            // refreshing={refresher}
                                            // onRefresh={() => _getData()}
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
                                                        <ItemContainer key={item._id}>
                                                            <IconContainerButton onPress={() => setitemsize(item.itemsize)}>
                                                                {SwitchIconComponent({size: item.size})}
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
                                                                {item.itemsize}
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
                                                )}
                                            }
                                        />
                                    :	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
                                }
                            </ItemsContainer>
                        </StepItemContainer>
                    </StepContainer>
                    
                </ETAMultiStep.Step>
                
                <ETAMultiStep.Step>
                    <StepContainer>
                        <StepItemContainer>
                            <ListContainer>
                                {
                                    data
                                    ?   <ItemSecondStepsList 
                                            contentContainerStyle={{
                                                alignSelf: 'center',
                                            }}
                                            horizontal
                                            // numColumns={data.length / 2}
                                            data={data}
                                            keyExtractor={(item) => item._id.toString()}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            // refreshing={refresher}
                                            // onRefresh={() => _getData()}
                                            renderItem={({item}) => (
                                                <CustomProductIconButton
                                                    onPress={() => setitemfirstcolor(item)}>
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
                                            )}
                                        />
                                    :	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
                                }
                            </ListContainer>
                            
                            <CustomProductContainer>
                                <ProductComponent stepTtitle='Choose your first flavor'>
                                    <Animated.View
                                        style={{
                                            transform: [
                                                {
                                                    rotate,
                                                },
                                            ],
                                        }}>
                                        <CustomProductIcon2 
                                            size={4}
                                            firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
                                            middlecolor={itemmiddlecolor ? itemmiddlecolor.color : 'transparent'}
                                            lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
                                            firststrokeColor={itemfirstcolor ? itemfirstcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                            middlestrokeColor={itemmiddlecolor ? itemmiddlecolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                            laststrokeColor={itemlastcolor ? itemlastcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                        />
                                    </Animated.View>
                                </ProductComponent>
                            </CustomProductContainer>
                        </StepItemContainer>
                    </StepContainer>
                </ETAMultiStep.Step>
                
                <ETAMultiStep.Step>
                    <StepContainer>
                        <StepItemContainer>
                            <ListContainer>
                                {
                                    data
                                    ?   <ItemSecondStepsList 
                                            contentContainerStyle={{
                                                alignSelf: 'center',
                                            }}
                                            horizontal
                                            data={data}
                                            keyExtractor={(item) => item._id.toString()}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            // refreshing={refresher}
                                            // onRefresh={() => _getData()}
                                            renderItem={({item}) => (
                                                <CustomProductIconButton
                                                    onPress={() => setitemsecondcolor(item)}>
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
                                            )}
                                        />
                                    :	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
                                }
                            </ListContainer>

                            <CustomProductContainer>
                                <ProductComponent stepTtitle='Choose your second flavor'>
                                    <CustomProductIcon2 
                                        size={4}
                                        firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
                                        middlecolor={itemmiddlecolor ? itemmiddlecolor.color : 'transparent'}
                                        lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
                                        firststrokeColor={itemfirstcolor ? itemfirstcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                        middlestrokeColor={itemmiddlecolor ? itemmiddlecolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                        laststrokeColor={itemlastcolor ? itemlastcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    />
                                </ProductComponent>
                            </CustomProductContainer>
                        </StepItemContainer>
                    </StepContainer>
                </ETAMultiStep.Step>

                <ETAMultiStep.Step>
                    <StepContainer>
                        <StepItemContainer>
                            <ListContainer>
                                {
                                    data
                                    ?   <ItemSecondStepsList 
                                            contentContainerStyle={{
                                                alignSelf: 'center',
                                            }}
                                            horizontal
                                            data={data}
                                            keyExtractor={(item) => item._id.toString()}
                                            showsVerticalScrollIndicator={false}
                                            showsHorizontalScrollIndicator={false}
                                            // refreshing={refresher}
                                            // onRefresh={() => _getData()}
                                            renderItem={({item}) => (
                                                <CustomProductIconButton
                                                    onPress={() => setitemlastcolor(item)}>
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
                                            )}
                                        />
                                    :	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
                                }
                            </ListContainer>

                            <CustomProductContainer>
                                <ProductComponent stepTtitle='Choose your last flavor'>
                                    <CustomProductIcon2 
                                        size={4}
                                        firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
                                        middlecolor={itemmiddlecolor ? itemmiddlecolor.color : 'transparent'}
                                        lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
                                        firststrokeColor={itemfirstcolor ? itemfirstcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                        middlestrokeColor={itemmiddlecolor ? itemmiddlecolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                        laststrokeColor={itemlastcolor ? itemlastcolor.color : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    />
                                </ProductComponent>
                            </CustomProductContainer>

                        </StepItemContainer>
                    </StepContainer>
                </ETAMultiStep.Step>

                <ETAMultiStep.Step>
                    <StepContainer>
                        <StepItemContainer>
                            <SumamryView>
                                <ETASimpleText
                                    size={18}
                                    weight={
                                        Platform.OS === 'ios'
                                        ? '700'
                                        : 'bold'
                                    }
                                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                                    align='center'
                                    style={{ marginBottom: 18 }}
                                    >
                                    Purchase summary
                                </ETASimpleText>
                                <SumamryContainer>
                                {
                                    itemlastcolor
                                    ?   <>
                                            <SumamryRow>
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
                                                    Size: {' '}
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
                                                    {itemsize}
                                                </ETASimpleText>
                                            </SumamryRow>

                                            <SumamryRow style={{ justifyContent: 'space-between' }}>
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
                                                    Flavors chosen: {' '}
                                                </ETASimpleText>
                                                <SumamryRowFlavor style={{ backgroundColor: itemfirstcolor.color }}/>
                                                <SumamryRowFlavor style={{ backgroundColor: itemmiddlecolor.color }}/>
                                                <SumamryRowFlavor style={{ backgroundColor: itemlastcolor.color }}/>
                                            </SumamryRow>
                                        </>
                                    :   null
                                }
                                </SumamryContainer>
                                <ButtonAddToCartContainer>
                                    <AddCart
                                        onPress={() => console.log('Add to cart')}>
                                        <AddCartPlus>
                                            <ETASimpleText
                                                size={16}
                                                weight={
                                                    Platform.OS ===
                                                    'ios'
                                                        ? '600'
                                                        : '300'
                                                }
                                                color='white'
                                                align='center'>
                                                +
                                            </ETASimpleText>
                                        </AddCartPlus>
                                        <FontAwesome
                                            name='shopping-cart'
                                            size={16}
                                            color='white'
                                            style={{
                                                alignSelf: 'center',
                                            }}
                                        />
                                    </AddCart>
                                </ButtonAddToCartContainer>
                            </SumamryView>
                        </StepItemContainer>
                    </StepContainer>
                </ETAMultiStep.Step>


            </ETAMultiStep>
        </Root>
    )
}

const CustomProductComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(CustomProductComponent)

export default React.memo(CustomProductComponentConnect)
// export default CustomProductComponent
