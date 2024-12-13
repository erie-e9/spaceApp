
import styled, { DefaultTheme } from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { screen_height, getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { ActionButton, List } from '@components/molecules';

export const BodyContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const LoaderContainer = styled.View`
    flex: 1;
    width: 100%;
    height: ${screen_height * 0.6}px;
    align-items: center;
    justify-content: center;
`;

export const ListItems = styled(List)``;

export const FeaturesContainer = styled.View`
    flex-direction: row;
    min-width: auto;
    /* justify-content: space-around; */
    justify-content: flex-end;
    background-color: transparent;
`;

export const FeatureButton = styled(ActionButton) <{
    backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}>`
    border-width: 0px;
    margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
    /* background-color: ${({ theme, backgroundColor }) => theme.tokens.colors[backgroundColor || 'tertiary200']}; */
`;

export const SwipeButton = styled.TouchableOpacity<{
    backgroundColor?: keyof DefaultTheme['tokens']['colors'];
}>`
    height: 100%;
    width: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 0px;
    opacity: 1;
    background-color: ${({ theme, backgroundColor }) => backgroundColor ? theme.tokens.colors[backgroundColor] : 'transparent'};
`;

export const AnimatedView = styled(Animated.View)`
    flex-direction: row;
`;

export const SwipeableFullContainer = styled.View`
    /* flex: 1;
    background-color: ${({ theme }) => theme.tokens.colors.primary500}; */
`;