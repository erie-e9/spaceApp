import React, {useState, useEffect, useContext, useRef} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {StyleSheet} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Animated } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useRoute} from '@react-navigation/native';
import SearchBoxComponent from './SearchBoxComponent';
import UbicationDetailsComponent from './UbicationDetailsComponent';
import {Pointer} from '@commons/MapMaprkers';

const Root = styled.View`
  flex: 1
`;

const MapAddressesComponent = () => {
  const themeContext = useContext(ThemeContext);
  const route = useRoute();
  const { data } = route.params;
  const [ getLatitude, setgetLatitude ] = useState();
  const [ getLongitude, setgetLongitude ] = useState();
  const [ getLatitudeDelta, setgetLatitudeDelta ] = useState(0.015);
  const [ getLongitudeDelta, setgetLongitudeDelta ] = useState(0.0121);
  let map = useRef(null);

  useEffect(() => {
    let isSubscribed = true
    if (data) {
      setgetLatitude(data.latitude);
      setgetLongitude(data.longitude);
    }
    else {
      _findCoordinates();
    }
    return () => isSubscribed = false;
  }, [data]);

  const _findCoordinates = () => {    
		Geolocation.getCurrentPosition(
			position => {
        setgetLatitude(position.coords.latitude);
        setgetLongitude(position.coords.longitude);
        // console.log(position.coords.latitude);
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
  };
  
  return (
    <Root
      style={{...StyleSheet.absoluteFillObject}}>
      {
        getLatitude
        ? <MapView
            // ref={(map) => {this.map = map}}
            ref={map}
            provider={PROVIDER_GOOGLE}
            style={{...StyleSheet.absoluteFillObject}}
            customMapStyle={themeContext.MAPSTYLE}
            region={{
              latitude: getLatitude,
              longitude: getLongitude,
              latitudeDelta: getLatitudeDelta,
              longitudeDelta: getLongitudeDelta
            }}
          >
          </MapView>
        : null
      }
      <Pointer background={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
      <SearchBoxComponent 
        currentPosition={() => _findCoordinates()}
      />
      <UbicationDetailsComponent 
        headTitle={data ? data.headTitle : 'New address'}
        details={data ? data.details : 'Select where would like we deliver you our products'}
      />
    </Root>
  );
};

export default React.memo(MapAddressesComponent);