import styled from 'styled-components/native';
import { Typography } from '@components/atoms';

export const ToastBodyContainer = styled.View`
  bottom: 2px;
  top: 18px;
  padding: 10px 10px;
`;

export const ToastTextContainer = styled.View`
  align-items: center;
  min-height: 10px;
`;

export const ToastText = styled(Typography)``;

export const IconContainer = styled.View`
  height: 25px;
  width: 25px;
  position: absolute;
  bottom: 10px;
  left: 15px;
  justify-content: center;
  align-content: center;
  border-radius: 7px;
  background-color: #333;
`;
