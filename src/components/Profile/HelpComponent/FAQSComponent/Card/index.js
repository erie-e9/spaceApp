import React, {useState, useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components/native';
import {ETASimpleText} from '@etaui';
import {EvilIcons} from '@icons'

const {width} = Dimensions.get('window');
const iconSize = 23;

const Card = styled.View`
    flexDirection: row;
    width: ${width}px;
    minHeight: 50px;
    justifyContent: space-between;
    alignSelf: center;
    alignItems: center;
    borderRadius: 5px
    marginBottom: 1px;
    backgroundColor: ${(props) => props.theme.THIRD_BACKGROUND_COLOR_LIGHT};
`;
const MetadataInfo = styled.View`
    flex: 1;
    width: 100%;
    flexDirection: column;
    justifyContent: flex-start;
    paddingBottom: 5px;
    backgroundColor: transparent;
`;
const MetadaInfoHead = styled.View`
    minHeight: 20px;
    width: ${width}px;
    flexDirection: row;
    justifyContent: flex-start;
    alignItems: center;
    paddingHorizontal: 10px;
    paddingRight: 50px;
    backgroundColor: transparent;
`;
const IconContainer = styled.View`
    justifyContent: center;
    alignItems: center;
    paddingRight: 5px;
    backgroundColor: transparent;
`;
const MetadaAnswerContainer = styled.View`
    minHeight: 20px;
    width: ${width - 30}px;
    flexDirection: row;
    justifyContent: flex-start;
    alignItems: center;
    paddingLeft: 40px;
    paddingTop: 5px;
    backgroundColor: transparent;
`;


const AddressCardComponent = ({ question, answer }) => {
    const themeContext = useContext(ThemeContext);

    return (
        <>
            <Card>
                <MetadataInfo>
                    <MetadaInfoHead>
                        <IconContainer>
                            <EvilIcons name='question' size={iconSize} color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}/>
                        </IconContainer>
                        <ETASimpleText
                            size={13}
                            weight={Platform.OS === 'ios' ? '500' : '800'}
                            color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                            align={'left'}>
                            {question}
                        </ETASimpleText>
                    </MetadaInfoHead>
                    <MetadaAnswerContainer>
                        <ETASimpleText
                            size={11}
                            weight={Platform.OS === 'ios' ? '300' : '200'}
                            color={themeContext.PRIMARY_TEXT_COLOR_LIGHT}
                            align={'left'}>
                            {answer}
                        </ETASimpleText>
                    </MetadaAnswerContainer>
                </MetadataInfo>
            </Card>
        </>
    );
}

export default AddressCardComponent;
