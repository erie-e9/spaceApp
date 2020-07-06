import React, {useState, useEffect, useContext, memo} from 'react';
import styled, {ThemeContext} from 'styled-components';
import {Dimensions, Animated, Platform} from 'react-native';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: transparent;
`;
const SuggestionItemsContainer = styled.View`
  flex-direction: column;
  height: 90px;
  width: ${width}px;
  justify-content: center;
  position: absolute;
  align-items: flex-start;
  z-index: 10;
  background-color: transparent;
`;
const SuggestionItemsList = styled.FlatList`
  width: ${width}px;
`;
const Touchable = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;
const SuggestionItem = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border-width: 0px;
  border-color: ${(props) => props.theme.PRIMARY_TEXT_COLOR_LIGHT};
  background-color: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
  margin: 2px 7px;
  justify-content: center;
  align-items: center;
`;
const SuggestionItemImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const SuggestionsComponent = ({selectedItemName}) => {
  const themeContext = useContext(ThemeContext);
  const [items] = useState([{}]);
  const [animatedValueTransform] = useState(new Animated.Value(0.9));
  let delayValue = 1000;

  useEffect(() => {
    Animated.spring(animatedValueTransform, {
      toValue: 1,
      tension: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animatedValueTransform.interpolate({
    inputRange: [0, 1],
    outputRange: [delayValue, 1],
  });

  return (
    <Root>
      <SuggestionItemsContainer>
        {items && items.length > 0 ? (
          <>
            <Animated.View style={{left: 10, transform: [{translateY}]}}>
              <ETASimpleText
                size={12}
                weight={Platform.OS === 'ios' ? '400' : '500'}
                // color='white'
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'center'}>
                Similar to {selectedItemName}
              </ETASimpleText>
            </Animated.View>
            <SuggestionItemsList
              data={[
                {
                  key: 1,
                  _id: 1,
                  name: 'Banana Split Dazzler',
                  details:
                    'Vanilla ice cream layered with bananas, pineapple, strawberry and hot fudge  ice cream layered with bananas, pineapple, strawberry and hot fudge topped with whipped cream and a cherry. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-BSDDazzler_Olo_0.png',
                    },
                  ],
                },
                {
                  key: 2,
                  _id: 2,
                  name: 'Cookies & Cream Dazzler',
                  details:
                    'Cookies and cream ice cream layered with hot fudge and chocolate cookie pieces topped with whipped cream and cookie crunch. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-hd-dazzler-cookies-n-cream.png',
                    },
                  ],
                },
                {
                  key: 3,
                  _id: 3,
                  name: 'Dulce de Leche Dazzler',
                  details:
                    'Dulce de leche ice cream layered cream layered with bananas and warm caramel topped with whipped cream caramel. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-hd-dazzler-dulce-de-leche.png',
                    },
                  ],
                },
                {
                  key: 4,
                  _id: 4,
                  name: 'Midnight Cookies & Cream Dazzler',
                  details:
                    'Midnight cookies and cream ice cream layered with hot fudge and chocolate cookie pieces topped with whipped cream and hot fudge. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-hd-dazzler-midnight-cookies-n-cream.png',
                    },
                  ],
                },
                {
                  key: 5,
                  _id: 5,
                  name: 'Mint Chip Dazzler',
                  details:
                    'Mint chip ice cream layered with hot fudge and chocolate cookie pieces topped with whipped cream and chocolate sprinkles. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-hd-dazzler-mint-chip%20%281%29.png',
                    },
                  ],
                },
                {
                  key: 6,
                  _id: 6,
                  name: 'Rocky Road Dazzler',
                  details:
                    'Rocky road ice cream layered with hot fudge and chocolate cookie pieces topped with whipped cream and chocolate cookie crunch. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-hd-dazzler-rocky-road_0.png',
                    },
                  ],
                },
                {
                  key: 7,
                  _id: 7,
                  name: 'Belgian Chocolate Shake',
                  details:
                    'RBelgian chocolate ice cream surrounded by ribbons of hot fudge topped with whipped cream and chocolate sprinkles. Served with toppings.',
                  images: [
                    {
                      image:
                        'https://www.haagendazs.us/sites/site.prod1.haagendazs.us/files/shop-specialities/sept-2019-hd-shake-belgian-chocolate.png',
                    },
                  ],
                },
              ]}
              keyExtractor={(item) => item._id.toString()}
              horizontal
              snapToAlignment="center"
              scrollEventThrottle={16}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                delayValue = delayValue + 1000;
                const translateX = animatedValueTransform.interpolate({
                  inputRange: [0, 1],
                  outputRange: [delayValue, 1],
                  extrapolate: 'clamp',
                });
                return (
                  <Touchable
                    key={item._id}
                    onPress={() => console.log('ñeñe ñeñe ñeñe')}>
                    <Animated.View style={{transform: [{translateX}]}}>
                      <SuggestionItem>
                        <SuggestionItemImage
                          source={{uri: item.images[0].image}}
                        />
                      </SuggestionItem>
                      {/* <ETASimpleText
                        size={9}
                        weight={Platform.OS === 'ios' ? '400' : '200'}
                        // color='white'
                        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                        align={'center'}>
                        {item.name}
                      </ETASimpleText> */}
                    </Animated.View>
                  </Touchable>
                );
              }}
            />
          </>
        ) : null}
      </SuggestionItemsContainer>
    </Root>
  );
};

export default memo(SuggestionsComponent);
