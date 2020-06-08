import React, {useState, useEffect, useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText, ETAButtonFilled} from '@etaui';
import {Ionicons, FontAwesome} from '@icons';

const {width} = Dimensions.get('window');

const Root = styled.View`
    flex: 0.7;
    flexDirection: column;
    width: ${width / 1.1}px;
    height: 260px;
    borderTopLeftRadius: 15px;
    borderTopRightRadius: 15px;
    borderBottomLeftRadius: 0px;
    borderBottomRightRadius: 0px;
    position: absolute;
    padding: 20px 20px;
    alignSelf: center;
    bottom: -2px;
    backgroundColor: ${props => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
    borderWidth: 0px;
    borderColor: ${props => props.theme.GRAYFACEBOOK};
`;
const ResumeContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: stretch;
    width: 100%;
    margin: 5px 0px 0px 0px;
    padding: 5px 10px;
    backgroundColor: transparent;
`;
const DirectionContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    width: 100%;
    height: 40px;
    marginVertical: 3px;
    paddingVertical: 5px;
    paddingHorizontal: 10px;
    borderWidth: 0px;
    borderColor: ${props => props.theme.GRAYFACEBOOK};
    backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const TotalContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: stretch;
    width: 100%;
    height: 40px;
    marginVertical: 3px;
    paddingVertical: 5px;
    paddingHorizontal: 10px;
    borderWidth: 0px;
    borderColor: ${props => props.theme.GRAYFACEBOOK};
    backgroundColor: transparent;
`;
const ResumeTotalContainer = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
    width: 100%;
    marginVertical: 3px;
    paddingVertical: 5px;
    
`;
const ButtonPayContainer = styled.View`
    height: 20px;
    width: 100%;
    alignItems: center;
`;

const CartDetailsComponent = () => {
    const themeContext = useContext(ThemeContext);
    const [ isSubmitting, setisSubmitting ] = useState(false);

    return (
        <Root>
            <ETASimpleText
                size={16}
                weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
                color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                align={'left'}>
                Summary (3 items)
            </ETASimpleText>
            <ResumeContainer>
                <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '500' : '400'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    Subtotal
                </ETASimpleText>
                
                <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '500' : '400'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    $100.00
                </ETASimpleText>
            </ResumeContainer>
            <ResumeContainer>
                <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '500' : '400'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    Shipping
                </ETASimpleText>
                
                <ETASimpleText
                    size={11}
                    weight={Platform.OS === 'ios' ? '500' : '400'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    $30.00
                </ETASimpleText>
            </ResumeContainer>
            <TotalContainer>                
                <ResumeTotalContainer>
                    <ETASimpleText
                        size={14}
                        weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'left'}>
                        Total
                    </ETASimpleText>
                    
                    <ETASimpleText
                        size={14}
                        weight={Platform.OS === 'ios' ? 'bold' : 'bold'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'left'}>
                        $130.00
                    </ETASimpleText>
                </ResumeTotalContainer>
            </TotalContainer>
            <DirectionContainer>
                <ETASimpleText
                    size={15}
                    weight={Platform.OS === 'ios' ? '800' : '800'}
                    color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                    align={'left'}>
                    Send to...
                </ETASimpleText>
            </DirectionContainer>
            <ButtonPayContainer>
                <ETAButtonFilled
                    title='Check out'
                    onPress={() => console.warn('Go to pay')}
                    disabled={isSubmitting ? true : false}
                    colorButton={themeContext.SECONDARY_BACKGROUND_COLOR}
                    padding={10}
                    width={isSubmitting ? 40 : 250}
                    borderRadius={isSubmitting ? 20 : 3}
                />
            </ButtonPayContainer>
        </Root>
    );
}

export default CartDetailsComponent;