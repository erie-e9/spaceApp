import React, {useState, useEffect, useContext} from 'react';
import { Platform, Animated, ScrollView, Dimensions } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import GeneralItemComponent from '@components/Menu/GeneralItemComponent';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 130;
const {width} = Dimensions.get('window');

const Root = styled.View`
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const Touchable = styled.TouchableOpacity`
  zIndex: 100;
`;
const CategorytItemsList = styled.FlatList``;
const PromoHeadContainer = styled.View`
  flexDirection: row;
  justifyContent: center;
  alignItems: center;
  width: ${width}px;
  height: 100%;
  paddingBottom: 5px
`;
const PromoHeadTitle = styled.View`
  flex: 1;
  flexDirection: column;
  justifyContent: center;
  alignItems: center;
  `;
  // backgroundColor: red;
const PromoHeadImage = styled.ImageBackground`
  justifyContent: center;
  alignItems: center;
  width: 100%;
  height: 100%;
`;

const PromoComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { promoitems, selectedItem } = route.params.params;
  const [ scrollYAnimatedValue ] = useState(new Animated.Value(0));
  const [ animatedValueTransform ] = useState(new Animated.Value(0.7));
  const [ opacity ] = useState(new Animated.Value(0));
  let delayValue = 1000;
  
  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  });

  const headerBackgroundColor = scrollYAnimatedValue.interpolate({
    inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    outputRange: [themeContext.PRIMARY_TEXT_BACKGROUND_COLOR, themeContext.PRIMARY_TEXT_BACKGROUND_COLOR],
    // outputRange: [ 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.95)' ],
    extrapolate: 'extend'
  });

  useEffect(() => {    
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 5,
      useNativeDriver: true
    }).start();
    
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, [])

  const _onPressItem = (item) => {
    navigation.navigate('GetOneItemScreen', {
      screen: 'MenuScreen',
      params: {
        _id: item._id,
        item: item
      }
    });
  };

  return (
    <Root>
      <ScrollView
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }],
          {
            useNativeDriver: !true,
          }          
        )}>
        <CategorytItemsList
          contentContainerStyle={{
            flexDirection: 'column',
          }}
          data={promoitems}
          keyExtractor={(item) => item._id.toString()}
          horizontal={!true}
          numColumns={2}
          initialNumToRender={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '500' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                Empty list 
            </ETASimpleText>
            );
          }}
          // ListFooterComponent={() => {
          //   return (
          //     <ETASimpleText
          //       size={7}
          //       weight={Platform.OS === 'ios' ? '500' : '300'}
          //       color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
          //       align={'left'}>
          //       Go to up
          //   </ETASimpleText>
          //   );
          // }}
          renderItem={({item}) => {
            delayValue + 1000;
            const translateY = animatedValueTransform.interpolate({
              inputRange: [0, 1],
              outputRange:[delayValue, 1],
              extrapolate: 'clamp'
            });
            
            return(
              <Touchable key={item._id} onPress={() => _onPressItem(item)}>
                <Animated.View style={{ opacity, transform: [{ translateY }]}}>
                  <GeneralItemComponent item={item} />
                </Animated.View>
              </Touchable>
            );
          }}
        />
      </ScrollView>

      <Animated.View style={{
        position: 'absolute',
        top: (Platform.OS == 'ios') ? 20 : 0,
        left: 0,
        right: 0,
        alignItems: 'center', 
        height: headerHeight, 
        width: width, 
        backgroundColor: headerBackgroundColor
      }}>
        <PromoHeadContainer>
          <PromoHeadImage source={{ uri: selectedItem.image }}>
            <PromoHeadTitle>
              <ETASimpleText
                size={18}
                weight={Platform.OS === 'ios' ? '700' : '700'}
                // color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                color='white'
                align={'center'}
                style={{
                  elevation: 4,
                  textShadowColor: 'rgba(0, 0, 0, 0.7)',
                  textShadowOffset: {width: 0.5, height: 0.7},
                  textShadowRadius: 3
                }}
              >
                {selectedItem.title}
              </ETASimpleText>
              <ETASimpleText
                size={14}
                weight='400'
                color='white'
                align={'center'}
                style={{
                  marginBottom: 5,
                  elevation: 4,
                  textShadowColor: 'rgba(0, 0, 0, 0.7)',
                  textShadowOffset: {width: 0.5, height: 0.7},
                  textShadowRadius: 3
                }}>
                {selectedItem.description}
              </ETASimpleText>
            </PromoHeadTitle>
          </PromoHeadImage>
        </PromoHeadContainer>
      </Animated.View>
    </Root>
  );
}

export default React.memo(PromoComponent);