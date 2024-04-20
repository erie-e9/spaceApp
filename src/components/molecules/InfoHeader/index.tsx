import React, { memo } from 'react';
import { Platform } from 'react-native';
import { useCopy } from '@services';
import { useTheme } from '@hooks';
import {
  ContentHeader,
  LogoContainer,
  Logo,
  ContentContainer,
  StyledText,
} from './styles';

const logoSize = 70;
const avatarRadius = 100;

export const InfoHeader: React.FC = () => {
  const { getCopyValue } = useCopy();
  const { Images } = useTheme();

  return (
    <ContentHeader>
      <LogoContainer logoSize={logoSize} avatarRadius={avatarRadius}>
        <Logo
          source={Images.logo}
          logoSize={logoSize}
          avatarRadius={avatarRadius}
        />
      </LogoContainer>
      <ContentContainer>
        <StyledText type="Headline5" weight="bold" textAlign="center">
          {process.env.APP_NAME}
        </StyledText>
        <StyledText weight={Platform.OS === 'ios' ? 300 : 300} textAlign="left">
          {getCopyValue('company slogan')}
        </StyledText>
      </ContentContainer>
    </ContentHeader>
  );
};

export default memo(InfoHeader);
