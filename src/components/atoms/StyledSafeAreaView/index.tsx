import { memo } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getNormalizedVerticalSize } from '@utils/functions';

interface Props {
  isOpacity?: boolean;
}

export const StyledSafeAreaView = styled(SafeAreaProvider)<Props>`
  flex: 1;
  padding: ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 35 : 20)}px 0
    ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 13 : 7)}px 0;
  background-color: ${({ theme }) => theme.tokens.colors.none};
`;

export default memo(StyledSafeAreaView);
