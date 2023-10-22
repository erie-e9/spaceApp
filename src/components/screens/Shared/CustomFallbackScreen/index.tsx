import React from 'react';
import { useCopy } from '@services';
import {
  InterpolateColorAnimation,
  RotateAnimation,
} from '@components/animated';
import { RenderWhen, FallbackAnimation } from '@components/atoms';
import {
  StyledScrollView,
  BodyContainer,
  HeaderContainer,
  StyledText,
  ErrorContainer,
  TryAgainButton,
} from './styles';

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
    <StyledScrollView testID="CustomFallbackScreenID">
      <InterpolateColorAnimation
        initialColor="backgroundColorLight"
        finalColor="backgroundColorDark"
      >
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
              font="secondary"
              color="textLabelNeutral"
              textAlign="center"
            >
              {getCopyValue('common:errors.boundaries.fallbackScreen.title')}
            </StyledText>

            <StyledText
              type="Headline6"
              font="secondary"
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
            title={getCopyValue(
              'common:errors.boundaries.fallbackScreen.button',
            )}
            buttonTheme="Primary"
            onPress={resetError}
          />
          <RenderWhen isTrue={!!error}>
            <ErrorContainer>
              <StyledText
                type="Subtitle2"
                font="secondary"
                color="surfaceL1"
                textAlign="left"
              >
                <StyledText
                  type="Subtitle2"
                  font="secondary"
                  color="surfaceL1"
                  textAlign="left"
                >
                  {getCopyValue(
                    'common:errors.boundaries.fallbackScreen.detailsLabel',
                  )}
                </StyledText>
                {error}
              </StyledText>
            </ErrorContainer>
          </RenderWhen>
        </BodyContainer>
      </InterpolateColorAnimation>
    </StyledScrollView>
  );
};

export default CustomFallbackScreen;
