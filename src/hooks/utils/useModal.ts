import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showModal as showModalSlice, hideModal as hideModalSlice } from '@slices/shared/modal';
import { type ModalPayload } from '@slices/types/modal';

export const useModal = (): {
  showModal: (params: ModalPayload) => void;
  hideModal: () => void;
} => {
  const dispatch = useDispatch();

  const showModal = useCallback((params: ModalPayload): void => {
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
