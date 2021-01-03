import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions } from 'react-native'
import { ETATopModal, ETACheckBox, ETASimpleText } from '@etaui'
import FilterItem from './filterItem'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST, CLEAN_FILTER, DELETE_FILTERS, TOOGLE_SORT_INCREMENT } from '@redux/menu/filters/actions'
import { useTranslation } from '@etaui/translate'

const { height, width } = Dimensions.get('window')
const Root = styled.View`
    flex: 1;
    min-height: ${height}px;
	min-width: ${width}px;
	background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`
const FiltersContainer = styled.View`
    min-height: 10px;
    width: ${width - 20}px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 30px;
	background-color: transparent;
`
const ListItems = styled.FlatList`

`
const HeaderFiltersContainer = styled.View`
    min-height: 10px;
	min-width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`
const HeaderFiltersItemsContainer = styled.View`
	flex-direction: row;
	margin-bottom: 0px;
	min-width: 110px;
    justify-content: center;
    align-items: center;
`
const Separator = styled.View`
    width: 100%;
    border-width: 0px;
	border-color: ${props => props.theme.PRIMARY_COLOR_LIGHT};
`
const ButtonContainer = styled.View`
	height: 50px;
	width: 100%;
	align-items: center;
	background-color: transparent;
`
const EmptyListContainer = styled.View`
    min-height: 10px;
	flex-direction: column;
	justify-content: center;
    align-items: center;
    padding-vertical: 20px;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { data, increment, discounts, discountToggle } = state.filters
	return { data, increment, discounts, discountToggle }
}

const mapDispatchProps = (dispatch, props) => ({
    getDataRequest: () => {
		dispatch({
			type: GET_DATA_REQUEST,
			payload: {}
		})
    },

    cleanFilter: () => {
        dispatch({
            type: CLEAN_FILTER,
            payload: {}
        })
    },

    deleteFilters: () => {
        dispatch({
            type: DELETE_FILTERS,
            payload: {}
        })
    },

    toogleSortArrayIncrement: (value) => {
        // console.log('[FilterModal] toogleSortArrayIncrement value: ', value);
        dispatch({
            type: TOOGLE_SORT_INCREMENT,
            payload: {
                paramItem: {
                    increment: value
                }
            }
        })
    },  
})

const FilterModal = memo(({ isVisible, onSwipeComplete, closeModal, getDataRequest, data, cleanFilter, toogleSortArrayIncrement, increment, discounts, discountToggle }) => {
    const themeContext = useContext(ThemeContext)
    const [ checked, setchecked ] = useState(true)
    const [ incrementchecked, setincrementchecked ] = useState(undefined)
    const [ items, setitems ] = useState([])
    const [ extra, setextra ] = useState([])
	const { filters, discounts_title } = useTranslation()

    useEffect(() => {
        fillExtras(discountToggle)
    }, [discountToggle])

    // useEffect(() => {
    // }, [discountToggle])

    useEffect(() => {
        let isUnMounted = false
        getDataRequest()
        const getData = async () => {
            if (data) {
                let uniques = [...new Set(data)]
                await setitems(uniques)
            }
        }
        getData()

		return () => {
			isUnMounted = true
        }
    }, [data])

    useEffect(() => {
        let isUnMounted = false
        if (items.length > 0) {
            // order array, and reorder from true to false active items  
            items.sort((x, y) => {
                return (x.active === y.active)? 0 : x.active ? -1 : 1
            })
            
			// console.log('[FilterModal] items: ', items);
            // All checkbox will switch depending to first item (after re-order).
            if (items[0].active) {
                setchecked(false)
                // console.log('[[items[0].active]]', items[0].active);
                // setincrementchecked(increment)
            } else if (!discountToggle) {
                setchecked(false)
                // console.log('[[discountToggle]]', items[0].active);
            } else if (!items[0].active){
                setchecked(true)
                // console.log('[[!items[0].active]]', items[0].active);
                // setincrementchecked(false)
            } 
        }
        
		return () => {
			isUnMounted = true
		}
    },[items, increment, discountToggle])
    
    useEffect(() => {
        let isUnMounted = false
        // setincrementchecked(increment)        
        return () => {
            isUnMounted = true
        }
    }, [increment])

    const _cleanFilters = () => {
        if (items.length > 0) {
            setchecked(true)
            cleanFilter()
        } else if(data.length == 0) {
            setchecked(true)
        }
    }

    const _toogleSortArrayIncrement = async (value) => {
        // console.log('_toogleSortArrayIncrement: value', value);
        if (value) {
            setincrementchecked(true)
        } else {
            setincrementchecked(false)
        }
        await toogleSortArrayIncrement(value)
    }
    
    const fillExtras = (_discountToggle) => {
        if (discounts !== undefined && discountToggle !== undefined) {
            setextra([
                {
                    title: discounts_title.charAt(0).toUpperCase() + discounts_title.slice(1),
                    active: _discountToggle,
                }
            ])
        } else {
            setextra([])
        }
    }

    return(
        <>
            <ETATopModal
                title={filters.charAt(0).toUpperCase() + filters.slice(1)}
                isVisible={isVisible}
                onSwipeComplete={onSwipeComplete}
                closeModal={closeModal}
            >
                <>
                <FiltersContainer>                     
                    {
                        data.length > 0
                        ?   <ListItems
                                contentContainerStyle={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'stretch',
                                    width: '100%',
                                }}
                                numColumns={2}
                                data={[...extra, ...items]}
                                keyExtractor={(item, i) => i.toString()}
                                horizontal={!true}
                                initialNumToRender={5}
                                showsVerticalScrollIndicator={false}
                                updateCellsBatchingPeriod={3000}
                                ListHeaderComponent={(i) => (
                                    <HeaderFiltersContainer key={i}>
                                        <ETACheckBox
                                            title='All'
                                            checkedTitle='All'
                                            onChange={_cleanFilters}
                                            onPressTitle={_cleanFilters}
                                            checked={checked}
                                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
                                        {
                                           [
                                            {
                                                _id: 3,
                                                title: '$-$$$',
                                                active: true,
                                            },
                                            {
                                                _id: 4,
                                                title: '$$$-$',
                                                active: true,
                                            }].map((item) => (
                                                <HeaderFiltersItemsContainer key={`${item._id}`}>
                                                    <ETACheckBox
                                                        title={item.title}
                                                        checkedTitle={item.title}
                                                        onChange={() => item.title === '$-$$$' ? _toogleSortArrayIncrement(true) : _toogleSortArrayIncrement(false)}
                                                        onPressTitle={() => item.title === '$-$$$' ? _toogleSortArrayIncrement(true) : _toogleSortArrayIncrement(false)}
                                                        // checked={increment === undefined ? false : item.title === '$-$$$' && increment ? true : item.title === '$$$-$' && !increment ? true : false}
                                                        checked={incrementchecked === undefined ? false : item.title === '$-$$$' ? incrementchecked : item.title === '$$$-$' ? !incrementchecked : undefined}
                                                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
                                                </HeaderFiltersItemsContainer>
                                                )) 
                                        }
                                    </HeaderFiltersContainer>
                                )}
                                ListEmptyComponent={() => (
                                    <EmptyListContainer>
                                        <ETASimpleText
                                            size={14}
                                            weight={
                                                Platform.OS === 'ios'
                                                    ? '400'
                                                    : '300'
                                            }
                                            color={
                                                themeContext.PRIMARY_TEXT_COLOR_LIGHT
                                            }
                                            align='left'>
                                            There're no filters availables.
                                        </ETASimpleText>
                                    </EmptyListContainer>
                                )}
                                renderItem={({item, i}) => {
                                    return (
                                        <FilterItem
                                            key={i}
                                            title={item.title}
                                            active={item.active}
                                        />
                                    )
                                }}
                            />
                        :   null
                    }
                </FiltersContainer>
                    {/* <ButtonContainer>
                        <ETAButtonFilled
                            title='Apply'
                            onPress={() => _applyFilters()}
                            colorButton={
                                themeContext.SECONDARY_BACKGROUND_COLOR
                            }
                            padding={10}
                            width={250}
                            borderRadius={3}
                        />
                    </ButtonContainer> */}
                </>
            </ETATopModal>
        </>
    )
})

const FilterModalConnect = connect(
	mapStateToProps,
	mapDispatchProps,
)(FilterModal)
export default FilterModalConnect