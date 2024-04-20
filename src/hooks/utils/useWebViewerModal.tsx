import { useModal, useSVG } from '@hooks';
import { useCallback } from 'react';

export const useSetThemeModal = (): {
  useWebViewerModal: () => Promise<void>;
} => {
  // Global Hooks
  const { showModal } = useModal();

  const BrowserIcon = useSVG('BrowserIcon');
  const ReloadIcon = useSVG('ReloadIcon');
  const ShareIcon = useSVG('ShareIcon');

  const modalOptions = [];

  modalOptions.push({
    title: '',
    icon: <></>,
    onPress: () => console.log(''),
    status: true,
  });

  const useWebViewerModal = useCallback(async () => {
    showModal({
      type: 'bottomsheet',
      body: <></>,
      drawerOptions: {
        height: 175,
      },
    });
  }, []);

  return { useWebViewerModal };
};
