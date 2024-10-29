import styled from 'styled-components/native';
import { getNormalizedVerticalSize } from '@utils/functions';

export const BodyContainer = styled.View`
  height: ${getNormalizedVerticalSize(150)}px;
  width: 100%;
  align-content: center;
  justify-content: flex-start;
`;
