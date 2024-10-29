import React, { useEffect, useRef, memo, Fragment } from 'react';
import { RouteProp } from '@react-navigation/core';
import { type ApplicationScreenProps } from '@types';
import { AuthenticationParamsList } from '@navigators/Auth';
import { Logger, useCopy } from '@services';
import { useTheme } from '@hooks';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { OpacityAnimation, TransformAnimation } from '@components/animated';
import { Lottie, LottieViewProps } from '@components/atoms';
import { Biometrics } from '@components/molecules';
import { CallToAction } from '@components/templates';
import { useAuthentication } from './hooks/useAuthentication';
import Form from './components/Form';
import SocialMediaAuth from './components/SocialMediaAuth';
import {
  BodyContainer,
  StyledScrollView,
  SubFormContainer,
  FormContainer,
  FormActionTouchable,
  ForgotPasswordContainer,
  StyledText,
  FooterButtonsContainer,
  AnotherAccountContainer,
} from './styles';

type NavigationType = ApplicationScreenProps;
interface Props {
  navigation: NavigationType;
  route: RouteProp<AuthenticationParamsList, 'Authentication'>;
}

export const Authentication: React.FC<Props> = ({ navigation, route }) => {
  const animationRef = useRef<LottieViewProps>(null);
  const { getCopyValue } = useCopy();
  const { Animations } = useTheme();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const useAuthenticationHook = useAuthentication({ navigation });

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
      testID="AuthenticationID"
      title={getCopyValue(
        `authentication:Authentication.screenHeaders.${useAuthenticationHook.titleText}.title`,
        {
          username: useAuthenticationHook?.user?.firstName || '',
          genre:
            useAuthenticationHook?.user?.genre === 'man'
              ? 'o'
              : useAuthenticationHook?.user?.genre === 'woman'
              ? 'a'
              : '@',
        },
      )}
      description={`authentication:Authentication.screenHeaders.${useAuthenticationHook.descriptionText}.description`}
      numberOfLinesTitle={2}
      backButton
      body={
        <BodyContainer testID="AuthenticationBodyID">
          <StyledScrollView>
            <OpacityAnimation
              trigger={useAuthenticationHook.toggleForm}
              duration={450}
              initialValue={0}
              finalValue={1}
              // delay={300}
              repeat={1}
              reverse
            >
              <TransformAnimation
                trigger={useAuthenticationHook.toggleForm}
                duration={350}
                initialXValue={0}
                finalXValue={0}
                initialYValue={0}
                finalYValue={-5}
                repeat={1}
                // delay={300}
                reverse
              >
                <FormContainer>
                  {useAuthenticationHook.enableBiometrics &&
                    useAuthenticationHook.toggleForm === 'logIn' && (
                      <Fragment>
                        <Biometrics
                          // text={
                          //   'authentication:Authentication.biometrics.buttons.useFingerprint'
                          // }
                          icon={
                            <Lottie
                              ref={animationRef}
                              source={Animations.fingerprint}
                              autoPlay={false}
                              renderMode="AUTOMATIC"
                              loop={false}
                              resizeMode="contain"
                              width={70}
                              height={70}
                            />
                          }
                          onSuccess={() => Logger.log('biometrics success')}
                        />
                        <FormActionTouchable
                          onPress={() => useAuthenticationHook.useBiometricsHandler()}
                        >
                          <StyledText
                            type="Subtitle2"
                            font="Primary"
                            color="secondary900"
                            textAlign="center"
                            weight={500}
                          >
                            {`authentication:Authentication.usePassword`}
                          </StyledText>
                        </FormActionTouchable>
                      </Fragment>
                    )}
                  <Form hookHandler={useAuthenticationHook} />
                </FormContainer>
                <SubFormContainer>
                  <ForgotPasswordContainer>
                    {useAuthenticationHook.toggleForm === 'logIn' &&
                      !useAuthenticationHook.enableBiometrics && (
                        <FormActionTouchable
                          onPress={() => useAuthenticationHook.toggleFormHandler('accountRecovery')}
                        >
                          <StyledText
                            type="Subtitle3"
                            font="Primary"
                            color="secondary800"
                            textAlign="right"
                            weight={500}
                          >
                            {`authentication:Authentication.forgotPassword`}
                          </StyledText>
                        </FormActionTouchable>
                      )}
                  </ForgotPasswordContainer>

                  {useAuthenticationHook.toggleForm === 'logIn' &&
                    useAuthenticationHook.loggedOnDevice && (
                      <AnotherAccountContainer>
                        <StyledText
                          type="Subtitle2"
                          font="Primary"
                          color="secondary600"
                          textAlign="center"
                          weight={400}
                        >
                          {'authentication:Authentication.isNotYourAccount'}
                        </StyledText>
                        <FormActionTouchable
                          onPress={() => useAuthenticationHook.useAnotherAccountAlert()}
                        >
                          <StyledText
                            type="Subtitle2"
                            font="Primary"
                            color="secondary800"
                            textAlign="center"
                            weight={500}
                          >
                            {`authentication:Authentication.useAnotherAccount`}
                          </StyledText>
                        </FormActionTouchable>
                      </AnotherAccountContainer>
                    )}
                  {remoteConfigFeatures?.socialNetworksAuth?.status === 'on' && (
                    <SocialMediaAuth hookHandler={useAuthenticationHook} />
                  )}
                  {remoteConfigFeatures[
                    useAuthenticationHook.toggleForm === 'logIn'
                      ? 'accountRecovery'
                      : useAuthenticationHook.toggleForm === 'accountRecovery'
                      ? 'logIn'
                      : 'signUp'
                  ].status === 'on' && (
                    <FooterButtonsContainer>
                      <StyledText
                        type="Subtitle2"
                        font="Primary"
                        color="secondary600"
                        textAlign="center"
                        weight={400}
                      >
                        {`authentication:Authentication.${
                          useAuthenticationHook.toggleForm === 'logIn'
                            ? 'noAccount'
                            : useAuthenticationHook.toggleForm === 'accountRecovery'
                            ? 'rememberedPassword'
                            : 'alreadyHaveAccount'
                        }`}
                      </StyledText>
                      <FormActionTouchable
                        onPress={() => useAuthenticationHook.toggleFormHandler(undefined)}
                      >
                        <StyledText
                          type="Subtitle2"
                          font="Primary"
                          color="secondary800"
                          textAlign="center"
                          weight={500}
                        >
                          {`authentication:Authentication.form.submitButtons.${
                            useAuthenticationHook.toggleForm === 'logIn'
                              ? 'signUpText'
                              : 'logInText'
                          }`}
                        </StyledText>
                      </FormActionTouchable>
                    </FooterButtonsContainer>
                  )}
                </SubFormContainer>
              </TransformAnimation>
            </OpacityAnimation>
          </StyledScrollView>
        </BodyContainer>
      }
      primaryButton={
        useAuthenticationHook.enableBiometrics && useAuthenticationHook.toggleForm === 'logIn'
          ? undefined
          : useAuthenticationHook.primaryButton
      }
    />
  );
};

export default memo(Authentication);
