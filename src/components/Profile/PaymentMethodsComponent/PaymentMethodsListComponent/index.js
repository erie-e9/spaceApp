import React, {useState, useEffect, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {Platform, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ETASimpleText} from '@etaui';
import {Ionicons} from '@icons';
import PaymentCardComponent from './Card';
import cards from '@utils/cards.json';

const {width} = Dimensions.get('window');
const iconSize = 26;

const Root = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const PaymentMethodsList = styled.FlatList`
  flex-direction: column;
  padding: 10px 10px;
`;
const Touchable = styled.TouchableOpacity``;
const Card = styled.View`
    flex-direction: row;
    width: ${width - 20}px;
    min-height: 80px;
    justify-content: center;
    align-self: center;
    background-color: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    border-radius: 5px
    padding: 10px;
    margin-bottom: 5px;
`;
const MetadataInfo = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 5px;
  background-color: transparent;
`;
const MetadaInfoHead = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
`;
const CompanyIconContainer = styled.View`
  padding-horizontal: 10px;
`;

const PaymentMethodsListComponent = () => {
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [items] = useState(cards.data);
  const [refresher, setrefresher] = useState(!true);

  const _onPress = (item) => {
    navigation.navigate('SettingsNavigator', {
      screen: 'GetOnePaymentMethodScreen',
      params: {
        item: item,
      },
    });
  };

  useEffect(() => {
    // setchats(data.getChats)
    _getData();
  }, []);

  const _getData = () => {
    setrefresher(true);
    setrefresher(!true);
  };

  return (
    <Root>
      <PaymentMethodsList
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        data={items}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshing={refresher}
        onRefresh={() => _getData()}
        renderItem={({item}) => {
          return (
            <Touchable key={item._id} onPress={() => _onPress(item)}>
              <PaymentCardComponent {...item} />
            </Touchable>
          );
        }}
        ListFooterComponent={() => {
          return (
            <Touchable>
              <Card>
                <MetadataInfo>
                  <MetadaInfoHead>
                    <ETASimpleText
                      size={13}
                      weight={Platform.OS === 'ios' ? '500' : '800'}
                      color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                      align={'left'}>
                      Cash
                    </ETASimpleText>
                    <CompanyIconContainer>
                      <Ionicons
                        name="md-cash"
                        size={iconSize - 6}
                        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                      />
                    </CompanyIconContainer>
                  </MetadaInfoHead>
                  <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '300' : '200'}
                    color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                    align={'left'}>
                    You can pay with cash too
                  </ETASimpleText>
                </MetadataInfo>
              </Card>
            </Touchable>
          );
        }}
      />
    </Root>
  );
};

export default PaymentMethodsListComponent;
