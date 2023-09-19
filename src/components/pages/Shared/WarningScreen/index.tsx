import React, { useEffect, useRef } from 'react';
import CallToActionTemplate from '@components/templates/CallToAction';
import { useCopy } from '@services/copyLibrary';
import { Lottie } from '@components/atoms';
import type { LottieViewProps } from '@components/atoms';
import { useTheme } from '@hooks';
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

  const handlePrimaryButton = async (): Promise<void> => {
    console.log('handlePrimaryButton');
  };

  const handlebodyButton = async (): Promise<void> => {
    console.clear();
  };

  useEffect(() => {
    isMounted.current = true;
    setTimeout(() => {
      animationRef.current?.play();
    }, 1000);
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <CallToActionTemplate
      title={getCopyValue('security:WarningScreen.title')}
      numberOfLinesTitle={3}
      body={
        <BodyContainer>
          <Lottie
            ref={animationRef}
            source={Animations.warning}
            renderMode="SOFTWARE"
            resizeMode="contain"
            width={100}
            height={100}
          />
          <DescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="secondary"
              color="darkBlueD3"
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
              color="darkBlueD3"
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
        onPressAsync: handlePrimaryButton,
        testID: 'WarningScreen.primaryButton',
        disabled: false,
        loading: false,
      }}
      secondaryButton={{
        title: getCopyValue('security:WarningScreen.actions.secondaryButton'),
        onPress: handlebodyButton,
        testID: 'WarningScreen.secondaryButton',
        disabled: false,
        loading: false,
      }}
    />
  );
};
