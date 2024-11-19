import styled from 'styled-components/native';
import {
  getNormalizedVerticalSize,
  getNormalizedHorizontalSize,
} from '@utils/functions';
import { ActionButton, TextInput } from '@components/molecules';

export const BodyContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
  align-items: center;
`;

export const StyledInput = styled(TextInput)`
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
  margin: ${getNormalizedVerticalSize(5)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const FeaturesContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;

export const FeatureButton = styled(ActionButton)`
    border-width: 0px;
    margin: ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px
    ${getNormalizedVerticalSize(0)}px ${getNormalizedHorizontalSize(0)}px;
`;

export const RowContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const RowItemContainer = styled.View`
  width: 48%;
`;
