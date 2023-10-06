import { useEffect } from 'react';
import { AppState, BackHandler } from 'react-native';

interface NativeActionsProps {
  callback?: () => void;
}

export const useNativeActions = (): {
  useNativeBackButton: ({ callback }: NativeActionsProps) => void;
  useAppStateChange: ({ callback }: NativeActionsProps) => void;
} => {
  const useNativeBackButton = ({ callback }: NativeActionsProps): void => {
    useEffect(() => {
      const unsubscribe = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (callback) callback();

          return true;
        },
      );

      return () => unsubscribe.remove();
    }, []);
  };

  const useAppStateChange = ({ callback }: NativeActionsProps): any => {
    const appStateSubscription = AppState.addEventListener(
      'change',
      callback ? callback() : () => null,
    );
    return () => appStateSubscription.remove();
  };

  return { useNativeBackButton, useAppStateChange };
};

export default useNativeActions;
