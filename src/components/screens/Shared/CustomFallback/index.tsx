import React, { useCallback, useState } from 'react';
import { useCopy } from '@services';
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
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false);
  const [secondaryButtonLoading, setSecondaryButtonLoading] = useState(false);
  const mockedErrorMessage =
    error ||
    'common:errors.boundaries.fallbackScreen.detailsLabelDefaultMessage';

  const handlePrimaryButton = useCallback(async (): Promise<void> => {
    await setPrimaryButtonLoading(!primaryButtonLoading);
    await setSecondaryButtonLoading(false);
    if (resetError) await resetError();
  }, []);

  const handleSecondaryButton = useCallback(async (): Promise<void> => {
    await setSecondaryButtonLoading(!secondaryButtonLoading);
    await setPrimaryButtonLoading(false);
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
        title: 'common:errors.boundaries.fallbackScreen.button',
        onPress: handlePrimaryButton,
        testID: 'CustomFallback.primaryButton',
        disabled: primaryButtonLoading,
        loading: primaryButtonLoading,
      }}
      secondaryButton={{
        title: 'security:Warning.actions.secondaryButton.title',
        onPress: handleSecondaryButton,
        testID: 'Warning.secondaryButtonLoading',
        disabled: secondaryButtonLoading,
        loading: secondaryButtonLoading,
      }}
    />
  );
};

export default CustomFallback;
