import React, {useState, useContext} from 'react';
import {Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';
import {Ionicons, FontAwesome} from '@icons';
import GeneralItemComponent from '@components/Menu/GeneralItemComponent';

const {width} = Dimensions.get('window');

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const Touchable = styled.TouchableOpacity`
  zIndex: 100;
`;
const CategorytItems = styled.FlatList``;

const AllItemsComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const route = useRoute();
  const { allitems } = route.params.params;

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
        data={allitems}
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
        ListFooterComponent={() => {
          return (
            <ETASimpleText
              size={7}
              weight={Platform.OS === 'ios' ? '500' : '300'}
              color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
              align={'left'}>
              Go to up
          </ETASimpleText>
          )
        }}
        renderItem={({item}) => <Touchable key={item._id} onPress={() => _onPressItem(item)}><GeneralItemComponent item={item} /></Touchable>}
      />
    </Root>
  );
}

export default AllItemsComponent;