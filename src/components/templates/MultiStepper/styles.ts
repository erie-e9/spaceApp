import styled from 'styled-components/native';
import { getNormalizedVerticalSize } from '@utils/functions';
import { List } from '@components/molecules';

export const StyledContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

export const StepContainer = styled.View`
  flex: 1;
  min-height: ${getNormalizedVerticalSize(150)}px;
  justify-content: flex-start;
  align-items: center;
`;

export const StepItemContainer = styled.View`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: transparent;
  width: 100%;
`;

export const StyledList = styled(List)``;
