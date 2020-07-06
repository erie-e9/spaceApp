import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, Animated} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import MessageBubbleComponent from './MessageBubbleComponent';
import messages from '@utils/messages.json' 

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
  resize-mode: cover;
  justify-content: center;
`;
const ItemImage = styled.Image`
  width: 100%;
  height: 100%;
`;
const MessagesList = styled.FlatList``;

const ChatItemComponent = () => {
  const themeContext = useContext(ThemeContext);
  const [ items ] = useState(messages.data); //slice: only first 4 items
  const [ animatedValueTransform ] = useState(new Animated.Value(0.9));
  const [ opacity ] = useState(new Animated.Value(0));
  let delayValue = 2000;
  
  useEffect(() => {
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 0,
      useNativeDriver: true
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, [])

  return (
    <Root>
      <BackgroundDoodle source={{uri: 'https://i.pinimg.com/originals/ab/ab/60/abab60f06ab52fa7846593e6ae0c9a0b.png' }}>
        <MessagesList
          contentContainerStyle={{
            flexDirection: 'column',
          }}
          data={items}
          keyExtractor={(item) => item._id.toString()}
          horizontal={!true}
          initialNumToRender={4}
          showsHorizontalScrollIndicator={!true}
          showsVerticalScrollIndicator={true}
          renderItem={({item}) => {
            delayValue = delayValue + 1000;
            const translateY = animatedValueTransform.interpolate({
              inputRange: [0, 1],
              outputRange: [delayValue, 1],
              extrapolate: 'clamp'
            });

            return (
              // <Touchable key={item._id} onPress={() => _onPressItem(item)}>
                <Animated.View style={{ 
                  opacity, 
                  // transform: [{ translateY }]
                }}>
                  <MessageBubbleComponent item={item} />
                </Animated.View>
              // {/* </Touchable> */}
            );
          }}
        />
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
