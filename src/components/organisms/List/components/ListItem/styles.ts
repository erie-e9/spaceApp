import { View } from 'react-native';
import styled from 'styled-components/native';

export const ContainerWithOutPress = styled(View)`
  height: 88px;
  flex-direction: row;
  padding: 0 24px;
  align-items: center;
`;

export const TextContainer = styled(View)`
  flex: 1;
  margin-left: 16px;
  justify-content: center;
  font-size: 14px;
  line-height: 20.56px;
  font-weight: 500;
  height: auto;
  width: 100%;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RightContainer = styled.View`
  position: absolute;
  right: 24px;
  height: 100%;
  justify-content: center;
`;

export const StyledSafeAreaView = styled.View`
  position: relative;
`;
