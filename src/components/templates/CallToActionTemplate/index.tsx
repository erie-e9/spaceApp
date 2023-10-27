import React, { memo, useLayoutEffect } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type * as CSS from 'csstype';
import { useNavigation } from '@react-navigation/core';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { useTheme } from '@hooks';
import { InterpolateColorAnimation } from '@components/animated';
import { BackButton } from '@components/atoms';
import {
  StyledContainer,
  HeaderContainer,
  TitleContainer,
  TitleTypography,
  BodyContainer,
  ButtonContainer,
  StyledActionButton,
  LegendActionButton,
} from './styles';

interface ButtonProps {
  testID?: string;
  title: string;
  onPress?: () => void;
  onPressAsync?: () => Promise<void>;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  featureFlags?: string[];
}
interface Props {
  testID?: string;
  title?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  body: JSX.Element;
  bodyTestID?: string;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  tertiaryButton?: ButtonProps;
  footer?: JSX.Element;
  color?: string;
  backButton?: boolean;
}
const CallToActionTemplate: React.FC<Props> = ({
  testID,
  title,
  adjustsFontTitle,
  numberOfLinesTitle,
  body,
  bodyTestID,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  footer,
  backButton,
}) => {
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
          height: 50,
          shadowColor: 'transparent',
        },
        headerLeft: () => <BackButton navigation={navigation} />,
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
                type="Headline5"
                adjustsFontSizeToFit={adjustsFontTitle}
                numberOfLines={numberOfLinesTitle}
                color="textLabelNeutral"
              >
                {title}
              </TitleTypography>
            </TitleContainer>
          )}
        </HeaderContainer>
        <BodyContainer testID={bodyTestID || undefined}>{body}</BodyContainer>
        <ButtonContainer>
          {primaryButton && (
            <StyledActionButton
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
            <StyledActionButton
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
            <StyledActionButton
              testID={tertiaryButton.testID || undefined}
              title={tertiaryButton.title}
              onPress={tertiaryButton.onPress}
              onPressAsync={tertiaryButton.onPressAsync}
              onPressType="onPressIn"
              textTransform={tertiaryButton.textTransform || undefined}
              style={tertiaryButton.style || undefined}
              buttonTheme={darkMode ? 'Dark' : 'Secondary'}
              type={'Text'}
              loading={tertiaryButton.loading || undefined}
              disabled={tertiaryButton.disabled || undefined}
              backgroundColor={tertiaryButton.backgroundColor || undefined}
              featureFlags={tertiaryButton.featureFlags || []}
            />
          )}
          {footer && <LegendActionButton>{footer}</LegendActionButton>}
        </ButtonContainer>
      </StyledContainer>
    </InterpolateColorAnimation>
  );
};

CallToActionTemplate.defaultProps = {
  testID: 'CallToActionTemplateID',
  title: undefined,
  adjustsFontTitle: false,
  numberOfLinesTitle: 1,
  bodyTestID: undefined,
  primaryButton: undefined,
  secondaryButton: undefined,
  tertiaryButton: undefined,
  footer: undefined,
  color: undefined,
  backButton: false,
};

export default memo(CallToActionTemplate);
