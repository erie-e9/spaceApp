import { useCallback } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logger, useCopy } from '@services';
import { useModal, useToast } from '@hooks';
import { OTPInput } from '@components/molecules';
import { type ApplicationScreenProps } from '@types';
import { testProperties } from '@utils/functions';

export const useAppAlerts = (): {
  showFeatureUnavailableToast: (callback?: () => void) => void;
  showFeatureUnavailableAlert: (callback?: () => void) => void;
  showBlockedPermissionAlert: (callback?: () => void) => void;
  showDeniedPermissionAlert: (callback?: () => void) => void;
  showSendOTPAlert: (callback: (value?: string) => void) => void;
  showAskForAuthAlert: () => void;
} => {
  const { showModal } = useModal();
  const { getCopyValue } = useCopy();
  const navigation: ApplicationScreenProps = useNavigation();

  const showFeatureUnavailableToast = useCallback((callback?: () => void): void => {
    useToast.warning({
      message: 'common:messages.features.unavailable.title',
      duration: 3000,
    });
    if (callback) callback();
  }, []);

  const showFeatureUnavailableAlert = useCallback((callback?: () => void): void => {
    showModal({
      type: 'alert',
      title: 'common:messages.features.unavailable.title',
      description: 'common:messages.features.unavailable.body',
    });
    if (callback) callback();
  }, []);

  const showBlockedPermissionAlert = useCallback((callback?: () => void) => {
    showModal({
      type: 'alert',
      title: 'common:alerts.permissions.blocked.title',
      showCancelIcon: true,
      description: 'common:alerts.permissions.blocked.description',
      options: [
        {
          text: 'common:alerts.permissions.blocked.buttons.buttonOne',
          handler: callback && callback,
        },
      ],
    });
  }, []);

  const showDeniedPermissionAlert = useCallback((callback?: () => void) => {
    showModal({
      type: 'alert',
      title: 'common:alerts.permissions.denied.title',
      showCancelIcon: true,
      description: getCopyValue('common:alerts.permissions.denied.description', {
        deviceName: Platform.OS === 'ios' ? 'iPhone' : 'Android',
      }),
      options: [
        {
          text: 'common:alerts.permissions.denied.buttons.buttonOne',
          handler: callback && callback,
        },
      ],
    });
  }, []);

  const sendSignUpCode = useCallback(async () => {
    Logger.log('Resend code');
  }, []);

  const showSendOTPAlert = useCallback((callback: (value?: string) => void) => {
    showModal({
      type: 'alert',
      showCancelIcon: true,
      title: 'authentication:Authentication.otp.alert.title',
      // onModalHide: () => {
      //   setPrimaryButtonLoading(false);
      //   setDisableContinueButton(false);
      // },
      description: 'authentication:Authentication.otp.alert.description',
      body: (
        <OTPInput
          length={4}
          onSuccess={callback}
          {...testProperties('OTPInput')}
          // error={errorCode}
          code={'1234'}
        />
      ),
      options: [
        {
          text: 'authentication:Authentication.otp.alert.buttons.primaryButton',
          handler: sendSignUpCode,
        },
      ],
    });
  }, []);

  const showAskForAuthAlert = useCallback(() => {
    showModal({
      type: 'alert',
      title: 'common:alerts.authRequired.title',
      description: 'common:alerts.authRequired.description',
      showCancelIcon: true,
      lockBackdrop: false,
      options: [
        {
          text: 'common:alerts.authRequired.buttons.buttonOne',
          handler: () =>
            navigation.reset({
              index: 2,
              routes: [
                { name: 'Shared', params: { screen: 'Home' } },
                { name: 'Shared', params: { screen: 'Settings' } },
                { name: 'Auth', params: { screen: 'Authentication' } },
              ],
            }),
        },
      ],
    });
  }, []);

  return {
    showFeatureUnavailableToast,
    showFeatureUnavailableAlert,
    showBlockedPermissionAlert,
    showDeniedPermissionAlert,
    showSendOTPAlert,
    showAskForAuthAlert,
  };
};
