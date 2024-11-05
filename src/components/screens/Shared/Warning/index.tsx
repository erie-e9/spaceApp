import React, { useEffect, memo, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCopy } from '@services';
import { useTheme, useBlockScreen } from '@hooks';
import { Lottie, LottieViewProps } from '@components/atoms';
import { CallToAction } from '@components/templates';
import {
  BodyContainer,
  StyledScrollView,
  LabelContainer,
  SubDescriptionContainer,
  LabelText,
} from './styles';

export const Warning: React.FC = () => {
  const animationRef = useRef<LottieViewProps>(null);
  const navigation = useNavigation();
  const { getCopyValue } = useCopy();
  useBlockScreen();
  const { Animations } = useTheme();

  const primaryButtonHandler = useCallback(async (): Promise<void> => {
    navigation.navigate('ContactUs');
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return (
    <CallToAction
      testID="WarningID"
      title="security:Warning.title"
      headerStyle="Secondary"
      numberOfLinesTitle={2}
      initialColor="warning_status"
      finalColor="backgroundColor"
      body={
        <StyledScrollView>
          <BodyContainer testID="WarningBodyID">
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
            <LabelContainer>
              <LabelText type="Body3" font="Primary" color="typography800" textAlign="center">
                {getCopyValue('security:Warning.description', {
                  appName: process.env.APP_NAME,
                })}
              </LabelText>
            </LabelContainer>
            <SubDescriptionContainer>
              <LabelText type="Subtitle2" font="Primary" color="typography950" textAlign="center">
                {'security:Warning.sub-description'}
              </LabelText>
            </SubDescriptionContainer>
            <SubDescriptionContainer>
              <LabelContainer>
                <LabelText type="Subtitle2" font="Primary" color="typography800" textAlign="center">
                  {'security:Warning.actions.areWeWrong.title'}
                </LabelText>
                <LabelText type="Subtitle2" font="Primary" color="typography800" textAlign="center">
                  {'security:Warning.actions.areWeWrong.description'}
                </LabelText>
              </LabelContainer>
            </SubDescriptionContainer>
          </BodyContainer>
        </StyledScrollView>
      }
      primaryButton={{
        testID: 'warningPrimaryButton',
        title: 'menu:helpCenter.support.items.contactUs.title',
        onPress: primaryButtonHandler,
      }}
    />
  );
};

export default memo(Warning);
