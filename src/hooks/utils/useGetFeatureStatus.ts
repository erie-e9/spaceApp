import { type FeatureValue, type RemoteConfigFeatures } from '@slices/types/remoteConfigFeatures';

export const useGetFeatureStatus = (
  featureKey: keyof RemoteConfigFeatures,
  features?: RemoteConfigFeatures,
): string => {
  let status = 'on';
  if ((features && !features[featureKey]) || typeof features !== 'object') {
    return status;
  }
  const featureValue = features[featureKey] as FeatureValue;
  if (Object.keys(featureValue).includes('status')) {
    status = (features[featureKey] as FeatureValue)?.status || 'on';
  }
  return status;
};
