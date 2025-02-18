import React, { useCallback } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Logger, useCopy } from '@services';
import type { ApplicationScreenProps } from '@types';
import { testProperties } from '@utils/functions';
import { useModal, useResponseHandler, useToast } from '@hooks';
import { OTPInput } from '@components/molecules';

export const useAppAlerts = () => {
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

  const showFeatureUnavailableAlert = useCallback(
    (callback?: () => void): void => {
      showModal({
        type: 'alert',
        title: 'common:messages.features.unavailable.title',
        description: 'common:messages.features.unavailable.body',
      });
      callback?.();
    },
    [showModal],
  );

  const showBlockedPermissionAlert = useCallback(
    (callback?: () => void) => {
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
    },
    [showModal],
  );

  const showDeniedPermissionAlert = useCallback(
    (callback?: () => void) => {
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
    },
    [getCopyValue, showModal],
  );

  const sendSignUpCode = useCallback(async () => {
    Logger.log('Resend code');
  }, []);

  const showSendOTPAlert = useCallback(
    (callback: (value?: string) => void) => {
      showModal({
        type: 'alert',
        showCancelIcon: true,
        isVisible: true,
        title: 'authentication:Authentication.otp.alert.title',
        description: 'authentication:Authentication.otp.alert.description',
        body: (
          <OTPInput
            length={4}
            onSuccess={async () => {
              await hideModal();
              await callback();
            }}
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
    },
    [hideModal, sendSignUpCode, showModal],
  );

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
                { name: 'Shared', params: { screen: 'Menu' } },
                { name: 'Auth', params: { screen: 'Authentication' } },
              ],
            }),
        },
      ],
    });
  }, [navigation, showModal]);

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

  const confirmRemoveActionAlert = useCallback(
    async (callback?: () => void): Promise<void> => {
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
    },
    [hideModal, setLoading, showModal],
  );

  const showActionWillBeTriggeredToast = useCallback((callback?: () => void): void => {
    useToast.warning({
      message: 'common:toasts.crudActions.actionWillBeTriggered.message',
      duration: 3000,
    });
    callback?.();
  }, []);

  const showQueueUpdatedToast = useCallback((callback?: () => void): void => {
    useToast.info({
      message: 'common:toasts.crudActions.queueUpdated.message',
      duration: 3000,
    });
    callback?.();
  }, []);

  const confirmChangeQueueAlert = useCallback(
    async (callback?: () => void): Promise<void> => {
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
    },
    [hideModal, setLoading, showModal],
  );

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
    [hideModal, setLoading, showModal],
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
