import React, { memo } from 'react';
import { useModalSelectorHook } from '@redux/hooks';
import { ModalPayload } from '@slices/types/modal';
import Alert from '@components/organisms/Modal/Alert';
import BottomSheet from '@components/organisms/Modal/BottomSheet';

const AlertsAndDrawers: React.FC = () => {
  const modalSelector = useModalSelectorHook();
  const { type } = modalSelector;

  if (!type) return <></>;

  let modalArgs: ModalPayload = {};

  switch (type) {
    case 'alert':
      modalArgs = {
        ...modalSelector,
        // isVisible: true,
        onModalHide: modalSelector.onClose,
        options: undefined,
        showCloseModalIcon: true,
        ...modalSelector.legacyOptions,
      };
      break;
    case 'bottomsheet':
      modalArgs = {
        ...modalSelector,
        // isVisible: true,
        ...modalSelector.legacyOptions,
      };
      break;

    default:
      break;
  }

  if (type === 'alert') return <Alert {...modalArgs} />;
  if (type === 'bottomsheet') return <BottomSheet {...modalArgs} />;
  return <></>;
};

export default memo(AlertsAndDrawers);
