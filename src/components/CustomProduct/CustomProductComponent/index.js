import React, {useState, useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Animated, Dimensions, ScrollView} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {ETASimpleText, ETAMultiStep, ETALoader} from '@etaui'
import { currencySeparator } from '@functions'
import { CustomProductIcon1 } from '@icons'
import {connect} from 'react-redux'
import {GET_DATA_REQUEST} from '@redux/customproduct/flavors/actions'
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
const ItemsList = styled.FlatList`
`
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
    height: 27px;
    min-width: 27px;
    position: absolute;
    bottom: 5px;
    right: 105px;
`
const ResumeContainer = styled.View`
    min-width: ${width - 100}px;
    min-height: 100px;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    padding-horizontal: 10px;
    border-radius: 5px;
    shadow-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
    shadow-offset: 1px 3px;
    shadow-radius: 5px;
    shadow-opacity: 0.15;
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ResumeRow = styled.View`
    flex-direction: row;
    margin-vertical: 5px;
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
    const [ itemsize, setitemsize ] = useState()
    const [ itemfirstcolor, setitemfirstcolor ] = useState()
    const [ itemmiddlecolor, setitemsecondcolor ] = useState()
    const [ itemlastcolor, setitemlastcolor ] = useState()
    const [ animatedValueTransform ] = useState(new Animated.Value(0))
	const [ opacity ] = useState(new Animated.Value(0))
	const [ rotate ] = useState(new Animated.Value(0))
	let delayValue = 1000
    
    useEffect(() => {
		getDataRequest()
		console.log('[CustomProductComponent] data: ', data);
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

    useEffect(() => {
        console.log('itemfirstcolor: ', itemfirstcolor);
    }, [itemfirstcolor])
    
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
                return (<CustomProductIcon1
                        size={size}
                        firstcolor='#EE569E'
                        middlecolor='#F181B2'
                        lastcolor='#000'
                        strokeColor={themeContext.GRAYFACEBOOK} 
                    />);
            case 3:
                return (<CustomProductIcon1
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

        console.log(vars)
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
                                    paramData.variations.length !== 0
                                    ?	<ItemsList
                                            contentContainerStyle={{
                                                height: 160,
                                                alignSelf: 'stretch',
                                                alignItems: 'center',
                                                backgroundColor: 'transparent'
                                            }}
                                            // horizontal
                                            numColumns={3}
                                            data={paramData.variations}
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
                                                            <IconContainerButton onPress={setitemsize(item.size)}>
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
                                        <CustomProductIcon1 
                                            size={4}
                                            firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
                                            middlecolor={itemmiddlecolor ? itemmiddlecolor.color : 'transparent'}
                                            lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
                                            strokeColor={themeContext.GRAYFACEBOOK} 
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
                                    <CustomProductIcon1 
                                        size={4}
                                        firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
                                        middlecolor={itemmiddlecolor ? itemmiddlecolor.color : 'transparent'}
                                        lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
                                        strokeColor={themeContext.GRAYFACEBOOK} 
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
                                    <CustomProductIcon1 
                                        size={4}
                                        firstcolor={itemfirstcolor ? itemfirstcolor.color : 'transparent'}
                                        middlecolor={itemmiddlecolor ? itemmiddlecolor.color : 'transparent'}
                                        lastcolor={itemlastcolor ? itemlastcolor.color : 'transparent'}
                                        strokeColor={themeContext.GRAYFACEBOOK} 
                                    />
                                </ProductComponent>
                            </CustomProductContainer>

                        </StepItemContainer>
                    </StepContainer>
                </ETAMultiStep.Step>

                <ETAMultiStep.Step>
                    <StepContainer>
                        <StepItemContainer>
                            <ETASimpleText
                                size={18}
                                weight={
                                    Platform.OS === 'ios'
                                    ? '700'
                                    : 'bold'
                                }
                                color={themeContext.SECONARY_TEXT_BACKGROUND_COLOR}
                                align='center'
                                style={{ marginBottom: 18 }}
                                >
                                Resume
                            </ETASimpleText>
                            
                            <ScrollView>
                                {
                                    itemlastcolor
                                    ?   <>
                                            <ResumeContainer>
                                                    <ResumeRow>
                                                        <ETASimpleText
                                                            size={14}
                                                            weight={
                                                                Platform.OS === 'ios'
                                                                ? '700'
                                                                : 'bold'
                                                            }
                                                            color={themeContext.SECONARY_TEXT_BACKGROUND_COLOR}
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
                                                            color={themeContext.SECONARY_TEXT_BACKGROUND_COLOR}
                                                            align='center'
                                                            >
                                                            {itemsize}
                                                        </ETASimpleText>
                                                    </ResumeRow>

                                                    <ResumeRow>
                                                        <ETASimpleText
                                                            size={14}
                                                            weight={
                                                                Platform.OS === 'ios'
                                                                ? '700'
                                                                : 'bold'
                                                            }
                                                            color={themeContext.SECONARY_TEXT_BACKGROUND_COLOR}
                                                            align='center'
                                                            >
                                                            Flavors chosen: {' '}
                                                        </ETASimpleText>
                                                        <ETASimpleText
                                                            size={14}
                                                            weight={
                                                                Platform.OS === 'ios'
                                                                ? '400'
                                                                : '300'
                                                            }
                                                            color={themeContext.SECONARY_TEXT_BACKGROUND_COLOR}
                                                            align='center'
                                                            >
                                                            {itemfirstcolor.name}, {itemmiddlecolor.name}, {itemlastcolor.name} 
                                                        </ETASimpleText>
                                                    </ResumeRow>
                                                </ResumeContainer>
                                        </>
                                    :   null
                                }
                            </ScrollView>

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
