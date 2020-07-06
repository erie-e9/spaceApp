import React, {useState, useEffect, useContext} from 'react';
import {Animated} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText, ETAButtonOutline} from '@etaui';
import {Context} from '@context/cartContext';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CartItemComponent from './CartItemComponent';

const Root = styled.View`
  flex: 0.58;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;
const CategorytItemsList = styled.FlatList``;
const EmptyListContainer = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const CartListComponent = () => {
  const themeContext = useContext(ThemeContext);
  const {getCartItems, state} = useContext(Context);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [animatedValueTransform] = useState(new Animated.Value(0.7));
  const [items, setitems] = useState([]);
  const [opacity] = useState(new Animated.Value(0));
  let delayValue = 1000;

  // useEffect(() => {
  //     getCartItems();
  //     setitems(state.data);
  //     console.log('CartListComponent state.data', state.data);
  //     console.log('CartListComponent isFocused', isFocused);
  // }, [isFocused])

  useEffect(() => {
    getCartItems();
    setitems(state.data);
    console.log('CartListComponent state.data', state.data);
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 5,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    return () => {
      getCartItems();
    };
  }, [state.data]);

  return (
    <Root>
      <CategorytItemsList
        contentContainerStyle={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
        data={state.data}
        keyExtractor={(item) => item._id.toString()}
        horizontal={!true}
        // numColumns={2}
        initialNumToRender={5}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <EmptyListContainer>
              <ETASimpleText
                size={14}
                weight={Platform.OS === 'ios' ? '500' : '300'}
                color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                align={'left'}>
                Your cart doesn´t have products yet
              </ETASimpleText>

              <ETAButtonOutline
                title="See menu"
                onPress={() =>
                  navigation.navigate('ShopTabNavigator', {screen: 'Menu'})
                }
                disabled={false}
                colorButton={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                padding={10}
                width={250}
                border-radius={3}
              />
            </EmptyListContainer>
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
        renderItem={({item, i}) => {
          delayValue + 1000;
          const translateY = animatedValueTransform.interpolate({
            inputRange: [0, 1],
            outputRange: [delayValue, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                opacity,
                transform: [{translateY}],
                justifyContent: 'flex-start',
              }}>
              <CartItemComponent item={item} />
            </Animated.View>
          );
        }}
      />
    </Root>
  );
};

export default CartListComponent;
