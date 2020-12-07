import React, {useEffect, useRef} from 'react'
import styled from 'styled-components/native'

const Root = styled.View`
	flex: 1;
	justify-content: center;
	background-color: transparent;
`
const Scroll = styled.ScrollView``

const ETAAutoScroll = ({children, time}) => {
	const scrollView = useRef(null)
	let layoutHeight

	useEffect(() => {
		let isUnMounted = false
		setTimeout(() => {
			// scrollView.current.scrollToEnd({duration: time, animated: true})
			scrollView.current.scrollTo({
				y: layoutHeight,
				animated: true,
				duration: time,
			})
		}, 1000)
		
		return () => {
			isUnMounted = true
		}
	}, [])

	return (
		<>
			<Root>
				<Scroll
					ref={scrollView}
					showsVerticalScrollIndicator={false}
					onLayout={(e) => {
						layoutHeight = e.nativeEvent.layout.width
					}}
					onContentSizeChange={(
						contentWidth,
						contentHeight,
					) => {
						layoutHeight = contentHeight
					}}>
					{children}
				</Scroll>
			</Root>
		</>
	)
}

export default ETAAutoScroll
