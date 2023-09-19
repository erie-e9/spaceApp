import { Typography, ActionButton } from '@components/atoms';
import { PixelRatio, Platform } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${Platform.OS === 'ios' ? 35 : 20}px 20px
    ${Platform.OS === 'ios' ? 20 : 7}px 20px;
`;

export const ButtonContainer = styled.View``;

export const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

export const BodyContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.View`
  padding: 20px 0px 10px 0px;
`;

export const StyledActionButton = styled(ActionButton)<{ isGreyed?: boolean }>`
  margin: ${PixelRatio.roundToNearestPixel(2)}px
    ${PixelRatio.roundToNearestPixel(10)}px
    ${PixelRatio.roundToNearestPixel(2)}px
    ${PixelRatio.roundToNearestPixel(10)}px;
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const LegendActionButton = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

export const TitleTypography = styled(Typography)``;

export const IconContainer = styled.View<{
  iconSpacing: string;
}>`
  justify-content: center;
  align-items: center;
  min-height: ${({ iconSpacing }) => iconSpacing || '200px;'};
`;
