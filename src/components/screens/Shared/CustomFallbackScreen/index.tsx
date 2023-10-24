import React from 'react';
import {
  StyledScrollView,
  BodyContainer,
  HeaderContainer,
  StyledText,
  ErrorContainer,
  TryAgainButton,
} from './styles';
import { useCopy } from '@services';
import {
  InterpolateColorAnimation,
  RotateAnimation,
} from '@components/animated';
import { RenderWhen, FallbackAnimation, StatusBar } from '@components/atoms';

export type CustomFallbackScreenProps = {
  error: Error;
  resetError: () => void;
};

export const CustomFallbackScreen: React.FC<CustomFallbackScreenProps> = ({
  error,
  resetError,
}) => {
  const { getCopyValue } = useCopy();

  return (
    <InterpolateColorAnimation>
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
        <RenderWhen isTrue={!!error}>
          <StyledScrollView testID="CustomFallbackScreenID">
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
                  {String(error)}
                </StyledText>
              </StyledText>
            </ErrorContainer>
          </StyledScrollView>
        </RenderWhen>
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default CustomFallbackScreen;
