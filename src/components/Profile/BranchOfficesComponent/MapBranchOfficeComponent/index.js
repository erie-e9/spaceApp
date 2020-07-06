import React, {useState, useEffect, useContext, useRef} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useRoute} from '@react-navigation/native';
import SearchBoxComponent from './SearchBoxComponent';
import BranchOfficeDetailsComponent from './BranchOfficeDetailsComponent';
import {Pointer, GeneralPointer} from '@commons/MapMaprkers';

const Root = styled.View`
  flex: 1;
`;

const MapBranchOfficeComponent = () => {
  const themeContext = useContext(ThemeContext);
  const route = useRoute();
  const {data} = route.params;
  const [getLatitude, setgetLatitude] = useState();
  const [getLongitude, setgetLongitude] = useState();
  const [getLatitudeDelta] = useState(0.015);
  const [getLongitudeDelta] = useState(0.0121);
  let map = useRef(null);

  useEffect(() => {
    let isSubscribed = true;
    _findCoordinates();
    return () => (isSubscribed = false);
  }, []);

  const _findCoordinates = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setgetLatitude(position.coords.latitude);
        setgetLongitude(position.coords.longitude);
        // console.log(position.coords.latitude);
      },
      (error) => console.warn(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <Root style={{...StyleSheet.absoluteFillObject}}>
      {getLatitude ? (
        <MapView
          ref={map}
          provider={PROVIDER_GOOGLE}
          style={{...StyleSheet.absoluteFillObject}}
          customMapStyle={themeContext.MAPSTYLE}
          // initialRegion
          region={{
            latitude: Array.isArray(data) ? getLatitude : data.latitude,
            longitude: Array.isArray(data) ? getLongitude : data.longitude,
            latitudeDelta: getLatitudeDelta,
            longitudeDelta: getLongitudeDelta,
          }}>
          {Array.isArray(data) ? (
            data.map((item) => {
              return (
                <Marker
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}>
                  <GeneralPointer
                    background={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    // onPress={() => this._markerclick()}
                    // onLongPress={() => {this._markerlongclick(marker.latlng.latitude, marker.latlng)}}
                  >
                    {item.title}
                  </GeneralPointer>
                </Marker>
              );
            })
          ) : (
            <Marker
              coordinate={{
                latitude: data.latitude,
                longitude: data.longitude,
              }}>
              <GeneralPointer
                background={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                // onPress={() => this._markerclick()}
                // onLongPress={() => {this._markerlongclick(marker.latlng.latitude, marker.latlng)}}
              >
                {data.title}
              </GeneralPointer>
            </Marker>
          )}
          <Marker
            coordinate={{
              latitude: getLatitude,
              longitude: getLongitude,
              latitudeDelta: getLatitudeDelta,
              longitudeDelta: getLongitudeDelta,
            }}>
            <Pointer
              background={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
              // onPress={() => this._markerclick()}
              // onLongPress={() => {this._markerlongclick(marker.latlng.latitude, marker.latlng)}}
            />
          </Marker>
        </MapView>
      ) : null}
      <SearchBoxComponent currentPosition={() => _findCoordinates()} />
      <BranchOfficeDetailsComponent data={data} />
    </Root>
  );
};

export default React.memo(MapBranchOfficeComponent);
