import { useDispatch } from 'react-redux';
import {
  showModal as showModalSlice,
  hideModal as hideModalSlice,
} from '@slices/shared/modal';
import { ModalPayload } from '@slices/types/modal';

export const useModal = (): {
  showModal: (params: ModalPayload) => void;
  hideModal: () => void;
} => {
  const dispatch = useDispatch();

  const showModal = (params: ModalPayload): void => {
    if (!params.ignoreHide) hideModal();
    dispatch(showModalSlice(params));
  };

  const hideModal = (): void => {
    dispatch(hideModalSlice());
  };

  return {
    showModal,
    hideModal,
  };
};

export default useModal;
