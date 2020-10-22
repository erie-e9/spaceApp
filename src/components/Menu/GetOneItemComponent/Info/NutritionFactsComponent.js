import React, { useState, useEffect, useContext, memo, useRef, createRef } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { ETASimpleText, ETALoader } from '@etaui'

const Root = styled.View`
	flex: 1;
    width: 100%;
	flex-direction: column;
	justify-content: center;
	background-color: transparent;
`
const ListItems = styled.FlatList``
const InfoItemComponent = styled.View``

const NutritionFactsComponent = memo(({ data }) => {
    const themeContext = useContext(ThemeContext)
    const [ items, setitems ] = useState([])

    return (
        <Root>
            {
				items !== null
				?	<ListItems
						contentContainerStyle={{
							flexDirection: 'column',
							justifyContent: 'flex-start',
						}}
						data={items}
						keyExtractor={(item) => item._id.toString()}
						horizontal={!true}
						initialNumToRender={5}
						showsVerticalScrollIndicator={false}
						updateCellsBatchingPeriod={3000}
						renderItem={({item, i}) => {
                            return (
                                <InfoItemComponent
                                    // item={item}
                                    // howMany={item.howMany}
                                />
                            )
						}}
					/>
				:	<ETALoader color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} size={9}/>
			}
        </Root>
    )
})

export default NutritionFactsComponent
