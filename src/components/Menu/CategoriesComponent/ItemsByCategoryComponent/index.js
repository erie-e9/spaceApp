import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, Animated} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import GeneralItemComponent from '@components/Menu/GeneralItemComponent';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const Touchable = styled.TouchableOpacity`
  zIndex: 100
`;
const CategorytItems = styled.FlatList``;

const ItemsByCategoryComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { items } = route.params.params;
  const [ animatedValueTransform ] = useState(new Animated.Value(0.7));
  const [ opacity ] = useState(new Animated.Value(0));
  let delayValue = 500;

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
      <CategorytItems
        contentContainerStyle={{
          flexDirection: 'column',
        }}
        data={items}
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
          )
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
        //   )
        // }}
        renderItem={({item}) => {
          delayValue + 1000;
          const translateY = animatedValueTransform.interpolate({
            inputRange: [0, 1],
            outputRange:[delayValue, 1]
          });

          return (
            <Touchable key={item._id} onPress={() => _onPressItem(item)}>
              <Animated.View style={{opacity, transform: [{ translateY }]}}>
                <GeneralItemComponent item={item} />
              </Animated.View>
            </Touchable>
          );
        }}
      />
    </Root>
  );
}

export default ItemsByCategoryComponent;