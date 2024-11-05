import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components';
import { testProperties } from '@utils/functions';
import { useTheme } from '@hooks';
import { type TouchableProps } from '@types';
import { HeaderTemplate, ScreenBackground } from '@components/atoms';
import {
  StyledContainer,
  StyledKeyboardAvoidingView,
  BodyContainer,
  ButtonsContainer,
  StyledButton,
  LegendActionButton,
  ArrayFooterTextContainer,
  ArrayFooterText,
} from './styles';

interface CallToActionProps {
  testID?: string;
  title?: string;
  description?: string;
  adjustsFontTitle?: boolean;
  numberOfLinesTitle?: number;
  body: JSX.Element;
  bodyTestID?: string;
  primaryButton?: TouchableProps;
  secondaryButton?: TouchableProps;
  tertiaryButton?: TouchableProps;
  arrayInlineButtons?: Array<TouchableProps>;
  arrayInlineButtonsFooterText?: JSX.Element | string;
  footer?: JSX.Element;
  backButton?: boolean;
  pressTitle?: 'back' | 'scrollUp';
  headerStyle?: 'Primary' | 'Secondary';
  headerOptions?: React.ReactNode;
  initialColor?: keyof DefaultTheme['tokens']['colors'];
  finalColor?: keyof DefaultTheme['tokens']['colors'];
}

const CallToAction: React.FC<CallToActionProps> = ({
  testID = 'CallToActionID',
  title,
  description,
  adjustsFontTitle = false,
  numberOfLinesTitle = 1,
  body,
  bodyTestID,
  primaryButton,
  secondaryButton,
  tertiaryButton,
  arrayInlineButtons,
  arrayInlineButtonsFooterText,
  footer,
  backButton = false,
  pressTitle,
  headerStyle = 'Primary',
  headerOptions,
  initialColor,
  finalColor,
}) => {
  const { darkMode, Images } = useTheme();

  const renderButton = (button: TouchableProps, theme: string = 'Secondary') => (
    <StyledButton
      testID={button?.testID}
      title={button?.title}
      onPress={button?.onPress}
      onPressAsync={button?.onPressAsync}
      textTransform={button?.textTransform}
      style={button?.style}
      buttonTheme={button?.buttonTheme || theme}
      type={button?.type}
      textColor={button?.textColor}
      loading={button?.loading}
      disabled={button?.disabled}
      backgroundColor={button?.backgroundColor}
      remoteFeatureFlags={button?.remoteFeatureFlags}
    />
  );

  return (
    <ScreenBackground
      testID={testID}
      type="gradient"
      initialColor={initialColor}
      finalColor={finalColor}
      // colors={['#51506b', '#181725', '#181725', '#06060a']}
      // colors={['#66768a', '#253e3f', '#172325', '#060a0a']}
      layerOpacity={0.9}
      // backgroundType="image"
      // backgroundSource={Images.wallpapers.background1}
      // backgroundSource={
      //   'https://firebasestorage.googleapis.com/v0/b/start-react-native.appspot.com/o/BigBuckBunny.mp4?alt=media&token=42bb3922-af22-4491-93a6-5100fc6a5f27'
      // }
    >
      <StyledContainer {...testProperties(testID)}>
        <HeaderTemplate
          title={title || ' '}
          description={description}
          adjustsFontTitle={adjustsFontTitle}
          numberOfLinesTitle={numberOfLinesTitle}
          backButton={backButton}
          pressTitle={pressTitle}
          headerStyle={headerStyle}
          headerOptions={headerOptions}
        />
        <StyledKeyboardAvoidingView
        // keyboardVerticalOffset={70}
        >
          <BodyContainer testID={bodyTestID}>{body}</BodyContainer>

          <ButtonsContainer>
            {arrayInlineButtonsFooterText && (
              <ArrayFooterTextContainer>
                {typeof arrayInlineButtonsFooterText === 'string' ? (
                  <ArrayFooterText
                    type="Subtitle3"
                    font="Primary"
                    color="secondary600"
                    textAlign="center"
                    weight={400}
                  >
                    {arrayInlineButtonsFooterText}
                  </ArrayFooterText>
                ) : (
                  arrayInlineButtonsFooterText
                )}
              </ArrayFooterTextContainer>
            )}

            {footer && <LegendActionButton>{footer}</LegendActionButton>}
            {primaryButton &&
              secondaryButton &&
              tertiaryButton &&
              renderButton(tertiaryButton, darkMode ? 'Dark' : 'Secondary')}
            {primaryButton && secondaryButton && renderButton(secondaryButton)}
            {primaryButton && renderButton(primaryButton, primaryButton?.buttonTheme || 'Primary')}
          </ButtonsContainer>
        </StyledKeyboardAvoidingView>
      </StyledContainer>
    </ScreenBackground>
  );
};

export default memo(CallToAction);
