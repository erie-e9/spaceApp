import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { getNormalizedVerticalSize } from '@utils/functions';

export const Container = styled.View`
  width: 35%;
  height: ${getNormalizedVerticalSize(3)}px;
  overflow: hidden;
  border-color: ${({ theme }) => theme.tokens.colors.secondary950};
  border-width: 0.3px;
  border-radius: 10px;
  justify-content: center;
`;

export const StrengthBar = styled(Animated.View)`
  height: 100%;
  border-radius: 10px;
`;
