import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETARadio } from '@etaui'
import { MXIcon, USIcon, FRIcon } from '@icons'
import { connect } from 'react-redux'
import { TOGGLE_LANGUAGE } from '@redux/settings/appsettings/languages/actions'

const Card = styled.View`
    min-height: 20px;
	flex-direction: row;
	align-items: center;
    justify-content: center;
	margin-bottom: 2px;
    min-width: 100%;
	background-color: transparent;
`
const ItemContainer = styled.View`
    flex: 1;
    min-height: 10px;
	align-items: center;
    justify-content: center;
    min-width: 100px;
    margin-vertical: 3px;
    background-color: transparent;
`
const FlagContainer = styled.View`
    flex: 0.75;
    min-height: 10px;
	align-items: flex-start;
    justify-content: space-around;
    min-width: 12px;
    margin-vertical: 3px;
    background-color: transparent;
`

const mapStateToProps = (state, props) => {
	// const { languageToggle } = state.languages
	// return { languageToggle }
}

const mapDispatchProps = (dispatch, props) => ({	
    toggleLanguage: ({ selectedLanguage }) => {
        console.log('[selectedLanguage]', selectedLanguage);
        dispatch({
            type: TOGGLE_LANGUAGE,
			payload: {
				paramItem: { selectedLanguage }
			}
		
        })
    },
})

const Item = memo(({ language, isdefault, value, toggleLanguage }) => {
    const themeContext = useContext(ThemeContext)
	const [ selected, setselected ] = useState(isdefault)
    
    const _selectLanguage = async (item) => {
		await setselected(!selected)
		// await _setswitchItem(item))
        // console.log('[_selectLanguage] itemm', item);
        toggleLanguage({ selectedLanguage: item.value })
	}
	
    const dynamicFlag = (languageValue) => {
        switch (languageValue) {
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
        <Card>
            <ItemContainer>
                <ETARadio 
                    text={language}
                    sizeText={14}
                    colorText={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    onChange={() => _selectLanguage({ value, active: !selected })}
                    activated={selected}
                    sizeRadio={15}
                    colorRadio={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                />
            </ItemContainer>
            <FlagContainer>
                {dynamicFlag(value)}
            </FlagContainer>
        </Card>
    )
}) 

const ItemConnect = connect(
	null,
	mapDispatchProps,
)(Item)

export default React.memo(ItemConnect)