
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { getNormalizedVerticalSize, getNormalizedHorizontalSize } from '@utils/functions';
import { Typography } from '@components/atoms';

export const Container = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
`;

export const AnimatedMenu = styled(Animated.View)`
    z-index: 999;
    position: absolute;
    width: ${getNormalizedHorizontalSize(150)}px;
    right: 0;
    top: ${getNormalizedVerticalSize(100)}px;
    border-radius: 8px;
    padding: ${getNormalizedVerticalSize(10)}px 0;
    background-color: ${({ theme }) => `${theme.tokens.colors.tertiary100}`};
`;

export const MenuItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    padding: ${getNormalizedVerticalSize(12)}px ${getNormalizedHorizontalSize(16)}px;
`;

export const MenuItemTextContainer = styled.View`
    padding: 0px 0px 0px ${getNormalizedHorizontalSize(10)}px;
`;

export const MenuItemText = styled(Typography)`
`;