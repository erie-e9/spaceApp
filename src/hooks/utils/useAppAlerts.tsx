import { useCallback } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logger, useCopy } from '@services';
import { type ApplicationScreenProps } from '@types';
import { testProperties } from '@utils/functions';
import { useModal, useResponseHandler, useToast } from '@hooks';
import { OTPInput } from '@components/molecules';

export const useAppAlerts = (): {
  showFeatureUnavailableToast: (callback?: () => void) => void;
  showFeatureUnavailableAlert: (callback?: () => void) => void;
  showBlockedPermissionAlert: (callback?: () => void) => void;
  showDeniedPermissionAlert: (callback?: () => void) => void;
  showSendOTPAlert: (callback: (value?: string) => void) => void;
  showAskForAuthAlert: () => void;
  showItemCreateActionToastSuccess: (callback?: () => void) => void;
  showCreateItemActionToastFailure: (callback?: () => void) => void;
  showUpdateItemActionToastSuccess: (callback?: () => void) => void;
  showUpdateItemActionToastFailure: (callback?: () => void) => void;
  showRemoveItemActionToastSuccess: (callback?: () => void) => void;
  showRemoveItemActionToastFailure: (callback?: () => void) => void;
  confirmRemoveActionAlert: (callback?: () => void) => Promise<void>;
  showActionWillBeTriggeredToast: (callback?: () => void) => void;
  showQueueUpdatedToast: (callback?: () => void) => void;
  confirmChangeQueueAlert: (callback?: () => void) => Promise<void>;
  confirmRemoveQueueActionAlert: (callback?: () => void) => Promise<void>;
} => {
  const { showModal, hideModal } = useModal();
  const { getCopyValue } = useCopy();
  const { setLoading } = useResponseHandler();
  const navigation: ApplicationScreenProps = useNavigation();

  const showFeatureUnavailableToast = useCallback((callback?: () => void): void => {
    useToast.warning({
      message: 'common:messages.features.unavailable.title',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showFeatureUnavailableAlert = useCallback((callback?: () => void): void => {
    showModal({
      type: 'alert',
      title: 'common:messages.features.unavailable.title',
      description: 'common:messages.features.unavailable.body',
    });
    callback?.();
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
          isSimpleButton: false,
          color: 'typography50',
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

  const showItemCreateActionToastSuccess = useCallback((callback?: () => void): void => {
    useToast.success({
      message: 'common:toasts.crudActions.create.success',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showCreateItemActionToastFailure = useCallback((callback?: () => void): void => {
    useToast.error({
      message: 'common:toasts.crudActions.create.failure',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showUpdateItemActionToastSuccess = useCallback((callback?: () => void): void => {
    useToast.success({
      message: 'common:toasts.crudActions.update.success',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showUpdateItemActionToastFailure = useCallback((callback?: () => void): void => {
    useToast.error({
      message: 'common:toasts.crudActions.update.failure',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showRemoveItemActionToastSuccess = useCallback((callback?: () => void): void => {
    useToast.success({
      message: 'common:toasts.crudActions.delete.success',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showRemoveItemActionToastFailure = useCallback((callback?: () => void): void => {
    useToast.error({
      message: 'common:toasts.crudActions.delete.failure',
      duration: 3000,
    });
    callback?.();
  }, []);

  const confirmRemoveActionAlert = useCallback(async (callback?: () => void): Promise<void> => {
    await setLoading(true);
    await showModal({
      type: 'alert',
      title: 'common:alerts.crudActions.delete.title',
      description: 'common:alerts.crudActions.delete.description',
      showCancelIcon: true,
      onCloseIcon: () => setLoading(false),
      buttonsStyles: {
        direction: 'row',
        alignment: 'right',
      },
      lockBackdrop: true,
      options: [
        {
          text: 'common:alerts.crudActions.delete.options.cancelButton',
          handler: async () => {
            await hideModal();
            await setLoading(false);
          },
          isSimpleButton: true,
          color: 'typography950',
        },
        {
          text: 'common:alerts.crudActions.delete.options.confirmButton',
          handler: async () => {
            await callback?.();
            await setLoading(false);
            await hideModal();
          },
          isSimpleButton: true,
          color: 'danger_status',
        },
      ],
    });
  }, []);

  const showActionWillBeTriggeredToast = useCallback((callback?: () => void): void => {
    useToast.warning({
      message: 'common:toasts.crudActions.actionWillBeTriggered.message',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showQueueUpdatedToast = useCallback((callback?: () => void): void => {
    useToast.info({
      message: 'common:toasts.crudActions.queueUpdated',
      duration: 3000,
    });
    callback?.();
  }, []);

  const confirmChangeQueueAlert = useCallback(async (callback?: () => void): Promise<void> => {
    await setLoading(true);
    await showModal({
      type: 'alert',
      title: 'common:alerts.crudActions.changeDeleteToUpdate.title',
      description: 'common:alerts.crudActions.changeDeleteToUpdate.description',
      showCancelIcon: true,
      onCloseIcon: () => setLoading(false),
      buttonsStyles: {
        direction: 'row',
        alignment: 'right',
      },
      lockBackdrop: true,
      options: [
        {
          text: 'common:alerts.crudActions.changeDeleteToUpdate.options.cancelButton',
          handler: async () => {
            await hideModal();
            await setLoading(false);
          },
          isSimpleButton: true,
          color: 'typography950',
        },
        {
          text: 'common:alerts.crudActions.changeDeleteToUpdate.options.confirmButton',
          handler: async () => {
            await callback?.();
            await setLoading(false);
            await hideModal();
          },
          isSimpleButton: true,
          color: 'warning_status',
        },
      ],
    });
  }, []);

  const confirmRemoveQueueActionAlert = useCallback(
    async (callback?: () => void): Promise<void> => {
      await setLoading(true);
      await showModal({
        type: 'alert',
        title: 'common:alerts.crudActions.deletePending.title',
        description: 'common:alerts.crudActions.deletePending.description',
        showCancelIcon: true,
        onCloseIcon: () => setLoading(false),
        buttonsStyles: {
          direction: 'row',
          alignment: 'right',
        },
        lockBackdrop: true,
        options: [
          {
            text: 'common:alerts.crudActions.deletePending.options.cancelButton',
            handler: async () => {
              await hideModal();
              await setLoading(false);
            },
            isSimpleButton: true,
            color: 'typography950',
          },
          {
            text: 'common:alerts.crudActions.deletePending.options.confirmButton',
            handler: async () => {
              await callback?.();
              await setLoading(false);
              await hideModal();
            },
            isSimpleButton: true,
            color: 'danger_status',
          },
        ],
      });
    },
    [],
  );

  return {
    showFeatureUnavailableToast,
    showFeatureUnavailableAlert,
    showBlockedPermissionAlert,
    showDeniedPermissionAlert,
    showSendOTPAlert,
    showAskForAuthAlert,
    showItemCreateActionToastSuccess,
    showCreateItemActionToastFailure,
    showUpdateItemActionToastSuccess,
    showUpdateItemActionToastFailure,
    showRemoveItemActionToastSuccess,
    showRemoveItemActionToastFailure,
    confirmRemoveActionAlert,
    showActionWillBeTriggeredToast,
    showQueueUpdatedToast,
    confirmChangeQueueAlert,
    confirmRemoveQueueActionAlert,
  };
};
