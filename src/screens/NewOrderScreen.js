import React, {useState} from 'react'
import {Keyboard} from 'react-native'
import styled from 'styled-components/native'
// import { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import createOrderMutation from '@graphql/mutations/createOrder';
// import getOrdersQuery from '@graphql/queries/getOrders';

const Root = styled.View`
	flex: 1;
	align-items: center;
	background-color: ${(props) => props.theme.WHITE};
`
const Wrapper = styled.View`
	height: 80%;
	width: 90%;
	padding-top: 5;
	position: relative;
`
const Input = styled.TextInput.attrs({
	multiline: true,
	maxLength: 140,
	placeholder: 'What do you fancy now?',
	autoFocus: true,
})`
	height: 40%;
	width: 100%;
	font-size: 18;
	color: #333;
`
const CreateOrderButton = styled.TouchableWithoutFeedback`
	background-color: ${(props) => props.theme.PRIMARY};
	align-items: center;
	justify-content: center;
	width: 80;
	height: 40;
	border-radius: 25;
	position: absolute;
	top: 60%;
	right: 0;
`
const CreateOrderText = styled.Text`
	color: ${(props) => props.theme.WHITE};
	font-size: 16;
`
const TextLenght = styled.Text`
	color: ${(props) => props.theme.PRIMARY100};
	font-size: 16;
	position: absolute;
	top: 55%;
	right: 5%;
`

const NewOrderScreen = () => {
	const [text] = useState('')

	const _onCreateOrderPress = async () => {
		const {clients} = this.props
		await this.props.mutate({
			variables: {
				text: this.state.text,
			},
			optimisticResponse: {
				__typename: 'Mutation',
				createOrder: {
					__typename: 'Order',
					_id: Math.round(Math.random() * -1000000),
					text: this.state.text,
					favoriteCount: 0,
					createdAt: new Date(),
					client: {
						__typename: 'Client',
						username: clients.username,
						firstname: clients.firstname,
						lastname: clients.lastname,
						avatar: clients.avatar,
					},
				},
			},
			update: (store, {data: {createOrder}}) => {
				const data = store.readQuery({
					query: getOrdersQuery,
				})
				if (
					!data.getOrders.find(
						(o) => o._id === createOrder._id,
					)
				) {
					store.writeQuery({
						query: getOrdersQuery,
						data: {
							getOrders: [
								{
									...createOrder,
								},
								...data.getOrders,
							],
						},
					})
				}
			},
		})
		Keyboard.dismiss()
		this.props.navigation.goBack(null)
	}
	const _textLenght = () => 140 - this.state.text.length

	const _buttonDisabled = () => this.state.text.length < 5

	return (
		<Root>
			<Wrapper>
				<Input
					value={text}
					onChangeText={() => _onChangeText()}
				/>
				<TextLenght>{() => _textLenght()}</TextLenght>
				<CreateOrderButton
					onPress={() => _onCreateOrderPress()}
					disabled={() => _buttonDisabled()}>
					<CreateOrderText>To order</CreateOrderText>
				</CreateOrderButton>
			</Wrapper>
		</Root>
	)
}

export default compose(
	graphql(createOrderMutation),
	connect((state) => ({clients: state.clients.info})),
)(NewOrderScreen)
