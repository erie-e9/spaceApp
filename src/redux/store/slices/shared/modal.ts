import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type ModalProps } from '@slices/types';

const initialState: Partial<ModalProps> = {
  isVisible: false,
  title: '',
  type: null,
  description: '',
  showCancelIcon: true,
  body: undefined,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (_state, { payload }: PayloadAction<Partial<ModalProps>>) => {
      return {
        ...initialState,
        isVisible: true,
        showCancelIcon: true,
        body: payload.body,
        ...payload,
      };
    },
    hideModal: (state) => {
      if (state.type?.includes('bottomsheet')) {
        return initialState;
      }
      return { ...state, isVisible: false };
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
