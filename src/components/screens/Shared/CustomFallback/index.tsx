import React, { memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCopy } from '@services';
import { ApplicationScreenProps } from '@utils/@types/navigation';
import { RotateAnimation } from '@components/animated';
import { FallbackAnimation, StatusBar } from '@components/atoms';
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
  resetError: () => void;
};

export const CustomFallback: React.FC<CustomFallbackProps> = ({
  error,
  resetError,
}) => {
  const { getCopyValue } = useCopy();
  const navigation: ApplicationScreenProps = useNavigation();
  const mockedErrorMessage =
    error ||
    'common:errors.boundaries.fallbackScreen.detailsLabelDefaultMessage';

  const handlePrimaryButton = useCallback(async (): Promise<void> => {
    if (resetError) await resetError();
  }, []);

  const handleSecondaryButton = useCallback(async (): Promise<void> => {
    await navigation.navigate('ContactUs');
    await navigation.reset({
      index: 0,
      routes: [{ name: 'ContactUs' }],
    });
  }, []);

  return (
    <CallToAction
      body={
        <BodyContainer>
          <StatusBar />
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
            <StyledText
              type="Headline5"
              font="primary"
              color="textLabelNeutral"
              textAlign="center"
            >
              {getCopyValue('common:errors.boundaries.fallbackScreen.title')}
            </StyledText>
            <StyledText
              type="Subtitle1"
              font="primary"
              color="textLabelNeutral"
              textAlign="center"
              paddingTop={5}
            >
              {getCopyValue(
                'common:errors.boundaries.fallbackScreen.description',
              )}
            </StyledText>
          </HeaderContainer>
          <StyledScrollView testID="CustomFallbackID">
            <ErrorContainer>
              <StyledText
                type="Subtitle2"
                font="primary"
                color="surfaceL1"
                textAlign="left"
                weight="bold"
              >
                {getCopyValue(
                  'common:errors.boundaries.fallbackScreen.detailsLabel',
                )}
                <StyledText
                  type="Subtitle2"
                  font="primary"
                  color="surfaceL1"
                  textAlign="justify"
                >
                  {getCopyValue(String(error || mockedErrorMessage))}
                </StyledText>
              </StyledText>
            </ErrorContainer>
          </StyledScrollView>
        </BodyContainer>
      }
      primaryButton={{
        testID: 'CustomFallback.primaryButton',
        title: 'common:errors.boundaries.fallbackScreen.button',
        onPress: handlePrimaryButton,
      }}
      secondaryButton={{
        testID: 'Warning.secondaryButtonLoading',
        title: 'security:Warning.actions.secondaryButton.title',
        onPress: handleSecondaryButton,
      }}
    />
  );
};

export default memo(CustomFallback);
