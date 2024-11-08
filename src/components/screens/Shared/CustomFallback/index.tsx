import React, { memo, useCallback } from 'react';
import { DevSettings } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { type ApplicationScreenProps } from '@types';
import { useBlockScreen } from '@hooks';
import { RotateAnimation } from '@components/animated';
import { FallbackAnimation } from '@components/atoms';
import { CallToAction } from '@components/templates';
import {
  HeaderContainer,
  BodyContainer,
  StyledScrollView,
  StyledText,
  ErrorContainer,
} from './styles';

export type CustomFallbackProps = {
  error: Error;
};

export const CustomFallback: React.FC<CustomFallbackProps> = ({ error }) => {
  const navigation: ApplicationScreenProps = useNavigation();
  const mockedErrorMessage =
    error || 'common:errors.boundaries.fallbackScreen.detailsLabelDefaultMessage';

  useBlockScreen();
  const primaryButtonHandler = useCallback(async (): Promise<void> => {
    DevSettings.reload();
  }, []);

  const secondaryButtonHandler = useCallback(async (): Promise<void> => {
    navigation.navigate('HelpCenter', { screen: 'BugReporter' } as never);
  }, []);

  return (
    <CallToAction
      body={
        <BodyContainer testID="CustomFallbackID">
          <RotateAnimation
            duration={10000}
            initialValue={0}
            finalValue={360}
            repeat={-1}
            easing="linear"
          >
            <FallbackAnimation />
          </RotateAnimation>
          <HeaderContainer>
            <StyledText type="Headline5" font="Primary" color="typography900" textAlign="center">
              {'common:errors.boundaries.fallbackScreen.title'}
            </StyledText>
            <StyledText
              type="Subtitle1"
              font="Primary"
              color="typography900"
              textAlign="center"
              paddingTop={5}
            >
              {'common:errors.boundaries.fallbackScreen.description'}
            </StyledText>
          </HeaderContainer>
          <StyledScrollView>
            <ErrorContainer>
              <StyledText
                type="Subtitle2"
                font="Primary"
                color="typography800"
                textAlign="left"
                weight="bold"
              >
                {'common:errors.boundaries.fallbackScreen.detailsLabel'}
                <StyledText
                  type="Subtitle2"
                  font="Primary"
                  color="typography800"
                  textAlign="justify"
                  weight={400}
                >
                  {String(error || mockedErrorMessage)}
                </StyledText>
              </StyledText>
            </ErrorContainer>
          </StyledScrollView>
        </BodyContainer>
      }
      secondaryButton={{
        testID: 'customFallbackSecondaryButton',
        title: 'menu:helpCenter.support.items.bugReporter.form.primaryButton',
        onPress: secondaryButtonHandler,
      }}
      primaryButton={{
        testID: 'customFallbackPrimaryButton',
        title: 'common:errors.boundaries.fallbackScreen.button',
        onPress: primaryButtonHandler,
      }}
    />
  );
};

export default memo(CustomFallback);
