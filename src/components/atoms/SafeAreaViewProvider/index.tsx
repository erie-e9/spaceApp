import { memo } from 'react';
import styled from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const StyledSafeAreaViewProvider = styled(SafeAreaProvider)`
  flex: 1;
`;

export default memo(StyledSafeAreaViewProvider);
