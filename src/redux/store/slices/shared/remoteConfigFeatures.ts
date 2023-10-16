import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export const initialState: RemoteConfigFeatures = {
  changeLanguage: { status: 'on' },
  triggerAlert: { status: 'on' },
  warning: { status: 'on' },
  changeTheme: { status: 'on' },
};

const slice = createSlice({
  name: 'remoteConfigFeatures',
  initialState,
  reducers: {
    updateRemoteConfigFeatures: (
      state,
      { payload }: PayloadAction<RemoteConfigFeatures>,
    ) => ({
      ...state,
      ...payload,
    }),
  },
});

export const { updateRemoteConfigFeatures } = slice.actions;

export default slice.reducer;
