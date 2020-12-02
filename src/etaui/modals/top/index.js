import React, { memo, useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, useColorScheme } from 'react-native'
import { Ionicons } from '@icons'
import Modal from 'react-native-modal'
import { ETASimpleText } from '@etaui'

const { height, width } = Dimensions.get('window')

const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
`
const CardContainer = styled.View`
    min-height: 60px;
    width: ${width}px;
    justify-content: flex-start;
    align-items: center;
    padding: 15px 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Header = styled.View`
    min-height: 60px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 5px 0px;
    background-color: transparent
`
const NameContainer = styled.View`
	flex: 0.9;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding-horizontal: 2px;
	background-color: transparent;
`
const HeaderRight = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	height: 25px;
	width: 25px;
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
    min-height: 60px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent
`

const ETAFancyModal = memo(({ children, onTouchOutSide, onSwipeComplete, isVisible, title, closeModal }) => {
    const themeContext = useContext(ThemeContext)
    const colorSchema = useColorScheme()

    const renderOutsideTouchable = () => {
        const view = <View style={{ flex: 1, width: '100%' }} />
        if (!onTouchOutSide) return view
        
        return (
            <TouchableWithoutFeedback onPress={onTouchOutSide} style={{ flex: 1, width: '100%' }}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    return (
        <Modal
            testID={'modal'}
            isVisible={isVisible}
            onSwipeComplete={onSwipeComplete}
            swipeDirection='up'
            backdropColor={colorSchema === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.3)'}
            backdropOpacity={0.7}
            animationIn='slideInDown'
            animationOut='slideOutUp'
            animationInTiming={400}
            animationOutTiming={650}
            // backdropTransitionInTiming={600}
            // backdropTransitionOutTiming={600}
            style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: 0,
            }}>
            <Container>
                <CardContainer>
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
                    <ChildrenContainer>
                        {children}
                    </ChildrenContainer>
                </CardContainer>
            </Container>
        </Modal>
    )
})

export default ETAFancyModal