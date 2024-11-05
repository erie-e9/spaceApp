import React, { memo, useCallback } from 'react';
import { BackButton } from '@components/molecules';
import { useNavigation } from '@react-navigation/native';
import { type ApplicationScreenProps } from '@types';
import {
  HeaderContainer,
  BackButtonContainer,
  HeaderWrapper,
  HeaderRightContainer,
  HeaderLeftCotainer,
  TitleText,
  TitleTextContainer,
  DescriptionContainer,
  DescriptionText,
} from './styles';

export interface HeaderTemplateProps {
  title: string;
  description?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  backButton?: boolean;
  pressTitle?: 'back' | 'scrollUp';
  headerStyle?: 'Primary' | 'Secondary';
  headerOptions?: JSX.Element | React.ReactNode;
  pressTitleHandler?: () => void;
}

export const HeaderTemplate: React.FC<HeaderTemplateProps> = ({
  title,
  description,
  adjustsFontTitle,
  numberOfLinesTitle,
  backButton,
  pressTitle,
  headerStyle = 'Primary',
  headerOptions,
  pressTitleHandler,
}) => {
  const navigation: ApplicationScreenProps = useNavigation();
  const onPressTitleHandler = useCallback(() => {
    if (pressTitle && !pressTitleHandler) {
      if (pressTitle === 'back') {
        navigation.goBack();
      } else if (pressTitle === 'scrollUp') {
      }
    } else if (pressTitleHandler && !pressTitle) {
      pressTitleHandler();
    }
  }, [pressTitle, pressTitleHandler]);

  return (
    <HeaderContainer headerStyle={headerStyle}>
      <HeaderWrapper>
        <HeaderLeftCotainer hasHeaderOptions={!!headerOptions}>
          {backButton && (
            <BackButtonContainer headerStyle={headerStyle}>
              <BackButton size={30} />
            </BackButtonContainer>
          )}
          {title && (
            <TitleTextContainer headerStyle={headerStyle} backButton={backButton}>
              <TitleText
                type={headerStyle === 'Primary' ? 'Headline3' : 'Subtitle1'}
                adjustsFontSizeToFit={adjustsFontTitle}
                numberOfLines={numberOfLinesTitle}
                color="typography950"
                firstCapitalized
                onPress={onPressTitleHandler}
              >
                {title}
              </TitleText>
            </TitleTextContainer>
          )}
        </HeaderLeftCotainer>
        {headerOptions && <HeaderRightContainer>{headerOptions}</HeaderRightContainer>}
      </HeaderWrapper>
      {description && (
        <DescriptionContainer headerStyle={headerStyle}>
          <DescriptionText type="Subtitle2" color="typography800" font="Primary" textAlign="left">
            {description}
          </DescriptionText>
        </DescriptionContainer>
      )}
    </HeaderContainer>
  );
};

export default memo(HeaderTemplate);
