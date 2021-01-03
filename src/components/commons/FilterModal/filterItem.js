import React, { useState, useEffect, useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { ETACheckBox } from '@etaui'
import { connect } from 'react-redux'
import { TOGGLE_FILTER, TOGGLE_DISCOUNT } from '@redux/menu/filters/actions'
import { truncateString } from '@functions'

const Root = styled.View`
	flex-direction: row;
	margin-bottom: 0px;
	min-width: 135px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`

const mapStateToProps = (state, props) => {
	const { discountToggle } = state.filters
	return { discountToggle }
}

const mapDispatchProps = (dispatch, props) => ({
	toggleFilter: ({ title, active }) => {
		dispatch({
			type: TOGGLE_FILTER,
			payload: {
				paramItem: { title, active }
			}
		})
	},
	
    toggleDiscounts: ({ discountToggle }) => {
        // console.log('[FilterItemComponent] toggleDiscount discountToggle: ', discountToggle);
        dispatch({
            type: TOGGLE_DISCOUNT,
			payload: {
				paramItem: { discountToggle }
			}
		
        })
    },
})

const FilterItemComponent = ({ title, active, toggleFilter, toggleDiscounts, discountToggle }) => {
	const themeContext = useContext(ThemeContext)
	const [ switchItem, setswitchItem ] = useState(active)	
	
	useEffect(() => {
		let isUnMounted = false
		// console.log('FilterItemComponent item: ',{ title, active });
		setswitchItem(active)
		
		return () => {
			isUnMounted = true
		}
	}, [active])

	const _switch = async (_title) => {
		await setswitchItem(!switchItem)
		if (_title === 'Discounts') {
			toggleDiscounts({ discountToggle: !switchItem })
		} else {
			toggleFilter({ title, active: !switchItem })
		}
	}

	return (
        <Root>
            <ETACheckBox 
                title={truncateString(title, 12)}
				checkedTitle={truncateString(title, 12)}
				
				// title={truncateString(title.charAt(0).toUpperCase() + title.slice(1), 12)}
                // checkedTitle={truncateString(title.charAt(0).toUpperCase() + title.slice(1), 12)}
                
                onChange={() => _switch(title)}
                onPressTitle={() => _switch(title)}
                checked={active}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} 
            />
        </Root>
	)
}

const FilterItemComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(FilterItemComponent)

export default React.memo(FilterItemComponentConnect)