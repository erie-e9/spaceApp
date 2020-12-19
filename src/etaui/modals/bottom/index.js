import React, { memo, useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, View, useColorScheme, ScrollView } from 'react-native'
import { Ionicons } from '@icons'
import Modal from 'react-native-modal'
import { ETASimpleText } from '@etaui'

const { height, width } = Dimensions.get('window')

const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    background-color: transparent;
`
const CardContainer = styled.View`
    min-height: 10px;
    width: ${width - 30}px;
    padding: 30px 25px 15px 25px;
    justify-content: flex-start;
    align-items: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const DragView = styled.View`
    height: 7px;
    width: 45px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.GRAYFACEBOOK};
`
const Header = styled.View`
    min-height: 20px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px 10px 0px;
    background-color: transparent
`
const NameContainer = styled.View`
	flex: 1;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
	background-color: transparent;
`
const HeaderRight = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 5, bottom: 5, right: 5, left: 5}
})`
	height: 22px;
	width: 22px;
	z-index: 100;
	justify-content: center;
	align-items: center;
    margin-right: 7px;
	border-radius: 15px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const ChildrenContainer = styled.View`
    min-height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const ETABottomModal = memo(({ children, onTouchOutSide, onSwipeComplete, isVisible, title, headerRight, closeModal }) => {
    const themeContext = useContext(ThemeContext)
    const colorSchema = useColorScheme()
    const [ scrollOffset, setscrollOffset ] = useState(null)
    let scrollViewRef = React.createRef();

    const renderOutsideTouchable = () => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouchOutSide) return view
        
        return (
            <TouchableWithoutFeedback onPress={onTouchOutSide} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    const handleOnScroll = event => {
        setscrollOffset(event.nativeEvent.contentOffset.y)
    };
    
    const handleScrollTo = p => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo(p);
        }
    };

    return (
        <Modal
            testID={'modal'}
            isVisible={isVisible}
            onSwipeComplete={onSwipeComplete}
            // swipeDirection='down'
            backdropColor={colorSchema === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.3)'}
            backdropOpacity={0.7}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            animationInTiming={400}
            animationOutTiming={650}
            scrollTo={handleScrollTo}
            scrollOffset={scrollOffset}
            scrollOffsetMax={400 - 300}
            // backdropTransitionInTiming={600}
            // backdropTransitionOutTiming={600}
            style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: 0,
            }}>
            {
                renderOutsideTouchable()
            }
            <Container>
                <CardContainer>
                    {/* <DragView /> */}
                        <Header>
                            <NameContainer>
                                <ETASimpleText
                                    size={16}
                                    weight={
                                        Platform.OS ===
                                        'ios'
                                            ? '400'
                                            : '400'
                                    }
                                    color={
                                        themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                                    }
                                    align='left'>
                                    {title}
                                </ETASimpleText>
                            </NameContainer>
                            <HeaderRight
                                onPress={closeModal}
                            >
                                <Ionicons
                                    name='md-close'
                                    size={18}
                                    color={
                                        themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                                    }
                                />
                            </HeaderRight>
                        </Header>
                        {/* <ScrollView
                            ref={scrollViewRef}
                            onScroll={handleOnScroll}
                            scrollEventThrottle={16}
                            style={{ maxHeight: 250, width: '100%' }}> */}
                            <ChildrenContainer>
                                {children}
                            </ChildrenContainer>
                        {/* </ScrollView> */}
                </CardContainer>
            </Container>
        </Modal>
    )
})

export default ETABottomModal
