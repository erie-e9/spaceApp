import { Fragment, useCallback } from 'react';
import { Logger } from '@services';
import { useModal, useSVG } from '@hooks';

export const useSetThemeModal = (): {
  useWebViewerModal: () => Promise<void>;
} => {
  // Global Hooks
  const { showModal } = useModal();

  const BrowserIcon = useSVG('browser');
  const ReloadIcon = useSVG('reload');
  const ShareIcon = useSVG('share');

  const modalOptions = [];

  modalOptions.push({
    title: '',
    icon: <Fragment></Fragment>,
    onPress: () => Logger.log(''),
    status: true,
  });

  const useWebViewerModal = useCallback(async () => {
    showModal({
      type: 'bottomsheet',
      body: <Fragment></Fragment>,
      dropdownOptions: {
        height: 175,
      },
    });
  }, []);

  return { useWebViewerModal };
};
