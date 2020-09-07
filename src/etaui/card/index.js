import React from 'react'
import styled from 'styled-components/native'
import CardHeader from './cardHeader'
import CardBody from './cardBody'
// import CardBottom from './cardBottom';

const Root = styled.View`
	min-height: 100px;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	padding-horizontal: 15px;
	padding-vertical: 5px;
	shadow-color: ${(props) => props.theme.SECONDARY_BACKGROUND_COLOR};
	margin-vertical: 0.5px;
`

const ETACard = ({text, client, createdAt, favoriteCount}) => (
	<Root>
		<CardHeader {...client} createdAt={createdAt} />
		<CardBody text={text} />
		{/* {
                props.status === 1
                ? <CardBottom />
                : null
            } */}
	</Root>
)

export default React.memo(ETACard)
