import React from 'react';
import styled from 'styled-components/native';
import MapAddressesComponent from '@components/Profile/AddressesComponent/MapAddressesComponent';

const Root = styled.View`
  flex: 1;
`;

const MapAddresses = () => {
  return (
    <Root>
      <MapAddressesComponent />
    </Root>
  );
};

export default MapAddresses;
