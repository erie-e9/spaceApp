import styled from 'styled-components/native';
import { getNormalizedVerticalSize } from '@utils/functions';
import { Typography } from '@components/atoms';
import { TextInput } from '@components/molecules';

export const ContentWrapper = styled.View`
  width: 100%;
`;

export const StyledInput = styled(TextInput)`
`;

export const Title = styled(Typography)`
  padding-bottom: ${getNormalizedVerticalSize(5)}px;
  text-align: center;
`;
