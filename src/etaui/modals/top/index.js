import React, { memo, useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, useColorScheme } from 'react-native'
import { Ionicons } from '@icons'
import Modal from 'react-native-modal'
import { ETASimpleText } from '@etaui'

const { height, width } = Dimensions.get('window')

const Root = styled.TouchableWithoutFeedback`
    height: 10px;
    background-color: transparent;
`
const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
`
const CardContainer = styled.View`
    min-height: 60px;
    width: ${width}px;
    top: 0px;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 15px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Header = styled.View`
    min-height: 40px;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 5px 0px;
    background-color: transparent
`
const NameContainer = styled.View`
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
    min-height: 60px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent
`

const ETAFancyModal = memo(({ children, onSwipeComplete, isVisible, title, closeModal }) => {
    const themeContext = useContext(ThemeContext)
    const colorSchema = useColorScheme()

    return (
        <>
            <Modal
                testID={'modal'}
                isVisible={isVisible ? isVisible : false}
                onSwipeComplete={onSwipeComplete}
                swipeDirection='up'
                backdropColor={colorSchema === 'dark' ? 'rgba(0, 0, 0, 0.55)' : 'rgba(0, 0, 0, 0.3)'}
                backdropOpacity={0.7}
                animationIn='slideInDown'
                animationOut='slideOutUp'
                animationInTiming={400}
                animationOutTiming={500}
                onBackButtonPress={() => closeModal()}
                onBackdropPress={() => closeModal()}
                // backdropTransitionInTiming={600}
                // backdropTransitionOutTiming={600}
                style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    margin: 0,
                }}
                >
                <Container onPress={() => closeModal()}>
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
                                onPress={() => closeModal()}
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
        </>
    )
})

export default ETAFancyModal