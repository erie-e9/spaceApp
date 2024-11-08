import React, { useEffect, useRef, memo } from 'react';
import { useCopy } from '@services';
import { useTheme } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import {
  BodyContainer,
  StyledScrollView,
  DescriptionContainer,
  SubDescriptionContainer,
  TitleText,
} from './styles';

export const OnBoarding: React.FC = () => {
  const animationRef = useRef<LottieViewProps>(null);
  const { getCopyValue } = useCopy();
  const { Animations } = useTheme();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <BodyContainer testID="WarningID">
      <Lottie
        ref={animationRef}
        source={Animations.warning}
        autoPlay={false}
        renderMode="AUTOMATIC"
        loop={false}
        resizeMode="contain"
        width={120}
        height={120}
      />
      <StyledScrollView>
        <DescriptionContainer>
          <TitleText type="Subtitle2" font="Primary" color="typography800" textAlign="center">
            {getCopyValue('security:OnBoarding.description', {
              appName: process.env.APP_NAME,
            })}
          </TitleText>
        </DescriptionContainer>
        <SubDescriptionContainer>
          <TitleText
            type="Subtitle2"
            font="Primary"
            color="typography800"
            textAlign="center"
            weight="bold"
          >
            {'security:OnBoarding.sub-description'}
          </TitleText>
        </SubDescriptionContainer>
      </StyledScrollView>
    </BodyContainer>
  );
};

export default memo(OnBoarding);
