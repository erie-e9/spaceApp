import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { ETACheckBox } from '@etaui'
import { connect } from 'react-redux'
import { TOGGLE_FILTER } from '@redux/menu/filters/actions'

const Root = styled.View`
	flex-direction: row;
	margin-bottom: 1px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const mapDispatchProps = (dispatch, props) => ({
	toggleFilter: ({ title, active }) => {
		dispatch({
			type: TOGGLE_FILTER,
			payload: {
				paramItem: { title, active }
			}
		})
	}
})

const FilterItemComponent = ({ title, active, toggleFilter }) => {
	const themeContext = useContext(ThemeContext)
	const [ switchItem, setswitchItem ] = useState(active)
	
	useEffect(() => {
		// console.log('FilterItemComponent item: ',{ title, active });
		setswitchItem(active)
	}, [active])

	const _switch = async () => {
		await setswitchItem(!switchItem)
		toggleFilter({ title, active: !switchItem })		
	}

	return (
        <Root>
            <ETACheckBox 
                title={title}
                checkedTitle={title}
                onChange={() => _switch(title)}
                onPressTitle={() => _switch({ active: !switchItem })}
                checked={active}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} 
            />
        </Root>
	)
}

const FilterItemComponentConnect = connect(
	null,
	mapDispatchProps,
)(FilterItemComponent)

export default React.memo(FilterItemComponentConnect)