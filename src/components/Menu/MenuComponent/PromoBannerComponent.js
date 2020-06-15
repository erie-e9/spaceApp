import React, {useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');
const Root = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
    padding: 10px 0px;
    marginBottom: 10px;
`;
const Item = styled.View`
    flexDirection: row;
    width: ${width - 50}px;
    height: 35px;
    borderRadius: 1px;
    borderWidth: 0.75px;
    borderColor: ${(props) => props.theme.GRAYFACEBOOK};
`;
const BannerLeft = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${props => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const BannerRight = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.SECONDARY_TEXT_BACKGROUND_COLOR};
`;

const PromoBannerComponent = () => {
    const themeContext = useContext(ThemeContext);

    return (
        <Root>
            <Item>
                <BannerLeft>
                    <ETASimpleText
                        size={10}
                        weight={Platform.OS === 'ios' ? '700' : 'bold'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        Weekly
                    </ETASimpleText>
                    <ETASimpleText
                        size={10}
                        weight={Platform.OS === 'ios' ? '400' : '400'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}
                        time={2000}>
                        offers
                    </ETASimpleText>
                </BannerLeft>
                <BannerRight>
                    <ETASimpleText
                        size={10}
                        weight={Platform.OS === 'ios' ? '700' : 'bold'}
                        color={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        Extra discount 
                    </ETASimpleText>
                    <ETASimpleText
                        size={9}
                        weight={Platform.OS === 'ios' ? '400' : '200'}
                        color={themeContext.PRIMARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        Code: JUN50
                    </ETASimpleText>
                </BannerRight>
                <BannerLeft>
                    <ETASimpleText
                        size={10}
                        weight={Platform.OS === 'ios' ? '700' : 'bold'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        Free shipping
                    </ETASimpleText>
                    <ETASimpleText
                        size={9}
                        weight={Platform.OS === 'ios' ? '400' : 'bold'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        First order
                    </ETASimpleText>
                </BannerLeft>
            </Item>
        </Root>
    );
}

export default React.memo(PromoBannerComponent);