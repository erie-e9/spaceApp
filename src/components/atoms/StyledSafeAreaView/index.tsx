import { memo } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface Props {
  isOpacity?: boolean;
}

export const StyledSafeAreaView = styled(SafeAreaProvider)<Props>`
  flex: 1;
`;

export default memo(StyledSafeAreaView);
