import { useEffect, useState } from 'react';
import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';

interface CheckNetProps {
  isOnline: Partial<NetInfoState>;
}

export const useCheckNet = (): CheckNetProps => {
  const [isOnline, setIsOnline] = useState<Partial<NetInfoState>>({
    isConnected: true,
    isInternetReachable: true,
    type: NetInfoStateType.wifi,
  });

  useEffect(() => {
    const checkConnection = async () => {
      const state = await NetInfo.fetch();
      setIsOnline(state);
    };

    checkConnection();
    const subscription = NetInfo.addEventListener((state) => {
      setIsOnline(state);
    });

    return () => {
      subscription && subscription();
    };
  }, []);

  return { isOnline: isOnline as Partial<NetInfoState> };
};
