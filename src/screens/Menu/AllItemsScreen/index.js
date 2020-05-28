import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import AllItemsComponent from '@components/Menu/AllItemsComponent';

const Root = styled.View`
  flex: 1;
`;

const AllItemsScreen = ({ navigation, route }) => {
  const { name } = route.params.params;
  
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [ navigation, route ]);

  return (
    <Root>
      <AllItemsComponent />
    </Root>
  );
};

export default AllItemsScreen;
