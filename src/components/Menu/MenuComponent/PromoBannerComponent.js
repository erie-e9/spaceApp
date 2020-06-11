import React, {useContext} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled, {ThemeContext} from 'styled-components';
import {ETASimpleText} from '@etaui';

const {width} = Dimensions.get('window');
const Root = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: transparent;
  padding: 10px 0px;
`;
const Item = styled.View`
    flexDirection: row;
    width: ${width - 55}px;
    height: 32px;
    borderRadius: 5px;
    borderWidth: 0px;
    borderColor: ${(props) => props.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
`;
const BannerLeft = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
    backgroundColor: ${(props) => props.theme.FOURTH_BACKGROUND_COLOR_LIGHT};
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
                        size={11}
                        weight={Platform.OS === 'ios' ? '700' : '200'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        Week offers
                    </ETASimpleText>
                    <ETASimpleText
                        size={9}
                        weight={Platform.OS === 'ios' ? '400' : '200'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        -30%, -40% and -75%
                    </ETASimpleText>
                </BannerLeft>
                <BannerRight>
                    <ETASimpleText
                        size={11}
                        weight={Platform.OS === 'ios' ? '700' : '200'}
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
                        size={11}
                        weight={Platform.OS === 'ios' ? '700' : '200'}
                        color={themeContext.SECONDARY_TEXT_BACKGROUND_COLOR}
                        align={'center'}>
                        Free shipping
                    </ETASimpleText>
                    <ETASimpleText
                        size={9}
                        weight={Platform.OS === 'ios' ? '400' : '200'}
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