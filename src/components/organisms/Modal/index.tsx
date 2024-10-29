import React, { Fragment, memo } from 'react';
import { useModalSelectorHook } from '@redux/hooks';
import { type ModalPayload } from '@slices/types/modal';
import Alert from '@components/organisms/Modal/Alert';
import BottomSheet from '@components/organisms/Modal/BottomSheet';

const AlertAndBottomSheet: React.FC = () => {
  const modalSelector = useModalSelectorHook();
  const { type } = modalSelector;

  let modalArgs: ModalPayload = {};

  switch (type) {
    case 'alert':
      modalArgs = {
        ...modalSelector,
        // isVisible: true,
        onModalHide: modalSelector.onClose,
        options: undefined,
        showCloseModalIcon: true,
      };
      break;
    case 'bottomsheet':
      modalArgs = {
        ...modalSelector,
        body: modalSelector.body,
        // isVisible: true,
      };
      break;

    default:
      break;
  }

  if (!type) return <Fragment></Fragment>;
  if (type === 'alert') return <Alert />;
  if (type === 'bottomsheet') return <BottomSheet {...modalArgs} />;
  return <Fragment></Fragment>;
};

export default memo(AlertAndBottomSheet);
