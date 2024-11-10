import { useSelector } from 'react-redux';
import { type ModalProps } from '@slices/types';

export const useModalSelectorHook = (): Partial<ModalProps> =>
  useSelector((state: { modal: ModalProps }) => state.modal);
