import React, { memo, useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, View, useColorScheme } from 'react-native'
import { Ionicons } from '@icons'
import Modal from 'react-native-modal'
import { ETASimpleText } from '@etaui'

const { height, width } = Dimensions.get('window')

const Container = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`
const CardContainer = styled.View`
    min-height: 200px;
    width: ${width - 20}px;
    padding: 16px 22px;
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
    flex: 0.3;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
`

const ETABottomModal = memo(({ children, onTouchOutSide, onSwipeComplete, isVisible, title, headerRight, closeModal }) => {
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
            swipeDirection='down'
            backdropColor={colorSchema === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.3)'}
            backdropOpacity={0.7}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={200}
            animationOutTiming={200}
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
                    <DragView />
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

export default ETABottomModal
