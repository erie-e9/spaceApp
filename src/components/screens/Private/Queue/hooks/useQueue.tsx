import { useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Logger, useCopy } from '@services';
import { useAppAlerts, useMMKVStorageArray, useTasks } from '@hooks';
import { SVGIcon } from '@components/atoms';
import { SwipeButton } from '../styles';

export const useQueue = () => {
  const [queue, setQueue] = useState<any[]>([]);
  const { getCopyValue } = useCopy();
  const { confirmRemoveActionAlert, confirmRemoveQueueActionAlert } = useAppAlerts();
  const { getTaskByIdHook } = useTasks();
  const { getMMKVData, removeMMKVItem, clearMMKVData } = useMMKVStorageArray<any>({
    key: 'requestQueue',
    defaultValue: [],
  });

  const extractIdFromUrl = (url: string): string => url.split('/').pop() ?? '';

  const getRequestQueue = useCallback(() => {
    const items = getMMKVData() || [];
    return items.map((item: any) => {
      const id = Number(extractIdFromUrl(item.url));
      const taskData = getTaskByIdHook(id);
      return {
        ...item,
        ...taskData,
      };
    });
  }, [getTaskByIdHook, getMMKVData]);

  useFocusEffect(
    useCallback(() => {
      const loadedQueue = getRequestQueue();
      setQueue(loadedQueue);
      return () => {
        Logger.log('Screen was unfocused');
      };
    }, []),
  );

  const itemList = useMemo(() => {
    return queue;
  }, [queue]);

  const QueueHeaderTitle = useMemo((): string => {
    return getCopyValue('queue:Queue.screenTitle', {
      count: queue.length > 0 ? `(${queue.length})` : '',
    });
  }, [queue]);

  const renderRightAction = useCallback(
    async (item: any): Promise<void> => {
      const { index } = item;
      if (index > -1) {
        await confirmRemoveQueueActionAlert(async () => {
          await removeMMKVItem(item.id || index);
          await setQueue(getRequestQueue());
        });
      }
    },
    [setQueue, getRequestQueue],
  );

  const renderRightActions = useCallback((item: any) => {
    return (
      <SwipeButton backgroundColor={'danger_status'} onPress={() => renderRightAction(item)}>
        <SVGIcon icon={'remove'} />
      </SwipeButton>
    );
  }, []);

  const clearQueue = useCallback(async (): Promise<void> => {
    await confirmRemoveActionAlert(async () => {
      await clearMMKVData();
      await setQueue(getRequestQueue());
    });
  }, []);

  return {
    itemList,
    clearQueue,
    QueueHeaderTitle,
    getRequestQueue,
    renderRightActions,
  };
};
