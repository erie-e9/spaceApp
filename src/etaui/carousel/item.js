import React from 'react'
import {Dimensions} from 'react-native'
import styled from 'styled-components'
import {ETASimpleText} from '@etaui'

const {width, height} = Dimensions.get('window')

const Root = styled.View`
	min-height: ${props => props.sizeHeight}px;
	width: ${width - 20}px;
	justify-content: center;
	margin-horizontal: 10px;
	margin-vertical: 10px;
	border-radius: 8px;
	shadow-offset: 5px 5px;
	shadow-color: #000;
	shadow-opacity: 0;
	shadow-radius: 3px;
	elevation: 0;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
// shadow-offset: ${{width: 0.5, height: 0.5}};
const ItemImage = styled.Image`
	height: ${props => props.sizeHeight}px;
	width: ${width - 20}px;
	border-radius: 10px;
`
const ContentContainer = styled.View`
	position: absolute;
	bottom: 10px;
	margin: 7px;
	left: 5px;
`

const ETACarouselItem = ({item, sizeHeight}) => (
	<Root
		sizeHeight={sizeHeight}>
		<ItemImage source={{uri: item.image}} 
			sizeHeight={sizeHeight}/>
		<ContentContainer>
			<ETASimpleText
				size={18}
				weight='600'
				color={item.titleColor}
				align='center'
				style={{
					elevation: 4,
					textShadowColor: 'rgba(0, 0, 0, 0.7)',
					textShadowOffset: {
						width: 0.5,
						height: 0.7,
					},
					textShadowRadius: 3,
				}}>
				{item.title}
			</ETASimpleText>
			<ETASimpleText
				size={14}
				weight='400'
				color={item.descriptionColor}
				align='center'
				style={{
					marginBottom: 5,
					elevation: 4,
					textShadowColor: 'rgba(0, 0, 0, 0.7)',
					textShadowOffset: {
						width: 0.5,
						height: 0.7,
					},
					textShadowRadius: 3,
				}}>
				{item.description}
			</ETASimpleText>
		</ContentContainer>
	</Root>
)

export default React.memo(ETACarouselItem)
