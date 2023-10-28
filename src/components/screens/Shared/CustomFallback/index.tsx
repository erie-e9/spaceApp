import React from 'react';
import { useCopy } from '@services';
import {
  InterpolateColorAnimation,
  RotateAnimation,
} from '@components/animated';
import { FallbackAnimation, StatusBar } from '@components/atoms';
import {
  StyledScrollView,
  BodyContainer,
  HeaderContainer,
  StyledText,
  ErrorContainer,
  TryAgainButton,
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
  const mockedErrorMessage =
    error ||
    'common:errors.boundaries.fallbackScreen.detailsLabelDefaultMessage';
  return (
    <InterpolateColorAnimation isScreen>
      <StatusBar />
      <BodyContainer>
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
          >
            {getCopyValue(
              'common:errors.boundaries.fallbackScreen.description',
            )}
          </StyledText>
        </HeaderContainer>
        <TryAgainButton
          type="Button"
          title={getCopyValue('common:errors.boundaries.fallbackScreen.button')}
          buttonTheme="Primary"
          onPress={resetError}
        />
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
    </InterpolateColorAnimation>
  );
};

export default CustomFallback;
