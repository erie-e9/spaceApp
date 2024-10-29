import { useEffect } from 'react';
import { BackHandler } from 'react-native';

interface NativeActionsProps {
  callback?: () => void;
}

export const useNativeActions = (): {
  useNativeBackButton: ({ callback }: NativeActionsProps) => void;
} => {
  const useNativeBackButton = ({ callback }: NativeActionsProps): void => {
    useEffect(() => {
      const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
        if (callback) callback();

        return true;
      });

      return () => unsubscribe.remove();
    }, []);
  };

  return { useNativeBackButton };
};
