import React from 'react'
import styled from 'styled-components/native'
import MenuComponent from '@components/Menu/MenuComponent'
import { PERMISSIONS, request, requestNotifications } from 'react-native-permissions'

const Root = styled.View``

const MenuScreen = () => {
	request(
		Platform.select({
		  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
		  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
		}),
	);
	
	requestNotifications(['alert', 'sound']).then(({status, settings}) => {
		// console.log('status notifications: ', {status, settings});
		// …
	});

	// openSettings().catch(() => console.warn('cannot open settings'));
	return (
		<Root>
			<MenuComponent />
		</Root>
	)
}

export default MenuScreen
