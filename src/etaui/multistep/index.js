//  https://xlog.x-hub.io/advanced-react-patterns-compound-components-with-hooks/
import React, { useState, memo } from 'react'
import styled from 'styled-components/native'
import Step from './step'
import ETAStepperPoint from './points'

const Root = styled.View`
    flex: 1;
	width: 100%;
    background-color: transparent;
`

const ETAMultiStep = memo(({ children, initialValues, prevText, nextText, finishText, finishFunction, disabledNext }) => {
    const [ index, setindex ] = useState(0)
    const [ values, setvalues ] = useState(initialValues)
    const [ nextDisabled, setnextDisabled ] = useState(true)

    const _nextStep = () => {
        if (index !== children.length - 1) {
            setnextDisabled(true)
        //     // setindex(prevState => {
        //     //     return new Map(prevState).set(prevState.index + 1)
        //     //     // index: prevState.index + 1,
        //     // })
        //     setindex(prevState => {
        //         return {...prevState.index + 1}
        //     })

        setindex(index + 1)
        }
    }
  
    const _prevStep = () => {
        if (index !== 0) {
            // setindex(prevState => {
            //     return new Map(prevState).set(prevState.index - 1)
            //     // index: prevState.index - 1,
            // })
            setindex(index - 1)
        }
    }

    const _onChangeValue = (name, value) => {
        console.log('dadasd', {[name]: value})
        if (value !== '' || value !== null) {
            console.log('next activado');
            setnextDisabled(false)
        }

        setvalues(prevState => ({
            values: {
                ...prevState.values, 
                [name]: value 
            }
        }))
    }

    return (
        // <MultiStepContext.Provider value={{ index, setindex, itemslength }}>
            <Root>
                {
                    React.Children.map(children, (element, i) => {
                        if (i === index) {
                            return React.cloneElement(element, {
                                itemsLength: children.length,
                                currentIndex: index,
                                nextStep: _nextStep,
                                prevStep: _prevStep,
                                isLast: index === children.length - 1,
                                onChangeValue: _onChangeValue,
                                values: values.values,
                                prevText,
                                nextText,
                                finishText,
                                finishFunction,
                                nextDisabled,
                            })
                        }

                        return null;
                    })
                }
            </Root>
        // </MultiStepContext.Provider>
    );
})

const Points = (itemsLength) => {
    for (let index = 0; index < itemsLength; index++) {
        return (
            <ETAStepperPoint 
                onChange={() => console.log('ewe')} 
                activated={true} 
                size={10}  
                color='transparent' 
                direction='row' 
            />
        )
    }
}

ETAMultiStep.Step = Step

export default ETAMultiStep