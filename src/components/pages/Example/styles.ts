import styled from 'styled-components/native';
import { ActionButton, Typography } from '@components/atoms';
import { Platform } from 'react-native';

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})`
  padding-bottom: ${Platform.OS === 'ios' ? 20 : 7}px;
`;

export const HeaderContainer = styled.View`
  flex: 1;
  flex-grow: 1;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const BodyContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  width: 100%;
  padding: 0px 20px;
`;

export const BrandCircleContainer = styled.View<{
  darkMode: boolean;
}>`
  position: absolute;
  height: 250px;
  width: 250px;
  background-color: ${({ darkMode }) => (darkMode ? '#000000' : '#DFDFDF')};
  border-radius: 140px;
`;

export const Brand = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 200px;
  height: 200px;
`;

export const ContentContainer = styled.View``;

export const TitleContainer = styled.View`
  margin: 5px 0px 10px 0px;
`;

export const DescriptionContainer = styled.View`
  margin: 15px 0px 10px 0px;
`;

export const StyledTypography = styled(Typography)<{
  underline?: boolean;
}>`
  text-decoration: ${({ underline }) => (underline ? 'underline' : 'none')};
`;

export const FeaturesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const FeatureButton = styled(ActionButton)``;

export const FeatureIcon = styled.Image`
  tint-color: ${({ theme }) => theme.tokens.colors.opposing};
`;

export const BrandDecorItem1 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: -30%;
  left: 0;
  z-index: 0;
`;

export const BrandDecorItem2 = styled.View`
  position: absolute;
  height: 300px;
  width: 300px;
  align-items: center;
  justify-content: center;
  /* transform: translateY(40); */
`;

export const BrandDecorItem3 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
`;

export const BrandDecorItem4 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: -5%;
  right: 0;
`;

export const BrandDecorItem5 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: 15%;
  right: 20px;
`;

export const BrandDecorItem6 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  bottom: -10%;
  right: 0;
`;

export const BrandDecorItem7 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: 75%;
  right: 0;
`;

export const BrandDecorItem8 = styled.Image.attrs({
  resizeMode: 'contain',
})`
  position: absolute;
  top: 60%;
  right: 0;
`;
