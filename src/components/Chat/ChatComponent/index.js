import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ChatCard from './ChatCard';

const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
const Touchable = styled.TouchableOpacity``;

const ChatComponent = ({data}) => {
  const navigation = useNavigation();
  const [chats, setchats] = useState([])
  const [refresher, setrefresher] = useState(!true)
  
  const _onPress = (item) => {
    
    navigation.navigate('ChatItemScreen', {
      screen: 'ChatScreen',
      params: {
        item: item
      }
    });
  };

  useEffect(() => {
    setchats(data.getChats)
    _getData()
  }, [])
  
  const _getData = () => {
    console.log('getting data...');      
    setrefresher(true)
    setchats(data.getChats)
    setrefresher(!true)
  }

  return (
    <Root>
      <FlatList
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        data={chats}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={refresher}
        onRefresh={() => _getData()}
        renderItem={({item}) => {
          return (
            <Touchable key={item._id} onPress={() => _onPress(item)}>
              <ChatCard {...item} />
            </Touchable>
          );
        }}
      />
    </Root>
  );
};

export default ChatComponent;
