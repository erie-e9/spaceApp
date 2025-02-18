import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showModal as showModalSlice, hideModal as hideModalSlice } from '@slices/shared';
import type { ModalProps } from '@slices/types';

export const useModal = (): {
  hideModal: () => void;
  showModal: (params: ModalProps) => void;
} => {
  const dispatch = useDispatch();

  const hideModal = useCallback((): void => {
    dispatch(hideModalSlice());
  }, [dispatch]);

  const showModal = useCallback(
    (params: ModalProps): void => {
      if (params.showCloseModalIcon) {
        hideModal();
      }
      dispatch(showModalSlice(params));
    },
    [dispatch, hideModal],
  );

  return {
    hideModal,
    showModal,
  };
};
