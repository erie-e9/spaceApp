import React, { useState, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETARadio } from '@etaui'

const ItemContainer = styled.View`
    min-height: 10px;
    flex-direction: row;
    min-width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 1px 15px;
    margin-vertical: 4px;
    background-color: transparent;
`
const Item = memo(({ title, isdefault }) => {
    const themeContext = useContext(ThemeContext)
	const [ selected, setselected ] = useState(isdefault)
    
    const _selectCurrency = async (item) => {
		await setselected(!selected)
		// await _setswitchItem(item))
		console.log('[_selectCurrency] itemm', item);
	}
	
    const dynamicFlag = (language) => {
        switch (language) {
            case 'es':
                return <MXIcon />
            case 'en':
                return <USIcon />
            case 'fr':
                return <FRIcon />
        
            default:
                return <MXIcon />
        }
    }
    
    return (
        <ItemContainer>
            <ETARadio 
                text={title}
                sizeText={14}
                colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                onChange={() => _selectCurrency({ title, active: !selected })}
                activated={selected}
                sizeRadio={15}
                colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
            />
        {/* {dynamicFlag(title)} */}
    </ItemContainer>
    )
}) 

export default Item