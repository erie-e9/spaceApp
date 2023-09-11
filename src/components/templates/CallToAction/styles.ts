import { Typography, ActionButton } from '@components/atoms';
import { PixelRatio } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.tokens.colors.none};
`;

export const ButtonContainer = styled.View`
  padding-bottom: 20px;
  margin: ${PixelRatio.roundToNearestPixel(4)}px
    ${PixelRatio.roundToNearestPixel(25)}px;
`;

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
  padding: 50px 30px;
`;

export const StyledActionButton = styled(ActionButton)<{ isGreyed?: boolean }>`
  margin: ${PixelRatio.roundToNearestPixel(4)}px
    ${PixelRatio.roundToNearestPixel(25)}px;
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const LegendActionButton = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
`;

export const TitleTypography = styled(Typography)`
  text-align: left;
`;

export const IconContainer = styled.View<{
  iconSpacing: string;
}>`
  justify-content: center;
  align-items: center;
  min-height: ${({ iconSpacing }) => iconSpacing || '200px;'};
`;
