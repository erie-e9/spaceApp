import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import type * as CSS from 'csstype';
import { useTheme } from '@hooks';
import {
  ButtonContainer,
  HeaderContainer,
  TitleContainer,
  BodyContainer,
  StyledActionButton,
  StyledContainer,
  IconContainer,
  LegendActionButton,
  TitleTypography,
} from './styles';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  onPressAsync?: () => Promise<void>;
  textTransform?: CSS.StandardProperties['textTransform'] | undefined;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  featureFlags?: string[];
}
interface Props {
  icon?: React.FC<SvgProps>;
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
  iconSpacing?: string;
}
const CallToActionLayout: React.FC<Props> = ({
  icon: Icon,
  title,
  adjustsFontTitle,
  numberOfLinesTitle,
  body,
  bodyTestID,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  footer,
  iconSpacing,
}) => {
  const { darkMode } = useTheme();

  return (
    <StyledContainer>
      <HeaderContainer>
        {Icon && (
          <IconContainer iconSpacing={iconSpacing || '200px'}>
            <Icon />
          </IconContainer>
        )}

        {title && (
          <TitleContainer>
            <TitleTypography
              type="Headline5"
              adjustsFontSizeToFit={adjustsFontTitle}
              numberOfLines={numberOfLinesTitle}
              color={darkMode ? 'opposing' : 'darkBlueD1'}
            >
              {title}
            </TitleTypography>
          </TitleContainer>
        )}
        <BodyContainer testID={bodyTestID || undefined}>{body}</BodyContainer>
      </HeaderContainer>
      <ButtonContainer>
        {primaryButton && (
          <StyledActionButton
            title={primaryButton.title}
            onPress={primaryButton.onPress}
            onPressAsync={primaryButton.onPressAsync}
            testID={primaryButton.testID || undefined}
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
            title={secondaryButton.title}
            onPress={secondaryButton.onPress}
            onPressAsync={secondaryButton.onPressAsync}
            testID={secondaryButton.testID || undefined}
            textTransform={secondaryButton.textTransform || undefined}
            style={secondaryButton.style || undefined}
            buttonTheme={'Secondary'}
            type={'Button'}
            loading={secondaryButton.loading || undefined}
            disabled={secondaryButton.disabled || undefined}
            isGreyed={secondaryButton.disabled || undefined}
            backgroundColor={secondaryButton.backgroundColor || undefined}
            featureFlags={secondaryButton.featureFlags || []}
          />
        )}
        {tertiaryButton && (
          <StyledActionButton
            title={tertiaryButton.title}
            onPress={tertiaryButton.onPress}
            onPressAsync={tertiaryButton.onPressAsync}
            testID={tertiaryButton.testID || undefined}
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
  );
};

export default CallToActionLayout;

CallToActionLayout.defaultProps = {
  icon: undefined,
  title: undefined,
  adjustsFontTitle: false,
  numberOfLinesTitle: 1,
  bodyTestID: undefined,
  primaryButton: undefined,
  secondaryButton: undefined,
  tertiaryButton: undefined,
  footer: undefined,
  color: undefined,
  iconSpacing: undefined,
};
