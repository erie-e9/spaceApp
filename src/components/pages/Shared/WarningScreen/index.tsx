import React, { useEffect, useRef, useState } from 'react';
import { useCopy } from '@services/copyLibrary';
import { useTheme, useToast } from '@hooks';
import CallToActionTemplate from '@components/templates/CallToActionTemplate';
import { Lottie } from '@components/atoms';
import type { LottieViewProps } from '@components/atoms';
import {
  BodyContainer,
  TitleText,
  DescriptionContainer,
  SubdescriptionContainer,
} from './styles';

export const WarningScreen = () => {
  const animationRef = useRef<LottieViewProps>(null);
  const { getCopyValue } = useCopy();
  const { Animations } = useTheme();
  const isMounted = useRef(true);
  const [loadingValue, setLoadingValue] = useState(false);
  const [loadingValue2, setLoadingValue2] = useState(false);

  const handlePrimaryButton = async (): Promise<void> => {
    await setLoadingValue(!loadingValue);
  };

  const handleSecondaryButton = async (): Promise<void> => {
    setLoadingValue2(!loadingValue2);
    useToast.info({
      message: getCopyValue(
        'security:WarningScreen.actions.secondaryButton.message',
      ),
      duration: 3500,
    });
  };

  useEffect(() => {
    isMounted.current = true;
    let timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 1000);
    return () => {
      clearTimeout(timeOut);
      isMounted.current = false;
    };
  }, []);

  return (
    <CallToActionTemplate
      title={getCopyValue('security:WarningScreen.title')}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <Lottie
            ref={animationRef}
            source={Animations.warning}
            autoPlay={false}
            loop={false}
            resizeMode="contain"
            width={100}
            height={100}
          />
          <DescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="secondary"
              color="surfaceL1"
              textAlign="justify"
            >
              {getCopyValue('security:WarningScreen.description', {
                appName: process.env.APP_NAME,
              })}
            </TitleText>
          </DescriptionContainer>
          <SubdescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="secondary"
              color="surfaceL1"
              textAlign="center"
              weight="bold"
            >
              {getCopyValue('security:WarningScreen.sub-description')}
            </TitleText>
          </SubdescriptionContainer>
        </BodyContainer>
      }
      primaryButton={{
        title: getCopyValue('security:WarningScreen.actions.primaryButton'),
        onPress: handlePrimaryButton,
        testID: 'WarningScreen.primaryButton',
        disabled: loadingValue,
        loading: loadingValue,
      }}
      secondaryButton={{
        title: getCopyValue(
          'security:WarningScreen.actions.secondaryButton.title',
        ),
        onPress: handleSecondaryButton,
        testID: 'WarningScreen.secondaryButton',
        disabled: loadingValue2,
        loading: loadingValue2,
      }}
    />
  );
};
