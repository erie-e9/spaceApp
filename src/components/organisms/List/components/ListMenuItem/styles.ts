import styled, { css } from 'styled-components/native';
import { Typography, Touchable } from '@components/atoms';

export const ListMenuItemRightSide = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ListMenuItemBadgeContainer = styled.View`
  align-items: flex-end;
  justify-content: center;
`;

export const MenuItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
`;

export const MenuItemContent = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

export const TouchableMenuItem = styled(Touchable)<{
    paddingHorizontal: number | undefined;
    isGreyed?: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 24px;
  margin: 2px 0px;
  padding-left: ${({ paddingHorizontal }) =>
    paddingHorizontal !== undefined ? `${paddingHorizontal}px` : '12px'};
  padding-right: ${({ paddingHorizontal }) =>
    paddingHorizontal !== undefined ? `${paddingHorizontal}px` : '12px'};
  padding-top: 6px;
  padding-bottom: 6px;
${({ isGreyed }) => (isGreyed ? 'opacity: 0.34' : '')};
`;

export const DescriptionText = styled(Typography)<{
    fontSize?: number;
    marginTop?: number;
}>`
  font-weight: 400;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}
  ${({ marginTop }) =>
    marginTop &&
    css`
      margin-top: ${marginTop}px;
    `}
`;