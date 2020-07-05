import React, {useState, useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import {Ionicons, Feather} from '@icons'

const {width} = Dimensions.get('window');

const Card = styled.View`
    flexDirection: row;
    width: ${ width - 20}px;
    minHeight: 70px;
    justifyContent: space-between;
    alignSelf: center;
    borderRadius: 5px
    padding: 10px;
    marginBottom: 5px;
    backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const MetadataInfo = styled.View`
    flex: 0.9;
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
const IconContainer = styled.View`
    flex: 0.1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: transparent;
`;

const AddressCardComponent = ({ headTitle, details, isDefault }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <Card>
                <MetadataInfo>
                    <MetadaInfoHead>
                        <ETASimpleText
                        size={13}
                        weight={Platform.OS === 'ios' ? '500' : '800'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'left'}>
                        {headTitle}
                        </ETASimpleText>                
                        {
                            isDefault
                            ?   <Ionicons name='ios-star' size={14} color={themeContext.STAR} style={{ marginHorizontal: 6 }} />
                            :   null
                        }
                    </MetadaInfoHead>
                    <ETASimpleText
                        size={11}
                        weight={Platform.OS === 'ios' ? '300' : '200'}
                        color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                        align={'left'}>
                        {details}
                    </ETASimpleText>
                </MetadataInfo>
                <IconContainer>
                    <Feather name='edit-2' size={15} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                </IconContainer>
            </Card>
        </>
    );
}

export default AddressCardComponent;
