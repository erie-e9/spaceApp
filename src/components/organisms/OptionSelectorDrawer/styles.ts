import styled from 'styled-components/native';
import { List } from '@components/molecules';

export const OptionSelectorList = styled(List)``;

export const BodyContainer = styled.View<{
  centered?: boolean;
}>`
  flex: 1;
  align-content: center;
  justify-content: center;
`;
