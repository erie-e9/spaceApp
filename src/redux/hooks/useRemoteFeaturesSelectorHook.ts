import { useSelector } from 'react-redux';
import { RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export const useRemoteFeaturesSelectorHook = (): RemoteConfigFeatures =>
  useSelector(
    (state: { remoteConfigFeatures: RemoteConfigFeatures }) =>
      state.remoteConfigFeatures,
  );
