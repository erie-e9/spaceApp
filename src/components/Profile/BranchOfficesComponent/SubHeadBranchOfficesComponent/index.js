import React, {useEffect, useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {ETAButtonFilled} from '@etaui'
import { connect } from 'react-redux'
import { GET_ALL_ITEMS_REQUEST } from '@redux/profile/branchoffices/actions'

const Root = styled.View`
	min-height: 10px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: transparent;
`
const ContentContainer = styled.View`
	min-height: 10px;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	margin: 5px;
	background-color: transparent;
`
const mapStateToProps = (state, props) => {
	const { data } = state.branchoffices
	return { data }
}

const mapDispatchProps = (dispatch, props) => ({
	getAllItemsRequest: () => {
		dispatch({
			type: GET_ALL_ITEMS_REQUEST
		})
	}
})

const SubHeadBranchOfficesComponent = ({getAllItemsRequest, data}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()

	useEffect(() => {
		getAllItemsRequest()
	}, [data])

	return (
		<Root>
			<ContentContainer>
				<ETAButtonFilled
					title='See all on map'
					onPress={() =>
						navigation.navigate('SettingsNavigator', {
							screen: 'MapBranchOfficesScreen',
							params: {
								data: data,
							},
						})
					}
					colorButton={themeContext.PRIMARY_COLOR}
					padding={10}
					width={250}
					borderRadius={3}
				/>
			</ContentContainer>
		</Root>
	)
}

const SubHeadBranchOfficesComponentConnect = connect(
	mapStateToProps,
	mapDispatchProps
)(SubHeadBranchOfficesComponent)

export default SubHeadBranchOfficesComponentConnect
// export default React.memo(SubHeadBranchOfficesComponent)
