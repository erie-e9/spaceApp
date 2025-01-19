
import styled, { DefaultTheme } from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { ActionButton, List } from '@components/molecules';

export const BodyContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const ListItems = styled(List)``;

export const FeaturesContainer = styled.View`
    flex-direction: row;


    justify-content: flex-end;
    background-color: transparent;
`;

export const FeatureButton = styled(ActionButton)`
    border-width: ${getNormalizedHorizontalSize(0)}px;
    margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
    /* background-color: ${({ theme }) => theme.tokens.colors.tertiary200}; */
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
