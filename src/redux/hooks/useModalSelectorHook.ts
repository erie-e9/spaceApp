import { useSelector } from 'react-redux';
import { ModalPayload } from '@slices/types/modal';

export const useModalSelectorHook = (): Partial<ModalPayload> =>
  useSelector((state: { modal: ModalPayload }) => state.modal);
