import React, { PureComponent } from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {ETASimpleText} from '@etaui'

const Root = styled.View`
	flex: 1;
`
const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: center;
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
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
    min-height: 20px;
    min-width: 100%;
    padding: 10px;
`

class Step extends PureComponent {
    render() {
        return (
            <Root>
                {this.props.children}
                <ButtonsContainer>                    
                    <ButtonContainer>
                        <ActionButton
                            onPress={this.props.prevStep}
                            disabled={this.props.currentIndex === 0}
                            style={{ backgroundColor: this.props.currentIndex === 0 ? 'transparent' : '#333333' }}>
                            <ETASimpleText
                                size={14}
                                weight={
                                    Platform.OS === 'ios'
                                        ? '400'
                                        : '300'
                                }
                                color={this.props.currentIndex === 0 ? '#444' : 'white'}
                                align='center'>
                                Previous
                            </ETASimpleText>
                        </ActionButton>
                    </ButtonContainer>
                    
                    <ButtonContainer>
                        <ActionButton
                            onPress={this.props.nextStep}
                            disabled={this.props.isLast}
                            style={{ backgroundColor: this.props.isLast ? 'transparent' : '#333333' }}>
                            <ETASimpleText
                                size={14}
                                weight={
                                    Platform.OS === 'ios'
                                        ? '400'
                                        : '300'
                                }
                                color={this.props.isLast ? '#444' : 'white'}
                                align='center'>
                                Next
                            </ETASimpleText>
                        </ActionButton>
                    </ButtonContainer>
                </ButtonsContainer>
            </Root>
        )
    }
}

class ETAMultiStep extends PureComponent {
    static Step = (props) => <Step {...props} />

    state = {
        index: 0
    }

    _nextStep = () => {
        if (this.state.index !== this.props.children.length - 1) {
          this.setState(prevState => ({
            index: prevState.index + 1,
          }));
        }
    };

    _prevStep = () => {
        if (this.state.index !== 0) {
          this.setState(prevState => ({
            index: prevState.index - 1,
          }));
        }
    };

    render() {
        return (
            <Root>
                {
                    React.Children.map(this.props.children, (element, index) => {
                        if (index === this.state.index) {
                            return React.cloneElement(element, {
                                itemsLength: this.props.children.length,
                                currentIndex: this.state.index,
                                nextStep: this._nextStep,
                                prevStep: this._prevStep,
                                isLast: this.state.index === this.props.children.length - 1,
                            })
                        }

                        return null;
                    })
                }
            </Root>
        )
    }
}

export default ETAMultiStep