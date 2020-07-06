import React from 'react';
import styled from 'styled-components/native';
import AddressesComponent from '@components/Profile/AddressesComponent';

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddressesScreen = () => {
  return (
    <Root>
      <AddressesComponent />
    </Root>
  );
};

export default AddressesScreen;
