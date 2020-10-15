import React, { memo, useState, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { Dimensions, View } from 'react-native'
import { Ionicons } from '@icons'
import Modal from 'react-native-modal'
import { ETASimpleText } from '@etaui'

const { height, width } = Dimensions.get('window')

const ChildrenContainer = styled.View`
    min-height: 200px;
    width: ${width - 20}px;
    padding: 22px;
    justify-content: flex-start;
    align-items: flex-start;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-color: rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const Header = styled.View`
    flex: 0.3;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: transparent
`
const HeaderRight = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
	height: 25px;
	width: 25px;
	z-index: 100;
	justify-content: center;
	align-items: center;
    margin-right: 15px;
	border-radius: 15px;
	border-width: 0.5px;
	border-color: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const ETABottomModal = memo(({ children, onTouchOutSide, onSwipeComplete, isVisible, title }) => {
    const themeContext = useContext(ThemeContext)
    console.log('ETABottomModal title: ', title);
    const [ show, setshow ] = useState(false)

    const _show = () => {
        setshow(true)
    }

    const _close = () => {
        setshow(!true)
    }

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
            // animationInTiming={300}
            swipeDirection='down'
            backdropColor='rgba(0, 0, 0, 0.25)'
            backdropOpacity={0.7}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                margin: 0,
            }}>
            {
                renderOutsideTouchable()
            }
            <ChildrenContainer>
            <Header>
                <ETASimpleText
                    size={16}
                    weight={
                        Platform.OS ===
                        'ios'
                            ? '400'
                            : 'bold'
                    }
                    color={
                        themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
                    }
                    align='left'>
                    {title}
                </ETASimpleText>
                <HeaderRight
                    // onPress={() => navigation.goBack()}
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
                {children}
            </ChildrenContainer>
        </Modal>
    )
})

export default ETABottomModal
