//  https://xlog.x-hub.io/advanced-react-patterns-compound-components-with-hooks/
import React, { useContext, memo } from 'react'
import styled, { ThemeContext} from 'styled-components/native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
    flex: 1;
    background-color: transparent;
`
const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;    
`
const ButtonContainer = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
`
const ActionButton = styled.TouchableOpacity.attrs({
    underlayColor: 'transparent',
    hitSlop: {top: 25, bottom: 25, right: 25, left: 25}
})`
    min-height: 40px;
    min-width: 100%;
    padding: 10px;
`
const PointsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`

// const MultiStepContext = React.createContext()

// const useStepContext = () => {
// const context = useContext(MultiStepContext)

// if (!context) {
//     throw new Error('MultiStepContext used outside ETAMultiStep Compound Components')
// }

//     return context
// }

const Step = memo((props) => {
    // const { index, setindex } = useStepContext()
    const themeContext = useContext(ThemeContext)
    console.log('ETAMultiStep values: ', props.values)

    return (
        <Root>
            {props.children({
                onChangeValue: props.onChangeValue,
                values: props.values
            })}
            
            <PointsContainer>
                {/* {
                    Points(props.itemsLength)
                } */}
            </PointsContainer>
            <ButtonsContainer>                    
                <ButtonContainer>
                    <ActionButton
                        onPress={props.prevStep}
                        disabled={props.currentIndex === 0}
                        style={{ backgroundColor: props.currentIndex === 0 ? 'transparent' : '#333333' }}>
                        <ETASimpleText
                            size={14}
                            weight={
                                Platform.OS === 'ios'
                                    ? '400'
                                    : '300'
                            }
                            color={props.currentIndex === 0 ? '#444' : 'white'}
                            align='center'>
                            {props.prevText ? props.prevText : 'Previous'}
                        </ETASimpleText>
                    </ActionButton>
                </ButtonContainer>
                
                <ButtonContainer>
                    {
                        props.isLast
                        ?   <ActionButton
                                onPress={props.nextStep}
                                // disabled={props.isLast}
                                style={{ backgroundColor: themeContext.PRIMARY_COLOR }}>
                                <ETASimpleText
                                    size={14}
                                    weight={
                                        Platform.OS === 'ios'
                                            ? '400'
                                            : '300'
                                    }
                                    color={props.isLast ? '#FFF' : 'white'}
                                    align='center'>
                                    {props.finishText ? props.finishText : 'Finish'}
                                </ETASimpleText>
                            </ActionButton>
                        :   <ActionButton
                                onPress={props.nextStep}
                                disabled={props.isLast}
                                style={{ backgroundColor: props.isLast ? 'transparent' : '#333333' }}>
                                <ETASimpleText
                                    size={14}
                                    weight={
                                        Platform.OS === 'ios'
                                            ? '400'
                                            : '300'
                                    }
                                    color={props.isLast ? '#444' : 'white'}
                                    align='center'>
                                    {props.nextText ? props.nextText : 'Next'}
                                </ETASimpleText>
                            </ActionButton>
                    }
                </ButtonContainer>
            </ButtonsContainer>
        </Root>
    )
})

export default Step