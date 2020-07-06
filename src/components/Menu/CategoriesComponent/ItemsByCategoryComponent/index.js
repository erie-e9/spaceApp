import React, {useState, useEffect, useContext} from 'react';
import {Animated, Platform} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import GeneralItemComponent from '@components/Menu/GeneralItemComponent';

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
// const Touchable = styled.TouchableOpacity`
//   z-index: 100;
// `;
const CategorytItems = styled.FlatList``;

const ItemsByCategoryComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const {items} = route.params.params;
  const [itemparams, setitemparams] = useState([]);
  const [animatedValueTransform] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));
  let delayValue = 700;

  useEffect(() => {
    setitemparams(items);
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 5,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  const _onPressItem = (item) => {
    navigation.navigate('GetOneItemScreen', {
      screen: 'MenuScreen',
      params: {
        _id: item._id,
        item: item,
      },
    });
  };

  return (
    <Root>
      <CategorytItems
        contentContainerStyle={{
          flexDirection: 'column',
        }}
        data={itemparams}
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
        //   )
        // }}
        renderItem={({item}) => {
          delayValue = delayValue + 700;
          const translateY = animatedValueTransform.interpolate({
            inputRange: [0, 1],
            outputRange: [delayValue, 1],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View style={{opacity, transform: [{translateY}]}}>
              <GeneralItemComponent item={item} />
            </Animated.View>
          );
        }}
      />
    </Root>
  );
};

export default ItemsByCategoryComponent;
