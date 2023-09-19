import styled from 'styled-components/native';
import { Typography } from '@components/atoms';

export const BodyContainer = styled.View`
  flex: 1;
  padding: 0px 0px;
  align-items: center;
`;

export const TitleText = styled(Typography)<{
  underline?: boolean;
  isGreyed?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ isGreyed }) => (isGreyed ? 0.34 : 1)};
`;

export const DescriptionContainer = styled.View`
  padding-vertical: 10px;
`;
export const SubdescriptionContainer = styled.View`
  padding-top: 15px;
`;
