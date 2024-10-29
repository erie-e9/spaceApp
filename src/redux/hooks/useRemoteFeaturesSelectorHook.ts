import { useSelector } from 'react-redux';
import { type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export const useRemoteFeaturesSelectorHook = (): RemoteConfigFeatures =>
  useSelector(
    (state: { remoteConfigFeatures: RemoteConfigFeatures }) => state.remoteConfigFeatures,
  );
