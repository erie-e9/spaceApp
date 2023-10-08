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
  padding: ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 10 : 10)}px 0
    ${getNormalizedVerticalSize(Platform.OS === 'ios' ? 0 : 0)}px 0;
  background-color: ${({ theme }) => theme.tokens.colors.none};
`;

export default memo(StyledSafeAreaView);
