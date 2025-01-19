import { Dispatch, useCallback } from 'react';
import { updateRemoteConfigFeatures } from '@slices/shared';
import { remoteConfigFeatures, Logger } from '@services';

export const useRemoteConfig = (
  dispatch: Dispatch<any>,
): {
  getRemoteFeatures(): Promise<any>;
} => {
  const getRemoteFeatures = useCallback(async (): Promise<any> => {
    try {
      const features = await remoteConfigFeatures();
      dispatch(updateRemoteConfigFeatures(features));
      return features;
    } catch (err: unknown) {
      Logger.warn(err);
    }
    return {};
  }, []);

  return { getRemoteFeatures };
};
