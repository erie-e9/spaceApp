import styled from 'styled-components/native';
import { Tappable } from '@components/atoms';

export const PanGestureHandlerView = styled.View`
  width: 55px;
  height: 5px;
  background-color: grey;
  align-self: center;
  margin-vertical: 15px;
  border-radius: 2px;
`;

export const CloseIconContainer = styled.View`
  position: absolute;
  right: -65px;
  top: 15px;
  font-size: 20px;
  width: 100px;
  height: 100px;
  font-weight: bold;
  z-index: 2;
`;

export const CloseBottomSheetButton = styled(Tappable)``;
