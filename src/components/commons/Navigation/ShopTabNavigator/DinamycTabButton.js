import React, {useContext} from 'react';
import {Animated} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {Ionicons, SunIcon, IcecreamIcon, IcecreamIcon2, IcecreamIcon3} from '@icons';

const ItemGeneratorContainer = styled.View`
  position: absolute;
  alignItems: center;
`;
const ItemGeneratorButton = styled.TouchableHighlight.attrs({
  underlayColor: 'transparent',
})`
  zIndex: 1000;
`;
const SecondaryButton = styled.View`
  backgroundColor: ${props => props.theme.PRIMARY_COLOR};
  justifyContent: center;
  alignItems: center;
  height: 30px;
  width: 30px;
  borderRadius: 36px;
  position: absolute;
  top: -60px;
  shadowColor: black;
  shadowRadius: 5px;
  shadowOffset: 10px;
  shadowOpacity: 0.3;
  borderWidth: 1px;
  borderColor: white;
`;
const SubItemGeneratorButton = styled.TouchableOpacity.attrs({
  underlayColor: 'transparent',
})`
  zIndex: 100;
`;

const DinamycTabButton = ({ focused, size, onPress }) => {
  const themeContext = useContext(ThemeContext);
  let buttonSize = new Animated.Value(1);
  let mode = new Animated.Value(0);

  const _handlePress = () => {
    console.warn('pressed');
    
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.85,
        useNativeDriver: true
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        useNativeDriver: true
      }),
    ]).start();
    
    Animated.timing(mode, {
      toValue: mode._value === 0 ? 1 : 0,
      duration: 200,
      useNativeDriver: !true
    }).start();
  }

  const SecondaryButton1X = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-17, -60]
  });
  const SecondaryButton1Y = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [35, -11]
  });

  const SecondaryButton2X = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, -15]
  });
  const SecondaryButton2Y = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [35, -35]
  });

  const SecondaryButton3X = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-17, 30]
  });
  const SecondaryButton3Y = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [35, -11]
  });

  const hide = () => {
    _handlePress()
  }

  const _handlePressButton1 = () => {
    console.log('_handlePressButton1 pressed');
  }

  const _handlePressButton2 = () => {
    console.log('_handlePressButton2 pressed');
  }

  const _handlePressButton3 = () => {
    console.log('_handlePressButton3 pressed');
  }

  return (
    <ItemGeneratorContainer>
      <Animated.View style={{ position: 'absolute', left: SecondaryButton1X, top: SecondaryButton1Y }}>
        <SecondaryButton>
          <SubItemGeneratorButton onPress={() => {_handlePressButton1(); onPress()}}>
            <Animated.View style={{ transform: [{ scale: buttonSize }] }}>
              <IcecreamIcon 
                focused={focused} 
                // color={focused ? themeContext.PRIMARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_BACKGROUND_COLOR} 
                color='white'
                size={size-7} />
            </Animated.View>
          </SubItemGeneratorButton>
        </SecondaryButton>
      </Animated.View>
      
      <Animated.View style={{ position: 'absolute', left: SecondaryButton2X, top: SecondaryButton2Y }}>
        <SecondaryButton>
          <SubItemGeneratorButton onPress={() => {_handlePressButton2(); onPress()}}>
            <Animated.View style={{ transform: [{ scale: buttonSize }] }}>
              <SunIcon 
                focused={focused} 
                // color={focused ? themeContext.PRIMARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_BACKGROUND_COLOR} 
                color='white'
                size={size-7} />
            </Animated.View>
          </SubItemGeneratorButton>
        </SecondaryButton>
      </Animated.View>
      
      <Animated.View style={{ position: 'absolute', left: SecondaryButton3X, top: SecondaryButton3Y }}>
        <SecondaryButton>
          {/* <IcecreamIcon3 
            focused={focused} 
            // color={focused ? themeContext.PRIMARY_TEXT_BACKGROUND_COLOR : themeContext.PRIMARY_TEXT_BACKGROUND_COLOR} 
            color='white'
          size={size-7} /> */}
          <SubItemGeneratorButton onPress={() => {_handlePressButton3(); onPress()}}>
            <Animated.View style={{ transform: [{ scale: buttonSize }] }}>
              <Ionicons name='md-heart' size={size-7} color={'white'} />
            </Animated.View>
          </SubItemGeneratorButton>
        </SecondaryButton>
      </Animated.View>

      <Animated.View style={{
        backgroundColor: '#262626',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        width: 56,
        borderRadius: 28,
        position: 'absolute',
        top: -35,
        borderWidth: 6,
        borderColor: themeContext.PRIMARY_TEXT_BACKGROUND_COLOR,
      }}>
        <ItemGeneratorButton onPress={() => {_handlePress(); onPress()}}>
          <Animated.View style={{ transform: [{ scale: buttonSize }], zIndex: 1000 }}>
            <IcecreamIcon 
              focused={focused} 
              // color={focused ? themeContext.PRIMARY_TEXT_BACKGROUND_COLOR : themeContext.SECONDARY_TEXT_BACKGROUND_COLOR} 
              color='white'
              size={size} />
          </Animated.View>
        </ItemGeneratorButton>
      </Animated.View>
    </ItemGeneratorContainer>
  );
}

export default React.memo(DinamycTabButton);