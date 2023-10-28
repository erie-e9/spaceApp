import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useCopy } from '@services';
import { useTheme, useToast, useModal } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { CallToAction } from '@components/templates';
import {
  BodyContainer,
  DescriptionContainer,
  SubDescriptionContainer,
  TitleText,
} from './styles';

export const Warning = () => {
  const animationRef = useRef<LottieViewProps>(null);
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const { Animations } = useTheme();
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false);
  const [secondaryButtonLoading, setSecondaryButtonLoading] = useState(false);

  const handlePrimaryButton = useCallback(async (): Promise<void> => {
    showModal({
      type: 'alert',
      title: 'security:Warning.actions.primaryButton.modal.title',
      description: 'security:Warning.actions.primaryButton.modal.description',
      legacyOptions: { typeError: 'error' },
    });
    setSecondaryButtonLoading(false);
    await setPrimaryButtonLoading(!primaryButtonLoading);
  }, []);

  const handleSecondaryButton = useCallback(async (): Promise<void> => {
    await setPrimaryButtonLoading(false);
    setSecondaryButtonLoading(!secondaryButtonLoading);
    useToast.info({
      message: getCopyValue('security:Warning.actions.secondaryButton.message'),
      duration: 3000,
    });
  }, []);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <CallToAction
      title={getCopyValue('security:Warning.title')}
      numberOfLinesTitle={3}
      backButton
      body={
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
          <DescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="primary"
              color="surfaceL1"
              textAlign="justify"
            >
              {getCopyValue('security:Warning.description', {
                appName: process.env.APP_NAME,
              })}
            </TitleText>
          </DescriptionContainer>
          <SubDescriptionContainer>
            <TitleText
              type="Subtitle1"
              font="primary"
              color="surfaceL1"
              textAlign="center"
              weight="bold"
            >
              {getCopyValue('security:Warning.sub-description')}
            </TitleText>
          </SubDescriptionContainer>
        </BodyContainer>
      }
      primaryButton={{
        title: getCopyValue('security:Warning.actions.primaryButton.title'),
        onPress: handlePrimaryButton,
        testID: 'Warning.primaryButton',
        disabled: primaryButtonLoading,
        loading: primaryButtonLoading,
      }}
      secondaryButton={{
        title: getCopyValue('security:Warning.actions.secondaryButton.title'),
        onPress: handleSecondaryButton,
        testID: 'Warning.secondaryButtonLoading',
        disabled: secondaryButtonLoading,
        loading: secondaryButtonLoading,
      }}
    />
  );
};

export default memo(Warning);
