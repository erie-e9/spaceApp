import React from 'react';
import { useCopy } from '@services';
import { InterpolateColorAnimation } from '@components/animated';
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
          <ErrorContainer>
            <StyledText
              type="Subtitle2"
              font="secondary"
              color="surfaceL1"
              textAlign="justify"
            >
              {error.toString()}
            </StyledText>
          </ErrorContainer>
        </BodyContainer>
      </InterpolateColorAnimation>
    </StyledScrollView>
  );
};

export default CustomFallbackScreen;
