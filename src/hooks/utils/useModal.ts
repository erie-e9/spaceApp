import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showModal as showModalSlice, hideModal as hideModalSlice } from '@slices/shared/modal';
import { type ModalProps } from '@slices/types';

export const useModal = (): {
  showModal: (params: ModalProps) => void;
  hideModal: () => void;
} => {
  const dispatch = useDispatch();

  const showModal = useCallback((params: ModalProps): void => {
    if (params.showCloseModalIcon) hideModal();
    dispatch(showModalSlice(params));
  }, []);

  const hideModal = useCallback((): void => {
    dispatch(hideModalSlice());
  }, []);

  return {
    showModal,
    hideModal,
  };
};
