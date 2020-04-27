import React, { useContext } from 'react';
import { TouchableWithoutFeedback, View, Alert, ScrollView } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import { Ionicons, FontAwesome, AntDesign, Octicons } from '@commons/Icons';
import { variables } from '@utils/constants';
import { Context } from '@context';

const avatarSize = 50;
const avatarRadius = avatarSize / 2;
const iconSize = 23;
const firstname = 'Scarlett';
const lastname = 'Johansson';
const info = '❝ Besame... las muestras publicas de afecto incomodan a las personas. (Black Widow) ❞'

const Root = styled.View`
    flex:1;
`;
const TName = styled.Text`
    fontSize: 14px;
    color: #333;
    fontWeight: bold;
`;
const T2 = styled.Text`
    fontSize: 14px;
    color: #434343;
`;
const Info = styled.Text`
    marginTop: 5px;
    fontSize: 14px;
    color: #8e897d;
`;
const Card = styled.View`
    flexDirection: row;
    backgroundColor: ${props => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
    marginBottom: 1px;
    minHeight: 40px;
    flex: 1;
    alignItems: center;
`;
const Spacevertical = styled.View`
    marginTop: 40px;
`;
const ProfileImage = styled.Image`
    height: ${avatarSize}px;
    width: ${avatarSize}px;
    borderRadius: ${avatarRadius}px;
    marginBottom: 15px;
    marginLeft: 5px;
    marginRight: 10px;
    opacity: 1;
    marginTop: 13px;
    justifyContent: center;
`;
const Metadata = styled.View`
    flex: 1;
    flexDirection: column;
    justifyContent: center;
    minHeight: 50px;
`;
const MetadataHeader = styled.View`
    flexDirection: column;
    justifyContent: center;
    minHeight: 100px;
    marginHorizontal: 5px;
`;
const MetadataInfo = styled.View`
    flexDirection: row;
    justifyContent: center;
    paddingHorizontal: 5px;
    marginRight: 50px;
    paddingRight: 40px;
`;

const SettingsScreen = ({ navigation }) => {
    const themeContext = useContext(ThemeContext);
    const { state, logOut, error } = useContext(Context);
    
    const logout = () => {
        logOut();
        Alert.alert('Log out', 'Adiós popo')
    }

    return (
        <Root>
            <ScrollView>
                <Spacevertical>
                    <Card>
                        <ProfileImage source={{uri: variables.AVATAR_USER_DEFAULT}} />
                        <MetadataHeader>
                            <TName>{firstname} {lastname}</TName>
                            <MetadataInfo>
                                <Info>{info}</Info>
                            </MetadataInfo>
                        </MetadataHeader>
                    </Card>
                    <Card>
                        <FontAwesome name='bell-o' size={iconSize-5} style={{color: '#777', margin: 15}}/>  
                        <Metadata>
                            <T2>Notifications</T2>
                        </Metadata>
                    </Card>
                    <Card>
                        <Ionicons name='ios-information-circle-outline' size={iconSize} style={{color: '#777', margin: 15}}/>  
                        <Metadata>
                            <T2>Help</T2>
                        </Metadata>
                    </Card>
                    <Card>
                        <AntDesign name='logout' size={iconSize-5} style={{color: '#777', margin: 15}}/>  
                        <Metadata>
                            <TouchableWithoutFeedback onPress={() => logout()}>
                                <View>
                                    <T2 style={{ color: themeContext.PRIMARY_COLOR }}>Log out</T2>
                                </View>
                            </TouchableWithoutFeedback>
                        </Metadata>
                    </Card>
                    <Spacevertical>
                        <Card>
                            <Octicons name='mail' size={iconSize} style={{color: '#777', margin: 15}}/>  
                        <Metadata>
                                <T2>Contact</T2>
                            </Metadata>
                        </Card>
                        <Card>
                            <Ionicons name='ios-heart' size={iconSize} style={{color: themeContext.PRIMARY_COLOR, margin: 15}}/>  
                            <Metadata>
                                <T2>About Us</T2>
                            </Metadata>
                        </Card>
                    </Spacevertical>
                </Spacevertical>
            </ScrollView>
        </Root>  
    );
}

export default SettingsScreen;