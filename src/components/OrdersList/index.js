import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {ETACard} from '@etaui';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const Touchable = styled.TouchableOpacity``;

const OrdersList = ({data}) => {
  const _onPress = (item) => {
    console.warn(item);
  };

  return (
    <Root>
      <FlatList
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        data={data.getOrders}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <Touchable key={item._id} onPress={() => _onPress(item)}>
              <ETACard {...item} />
            </Touchable>
          );
        }}
      />
    </Root>
  );
};

export default OrdersList;
