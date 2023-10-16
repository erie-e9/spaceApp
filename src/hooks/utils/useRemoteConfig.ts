import { useCallback } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { updateRemoteConfigFeatures } from '@slices/shared/remoteConfigFeatures';
import { remoteConfigFeatures, Logger } from '@services';

export const useRemoteConfig = (
  dispatch: Dispatch<AnyAction>,
): {
  getRemoteFeatures(): Promise<any>;
} => {
  const getRemoteFeatures = useCallback(async (): Promise<any> => {
    try {
      const features = await remoteConfigFeatures();
      dispatch(updateRemoteConfigFeatures(features));
      return features;
    } catch (err: unknown) {
      Logger.error(err);
    }
    return {};
  }, []);

  return { getRemoteFeatures };
};
export default useRemoteConfig;
