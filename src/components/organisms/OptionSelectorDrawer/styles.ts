import styled from 'styled-components/native';
import { getNormalizedHorizontalSize } from '@utils/functions';
import { List } from '@components/molecules';

export const OptionSelectorList = styled(List)``;

export const BodyContainer = styled.View<{
  centered?: boolean;
}>`
  height: auto;
  width: ${getNormalizedHorizontalSize(300)}px;
  align-items: center;
  justify-content: space-between;
`;
