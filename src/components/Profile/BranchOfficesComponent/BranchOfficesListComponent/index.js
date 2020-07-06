import React, {useState, useEffect, useContext} from 'react';
import styled, {ThemeContext} from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';
import branchOffices from '@utils/branchOffices.json';

const Root = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
`;
const BranchOfficesList = styled.FlatList`
    flex-direction: column;
    padding: 10px 10px;
`;
const Touchable = styled.TouchableOpacity``;

const BranchOfficesListComponent = () => {
    const themeContext = useContext(ThemeContext);
    const navigation = useNavigation();
    const [ items, setitems ] = useState([])
    const [ refresher, setrefresher ] = useState(!true)
    
    useEffect(() => {
        setitems(branchOffices.data);
        _getData();
    }, []);

    const _onPress = (item) => {
        navigation.navigate('SettingsNavigator', {
            screen: 'MapBranchOfficesScreen',
            params: {
                data: item
            }
        });
    };
    
    const _getData = () => {
        setrefresher(true);
        setitems(branchOffices.data);
        setrefresher(!true);
    }

    return (
        <Root>
            <BranchOfficesList
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
                            <Card {...item} />
                        </Touchable>
                    );
                }}
            />
        </Root>
    );
}

export default BranchOfficesListComponent;
