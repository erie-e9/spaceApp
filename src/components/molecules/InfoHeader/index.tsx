import React, { memo } from 'react';
import { useTheme } from '@hooks';
import { ContentHeader, LogoContainer, Logo, ContentContainer, StyledText } from './styles';

const logoSize = 70;
const avatarRadius = 100;

export const InfoHeader: React.FC = () => {
  const { Images } = useTheme();

  return (
    <ContentHeader>
      <LogoContainer logoSize={logoSize} avatarRadius={avatarRadius}>
        <Logo source={Images.logo} logoSize={logoSize} avatarRadius={avatarRadius} />
      </LogoContainer>
      <ContentContainer>
        <StyledText type="Headline2" textAlign="center" color="secondary950">
          {process.env.APP_NAME}
        </StyledText>
        <StyledText textAlign="left" color="secondary700">
          {process.env.APP_SLOGAN}
        </StyledText>
      </ContentContainer>
    </ContentHeader>
  );
};

export default memo(InfoHeader);
