import React, {useState, useEffect, useContext} from 'react';
import {Animated} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import CartItemComponent from './CartItemComponent';
import cartItems from '@utils/cartItems.json';

const Root = styled.View`
    flex: 0.58;
    justifyContent: center;
    alignItems: center;
    backgroundColor: transparent;
`;
const CategorytItemsList = styled.FlatList``;

const CartListComponent = () => {
    const themeContext = useContext(ThemeContext);
    const [ animatedValueTransform ] = useState(new Animated.Value(0.7));
    const [ items, setitems ] = useState([]);
    const [ opacity ] = useState(new Animated.Value(0));
    let delayValue = 1000;

    useEffect(() => {
        setitems(cartItems.data);
        console.warn('cartItems.data length', items.length);
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
    }, []);

    return (
        <Root>
            <CategorytItemsList
                contentContainerStyle={{
                    flexDirection: 'column',
                }}
                data={items}
                keyExtractor={(item) => item._id.toString()}
                horizontal={!true}
                // numColumns={2}
                initialNumToRender={5}
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
                        <Animated.View style={{ opacity, transform: [{ translateY }]}}>
                            <CartItemComponent item={item} />
                        </Animated.View>
                    );
                }}
            />
        </Root>
    );
}

export default CartListComponent;