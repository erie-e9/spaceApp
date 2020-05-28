import React, {useContext} from 'react';
import {Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
`;
const ItemTopContainer = styled.View`
  flex: 1.4;
`;
const ItemPresentation = styled.View`
  width: ${width}px;
  height: 100%;
`;
const ItemBottomContainer = styled.View`
  flex: 0.6;
`;
const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ChatItemComponent = () => {
  const themeContext = useContext(ThemeContext);
  const route = useRoute();
  const { item } = route.params.params;
  // console.log('item ', item);
  
  
  return (
    <Root>
      <ItemTopContainer>
        <ItemPresentation>
          {/* <ItemImage source={{uri: item.images[0].image}} /> */}
        </ItemPresentation>
      </ItemTopContainer>
      <ItemBottomContainer>
        {/* <ETASimpleText
          size={14}
          weight={Platform.OS === 'ios' ? '500' : '300'}
          color={themeContext.PRIMARY_COLOR}
          align={'left'}>
          {item.name}
        </ETASimpleText> */}
      </ItemBottomContainer>
    </Root>
  );
};

export default ChatItemComponent;
