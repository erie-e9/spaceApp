import React, { useEffect, useRef, memo, useCallback, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { CompositeNavigationProp } from '@react-navigation/native';
import { AuthenticationParamsList } from '@navigators/Auth';
import { useCopy } from '@services';
import { type ApplicationStackParamList, type InfoType } from '@types';
import { useSignUp } from './hooks/useSignUp';
import { LottieViewProps } from '@components/atoms';
import { MultiStepper } from '@components/templates';
import { TermsPolicyContainer, TermsPolicyText } from './styles';

type NavigationType = CompositeNavigationProp<
  StackNavigationProp<AuthenticationParamsList, 'Authentication'>,
  StackNavigationProp<ApplicationStackParamList>
>;
export interface SignUpProps {
  navigation: NavigationType;
  route: RouteProp<AuthenticationParamsList, 'SignUp'>;
}

export const SignUp: React.FC<SignUpProps> = ({ navigation, route }) => {
  const animationRef = useRef<LottieViewProps>(null);
  const useSignUpHook = useSignUp({ navigation, route });
  const { getCopyValue } = useCopy();

  const navigatorHandler = useCallback((type: InfoType) => {
    navigation.navigate('Info', { type: type } as never);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      animationRef.current?.play();
    }, 400);
    return () => clearTimeout(timeOut);
  }, []);

  const extraElementLastStep = useMemo(() => {
    return (
      <TermsPolicyContainer>
        <TermsPolicyText type="Subtitle3" font="Primary" color="secondary600" textAlign="center">
          {'signup:SignUp.form.termsAndPolicy.text1'}{' '}
          <TermsPolicyText
            type="Subtitle3"
            font="Primary"
            color="secondary700"
            textAlign="center"
            weight="bold"
            remoteFeatureFlags={['termsOfUse']}
            onPress={() => navigatorHandler('termsOfUse')}
          >
            {getCopyValue('menu:helpCenter.info.items.termsOfUse.title')}{' '}
          </TermsPolicyText>
          <TermsPolicyText type="Subtitle3" font="Primary" color="secondary600" textAlign="center">
            {getCopyValue('signup:SignUp.form.termsAndPolicy.text2')}{' '}
          </TermsPolicyText>
          <TermsPolicyText
            type="Subtitle3"
            font="Primary"
            color="secondary700"
            textAlign="center"
            weight="bold"
            onPress={() => navigatorHandler('privacyPolicy')}
          >
            {'menu:helpCenter.info.items.privacyPolicy.title'}
          </TermsPolicyText>
        </TermsPolicyText>
      </TermsPolicyContainer>
    );
  }, []);

  return (
    <MultiStepper
      testID="SignUpID"
      numberOfLinesTitle={3}
      showProgress={true}
      backButton
      bodyTestID="SignUpBodyID"
      hookHandler={useSignUpHook}
      steps={useSignUpHook.steps}
      currentStepIndex={useSignUpHook.index}
      values={useSignUpHook.values}
      errors={useSignUpHook.errors}
      touched={useSignUpHook.touched}
      submitButtonHandler={useSignUpHook.handleSubmit}
      prevStepButtonHandler={useSignUpHook.prevStepButtonHandler}
      nextStepButtonHandler={useSignUpHook.nextStepButtonHandler}
      nextStepButtonDisabled={useSignUpHook.nextStepButtonDisabled}
      extraElementLastStep={extraElementLastStep}
    />
  );
};

export default memo(SignUp);
