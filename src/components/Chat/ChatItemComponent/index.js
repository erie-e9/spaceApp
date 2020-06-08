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
const BackgroundDoodle = styled.ImageBackground`
  flex: 1;
  width: null;
  height: null;
  resizeMode: cover;
  justifyContent: center;
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
      <BackgroundDoodle source={{uri: 'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png' }}>
        {/* <ItemTopContainer>
          <ItemPresentation>
          </ItemPresentation>
        </ItemTopContainer>
        <ItemBottomContainer>
        </ItemBottomContainer> */}  
      </BackgroundDoodle>
    </Root>
  );
};

export default ChatItemComponent;
