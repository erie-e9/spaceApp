import { useCallback } from 'react';
import { useCopy } from '@services';
import { useModal, useToast } from '@hooks';

export const useAppAlerts = (): {
  showFeatureUnavailableToast: (callback?: () => void) => void;
  showFeatureUnavailableAlert: (callback?: () => void) => void;
} => {
  const { showModal } = useModal();
  const { getCopyValue } = useCopy();

  const showFeatureUnavailableToast = useCallback(
    (callback?: () => void): void => {
      useToast.warning({
        message: getCopyValue('common:messages.features.unavailable.title'),
        duration: 3000,
      });
      if (callback) callback();
    },
    [],
  );

  const showFeatureUnavailableAlert = useCallback(
    (callback?: () => void): void => {
      showModal({
        type: 'alert',
        title: 'common:messages.features.unavailable.title',
        description: 'common:messages.features.unavailable.body',
        legacyOptions: { typeError: 'error' },
      });
      if (callback) callback();
    },
    [],
  );

  return {
    showFeatureUnavailableToast,
    showFeatureUnavailableAlert,
  };
};

export default useAppAlerts;
