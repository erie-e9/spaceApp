import React from 'react'
import styled from 'styled-components/native'
import faqs from '@utils/faqs.json'
import Card from './Card'

const Root = styled.View`
	flex: 1;
	flex-direction: column;
	align-items: center;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`
const FAQSList = styled.FlatList`
	flex-direction: column;
	padding: 10px 10px;
`

const FAQSComponent = () => (
	<Root>
		<FAQSList
			contentContainerStyle={{
				alignSelf: 'stretch',
			}}
			data={faqs.data}
			keyExtractor={(item) => item._id.toString()}
			showsVerticalScrollIndicator={false}
			// refreshing={refresher}
			// onRefresh={() => _getData()}
			renderItem={({item}) => <Card key={item._id} {...item} />}
		/>
	</Root>
)

export default React.memo(FAQSComponent)
