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
    flexDirection: column;
    backgroundColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const PaymentMethodsList = styled.FlatList`
    flexDirection: column;
    padding: 10px 10px;
`;
const Touchable = styled.TouchableOpacity``;
const Card = styled.View`
    flexDirection: row;
    width: ${ width - 20}px;
    minHeight: 80px;
    justifyContent: center;
    alignSelf: center;
    backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    borderRadius: 5px
    padding: 10px;
    marginBottom: 5px;
`;
const MetadataInfo = styled.View`
    width: 100%;
    flexDirection: column;
    justifyContent: flex-start;
    paddingBottom: 5px;
    backgroundColor: transparent;
`;
const MetadaInfoHead = styled.View`
    flexDirection: row;
    justifyContent: flex-start;
    alignItems: center;
    backgroundColor: transparent;
`;
const CompanyIconContainer = styled.View`
    paddingHorizontal: 10px;
`;

const PaymentMethodsListComponent = () => {
    const themeContext = useContext(ThemeContext);
    const navigation = useNavigation();
    const [ items, setitems ] = useState(cards.data);
    const [ refresher, setrefresher ] = useState(!true)
    
    const _onPress = (item) => {
        navigation.navigate('SettingsNavigator', {
          screen: 'GetOnePaymentMethodScreen',
          params: {
            item: item
          }
        });
    };

    useEffect(() => {
        // setchats(data.getChats)
        _getData()
    }, [])
    
    const _getData = () => {
        setrefresher(true)
        setrefresher(!true)
    }

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
                                                name='md-cash'
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
}

export default PaymentMethodsListComponent;
