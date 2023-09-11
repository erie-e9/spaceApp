import React, { useEffect, useRef } from 'react';
import CallToActionTemplate from '@components/templates/CallToAction';
import { useCopy } from '@services/copyLibrary';
import { BodyContainer, TitleText } from './styles';
import LottieView from 'lottie-react-native';
import { useTheme } from '@hooks';

export const WarningScreen = () => {
  const animationRef = useRef<LottieView>(null);
  const { getCopyValue } = useCopy();
  const { Animations } = useTheme();
  const isMounted = useRef(true);

  const handlePrimaryButton = async (): Promise<void> => {
    console.log('hola desde handlePrimaryButton');
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
      body={
        <BodyContainer>
          <LottieView
            ref={animationRef}
            source={Animations.warning}
            renderMode="SOFTWARE"
            style={{
              width: 100,
              height: 100,
            }}
          />
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
          <TitleText
            type="Subtitle1"
            font="secondary"
            color="darkBlueD3"
            textAlign="center"
            weight="bold"
          >
            {getCopyValue('security:WarningScreen.sub-description')}
          </TitleText>
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
