import { useEffect, useState } from 'react';
import NetInfo, {
  NetInfoState,
  NetInfoStateType,
} from '@react-native-community/netinfo';

interface CheckNetProps {
  appConnected: Partial<NetInfoState>;
}

export const useCheckNet = (): CheckNetProps => {
  const [appConnected, setAppConnected] = useState<Partial<NetInfoState>>({
    isConnected: true,
    isInternetReachable: true,
    type: NetInfoStateType.wifi,
  });

  useEffect(() => {
    const subscription = NetInfo.addEventListener(change => {
      setAppConnected(change);
    });

    return () => {
      subscription();
    };
  }, []);

  return { appConnected: appConnected as Partial<NetInfoState> };
};
