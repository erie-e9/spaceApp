import React, { useLayoutEffect } from 'react';
import styled from 'styled-components/native';
import PromotionComponent from '@components/Menu/PromotionComponent';
// import data from '@utils/categories.json';

const Root = styled.View`
  flex: 1;
`;

const PromotionScreen = ({ navigation, route }) => {
  const { name } = route.params.params;
  
  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: name });
  }, [ navigation, route ]);
  
  return (
    <Root>
      <PromotionComponent/>
    </Root>
  );
};

export default PromotionScreen;