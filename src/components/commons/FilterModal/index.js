import React, { useState, useEffect, useContext, memo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Dimensions } from 'react-native'
import { ETATopModal, ETACheckBox, ETAButtonFilled } from '@etaui'
import FilterItem from './filterItem'
import { connect } from 'react-redux'
import { GET_DATA_REQUEST, CLEAN_FILTER, DELETE_FILTERS } from '@redux/menu/filters/actions'

const { width } = Dimensions.get('window')

const FiltersContainer = styled.View`
    min-height: 10px;
    width: ${width - 20}px;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 5px 20px;
	background-color: transparent;
`
const ButtonContainer = styled.View`
	height: 50px;
	width: 100%;
	align-items: center;
	background-color: transparent;
`

const mapStateToProps = (state, props) => {
	const { data } = state.filters
	return { data }
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
    }
})

const FilterModal = memo(({ isVisible, onSwipeComplete, closeModal, getDataRequest, data, cleanFilter, deleteFilters }) => {
    const themeContext = useContext(ThemeContext)
    const [ checked, setchecked ] = useState(!false)
    const [ items, setitems ] = useState([])

    useEffect(() => {
        getDataRequest()
        const getData = async () => {
            if (data) {
                let uniques = [...new Set(data)]
                await setitems(uniques)
                
            }
        }
        getData()
    },[data])
    
    useEffect(() => {
        if (items.length > 0) {
            // order array, and reorder from true to false active items  
            items.sort((x, y) => {
                return (x.active === y.active)? 0 : x.active ? -1 : 1
            })
            // All checkbox will switch depending to first item (after re-order).
            if (items[0].active) {
                setchecked(false)
            } else if (!items[0].active){
                setchecked(true)
            } 
            
        }
    },[data])

    const _applyFilters = () => {
        closeModal()
    }

    const _cleanFilters = () => {
        if (items.length > 0) {
            setchecked(true)
            cleanFilter()
        } else if(data.length == 0) {
            setchecked(true)
        }
    }
    
    return(
        <>
            <ETATopModal
                title={`Filters`}
                isVisible={isVisible}
                onSwipeComplete={onSwipeComplete}
                closeModal={closeModal}
            >
                <>
                <FiltersContainer>
                    <ETACheckBox
                        title='All'
                        checkedTitle='All'
                        onChange={_cleanFilters}
                        onPressTitle={_cleanFilters}
                        checked={checked}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} />
                {
                    items.map((item, i) => {

                        return (
                            <FilterItem
                                key={i}
                                title={item.title}
                                active={item.active}
                            />
                        )
                    })
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