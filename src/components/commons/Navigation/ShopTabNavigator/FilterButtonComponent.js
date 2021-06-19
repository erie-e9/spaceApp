import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components/native'
import { MaterialCommunityIcons } from '@icons'
import { connect } from 'react-redux'
import { TOGGLE_MODAL } from '@redux/menu/filters/actions'

const IconButton = styled.TouchableOpacity`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	border-radius: 32px;
	margin-horizontal: 5px;
	margin-right: 15px;
	background-color: #e4e6eb;
`

const mapStateToProps = (state, props) => {
	const { toggle_modal } = state.filters
	return { toggle_modal }
}

const mapDispatchProps = (dispatch, props) => ({
	toggleModal: (toggle_modal) => {
		dispatch({
            type: TOGGLE_MODAL,
            payload: {
				toggle_modal,
			}
		})
	},
})

const FilterButtonComponent = ({ toggleModal, toggle_modal }) => {
	
    const _onPress = () => {
		toggleModal(!toggle_modal)
    }

	return (
        <IconButton
            // activeOpacity={0.7}
            underlayColor='#ccd0d5'
            onPress={_onPress}
            >
            <MaterialCommunityIcons
                name='filter'
                size={20}
                color='#000'
            />
        </IconButton>
	)
}

const FilterButtonComponentConnect = connect(mapStateToProps, mapDispatchProps)(FilterButtonComponent)
export default FilterButtonComponentConnect
