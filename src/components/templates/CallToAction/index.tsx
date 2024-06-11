import React, { memo, useLayoutEffect } from 'react';
import { useCopy } from '@services';
import { useNavigation } from '@react-navigation/core';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { useTheme } from '@hooks';
import { InterpolateColorAnimation } from '@components/animated';
import { BackButton } from '@components/molecules';
import { ActionButtonProps } from '@components/molecules/ActionButton';
import {
  StyledContainer,
  HeaderContainer,
  TitleContainer,
  TitleTypography,
  DescriptionContainer,
  DescriptionText,
  BodyContainer,
  ButtonsContainer,
  StyledButton,
  LegendActionButton,
  ArrayButtonsContainer,
  ArrayButtonContainer,
  ArrayFooterTextContainer,
  ArrayFooterText,
} from './styles';

interface Props {
  testID?: string;
  title?: string;
  description?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  body: JSX.Element;
  bodyTestID?: string;
  primaryButton?: ActionButtonProps;
  secondaryButton?: ActionButtonProps;
  tertiaryButton?: ActionButtonProps;
  arrayInlineButtons?: Array<ActionButtonProps> | undefined;
  arrayInlineButtonsFooterText?: JSX.Element | string | undefined;
  footer?: JSX.Element;
  backButton?: boolean;
}

const CallToAction: React.FC<Props> = ({
  testID = 'CallToActionID',
  title = undefined,
  description = undefined,
  adjustsFontTitle = false,
  numberOfLinesTitle = 1,
  body,
  bodyTestID = undefined,
  primaryButton = undefined,
  secondaryButton = undefined,
  tertiaryButton = undefined,
  arrayInlineButtons = undefined,
  arrayInlineButtonsFooterText = undefined,
  footer = undefined,
  backButton = false,
}) => {
  const { getCopyValue } = useCopy();
  const { darkMode } = useTheme();
  const navigation = useNavigation<ApplicationScreenProps>();

  useLayoutEffect(() => {
    if (backButton) {
      navigation.setOptions({
        title: '',
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          shadowColor: 'transparent',
        },
        headerLeft: () => <BackButton />,
      });
    }
  }, []);

  return (
    <InterpolateColorAnimation isScreen>
      <StyledContainer testID={testID}>
        <HeaderContainer>
          {title && (
            <TitleContainer>
              <TitleTypography
                type="Headline4"
                adjustsFontSizeToFit={adjustsFontTitle}
                numberOfLines={numberOfLinesTitle}
                color="textLabelNeutral"
              >
                {getCopyValue(title)}
              </TitleTypography>
            </TitleContainer>
          )}
          {description && (
            <DescriptionContainer>
              <DescriptionText
                type="Subtitle3"
                font="primary"
                color="tertiaryL5"
                textAlign="left"
              >
                {description}
              </DescriptionText>
            </DescriptionContainer>
          )}
        </HeaderContainer>
        <BodyContainer testID={bodyTestID || undefined}>{body}</BodyContainer>
        <ButtonsContainer>
          <ArrayButtonsContainer>
            {arrayInlineButtons &&
              arrayInlineButtons.map((button, index) => {
                return (
                  <ArrayButtonContainer key={index}>
                    <StyledButton
                      testID={button.testID || undefined}
                      title={button.title}
                      icon={button.icon}
                      iconType={button.iconType}
                      startFrameAnimation={button.startFrameAnimation}
                      endFrameAnimation={button.endFrameAnimation}
                      widthIcon={button.widthIcon}
                      heightIcon={button.heightIcon}
                      onPress={button.onPress}
                      onPressAsync={button.onPressAsync}
                      onPressType="onPressIn"
                      textTransform={button.textTransform || undefined}
                      style={button.style}
                      buttonTheme={darkMode ? 'Dark' : 'Secondary'}
                      type="Icon"
                      loading={button.loading || undefined}
                      disabled={button.disabled || undefined}
                      backgroundColor={button.backgroundColor || undefined}
                      featureFlags={button.featureFlags || []}
                    />
                  </ArrayButtonContainer>
                );
              })}
          </ArrayButtonsContainer>
          {arrayInlineButtonsFooterText && (
            <ArrayFooterTextContainer>
              {typeof arrayInlineButtonsFooterText === 'string' ? (
                <ArrayFooterText
                  type="Subtitle2"
                  font="primary"
                  color="tertiaryL5"
                  textAlign="center"
                  weight={400}
                >
                  {getCopyValue(arrayInlineButtonsFooterText)}
                </ArrayFooterText>
              ) : (
                arrayInlineButtonsFooterText
              )}
            </ArrayFooterTextContainer>
          )}
          {primaryButton && (
            <StyledButton
              testID={primaryButton.testID || undefined}
              title={primaryButton.title}
              onPress={primaryButton.onPress}
              onPressAsync={primaryButton.onPressAsync}
              onPressType="onPressIn"
              textTransform={primaryButton.textTransform || undefined}
              style={primaryButton.style || undefined}
              loading={primaryButton.loading || undefined}
              disabled={primaryButton.disabled || undefined}
              backgroundColor={primaryButton.backgroundColor || undefined}
              featureFlags={primaryButton.featureFlags || []}
            />
          )}
          {secondaryButton && (
            <StyledButton
              testID={secondaryButton.testID || undefined}
              title={secondaryButton.title}
              onPress={secondaryButton.onPress}
              onPressAsync={secondaryButton.onPressAsync}
              onPressType="onPressIn"
              textTransform={secondaryButton.textTransform || undefined}
              style={secondaryButton.style || undefined}
              buttonTheme={'Secondary'}
              loading={secondaryButton.loading || undefined}
              disabled={secondaryButton.disabled || undefined}
              isGreyed={secondaryButton.disabled || undefined}
              backgroundColor={secondaryButton.backgroundColor || undefined}
              featureFlags={secondaryButton.featureFlags || []}
            />
          )}
          {tertiaryButton && (
            <StyledButton
              testID={tertiaryButton.testID || undefined}
              title={tertiaryButton.title}
              onPress={tertiaryButton.onPress}
              onPressAsync={tertiaryButton.onPressAsync}
              onPressType="onPressIn"
              textTransform={tertiaryButton.textTransform || undefined}
              style={tertiaryButton.style || undefined}
              buttonTheme={darkMode ? 'Dark' : 'Secondary'}
              type="Text"
              loading={tertiaryButton.loading || undefined}
              disabled={tertiaryButton.disabled || undefined}
              backgroundColor={tertiaryButton.backgroundColor || undefined}
              featureFlags={tertiaryButton.featureFlags || []}
            />
          )}
          {footer && <LegendActionButton>{footer}</LegendActionButton>}
        </ButtonsContainer>
      </StyledContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(CallToAction);
