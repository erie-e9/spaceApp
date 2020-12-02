import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components/native'
import {Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
import {FontAwesome} from '@icons'
import {ETALoader} from '@etaui'

const SearchBox = styled.View`
	position: absolute;
	margin-top: ${Platform.OS === 'ios' ? 40 : 20}px;
	flex-direction: row;
	width: 90%;
	border-radius: 5px;
	justify-content: center;
	align-self: center;
	align-items: flex-start;
	align-content: center;
	background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
	elevation: 1;
`
const HeaderLeft = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	margin-left: 17px;
	margin-top: 10px;
`
const HeaderRight = styled.TouchableOpacity.attrs({
	underlayColor: 'transparent',
	hitSlop: {top: 0, bottom: 0, right: 0, left: 0}
})`
	margin-right: 17px;
	margin-top: 10px;
`

const SearchBoxComponent = ({currentPosition}) => {
	const themeContext = useContext(ThemeContext)
	const navigation = useNavigation()
	const GOOGLE_PLACES_API_KEY = 'AIzaSyB1UnzAe0p8Ls2feDF75SD8upijaf4_a1U'

	return (
		<SearchBox
			style={{
				shadowColor: '#333',
				shadowOpacity: 0.5,
				shadowOffset: {height: 1},
				shadowRadius: 2,
				elevation: 5,
			}}>
			<HeaderLeft onPress={() => navigation.goBack()}>
				<FontAwesome
					name='angle-left'
					size={25}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
			</HeaderLeft>
			<GooglePlacesAutocomplete
				placeholder='Search address'
				placeholderTextColor={
					themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
				}
				minLength={2} // minimum length of text to search
				autoFocus={false}
				fetchDetails
				loader={() => <ETALoader color={themeContext.GRAYFACEBOOK} size={12}/>}
				enablePoweredByContainer={false}
				onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					console.log(data)
					console.log(details)
				}}
				getDefaultValue={
					() => '' // text input default value
				}
				query={{
					// available options: https:/developers.google.com/places/web-service/autocomplete
					key: GOOGLE_PLACES_API_KEY,
					language: 'en', // language of the results
					types: '(cities)', // default: 'geocode'
				}}
				styles={{
					description: {
						fontWeight: '600',
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					textInputContainer: {
						borderTopWidth: 0,
						borderBottomWidth: 0,
						backgroundColor:
							themeContext.THIRD_BACKGROUND_COLOR_LIGHT,
					},
					textInput: {
						backgroundColor:
							themeContext.THIRD_BACKGROUND_COLOR_LIGHT,
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
					predefinedPlacesDescription: {
						color:
							themeContext.SECONDARY_TEXT_BACKGROUND_COLOR,
					},
				}}
				currentLocation // Will add a 'Current location' button at the top of the predefined places list
				currentLocationLabel='Current location'
				nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
				GoogleReverseGeocodingQuery={
					{
						// available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
					}
				}
				GooglePlacesSearchQuery={{
					// available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
					rankby: 'distance',
					types: 'food',
				}}
				GooglePlacesDetailsQuery={{
					// available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
					fields: 'formatted_address',
				}}
				filterReverseGeocodingByTypes={[
					'locality',
					'administrative_area_level_3',
				]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
				// predefinedPlaces={[homePlace, workPlace]}
				predefinedPlacesAlwaysVisible
			/>
			<HeaderRight onPress={currentPosition}>
				<FontAwesome
					name='location-arrow'
					size={20}
					color={
						themeContext.SECONDARY_TEXT_BACKGROUND_COLOR
					}
				/>
			</HeaderRight>
		</SearchBox>
	)
}

export default React.memo(SearchBoxComponent)
