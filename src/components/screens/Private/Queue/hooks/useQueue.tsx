import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCopy } from '@services';
import { useAppAlerts, useMMKVStorageArray, useResponseHandler, useTasks } from '@hooks';
import { Skeleton } from '@components/animated';
import { SVGIcon } from '@components/atoms';
import {
  SwipeButton,
  SkeletonContainer,
  RightSkeletonContainer,
  SkeletonLeftContentData,
  FooterSkeletonContainer,
  SkeletonChildContainer,
} from '../styles';

export const useQueue = () => {
  const [queue, setQueue] = useState<any[]>([]);
  const { getCopyValue } = useCopy();
  const { setLoading, loading } = useResponseHandler();
  const { confirmRemoveActionAlert, confirmRemoveQueueActionAlert } = useAppAlerts();
  const { getTaskByIdHook } = useTasks();
  const { getMMKVData, removeMMKVItem, clearMMKVData } = useMMKVStorageArray<any>({
    key: 'requestQueue',
    defaultValue: [],
  });

  const extractIdFromUrl = (url: string): string => url.split('/').pop() ?? '';

  const getRequestQueue = useCallback(() => {
    setLoading(true);
    const items = getMMKVData() || [];
    setLoading(false);
    return items.map((item: any) => {
      const id = Number(extractIdFromUrl(item.url));
      const taskData = getTaskByIdHook(id);
      return {
        ...item,
        ...taskData,
      };
    });
  }, [setLoading, getMMKVData, getTaskByIdHook]);

  const refetch = useCallback(() => {
    const queueList = getRequestQueue();
    setLoading(true);
    setQueue(queueList);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [getRequestQueue, setLoading]);

  useFocusEffect(refetch);

  const itemList = useMemo(() => queue, [queue]);

  const filterBy = useMemo(() => {
    return itemList.length > 0 ? ['title', 'description'] : undefined;
  }, [itemList]);

  const queueSearcher = useMemo((): string => {
    return 'queue:Queue.controllers.searchInputLabel';
  }, []);

  const queueHeaderTitle = useMemo((): string => {
    return getCopyValue('queue:Queue.screenTitle', {
      count: queue.length > 0 ? `(${queue.length})` : '',
    });
  }, [getCopyValue, queue]);

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
    [confirmRemoveQueueActionAlert, removeMMKVItem, getRequestQueue],
  );

  const renderRightActions = useCallback(
    (item: any) => {
      return (
        <SwipeButton backgroundColor={'danger_status'} onPress={() => renderRightAction(item)}>
          <SVGIcon icon={'remove'} />
        </SwipeButton>
      );
    },
    [renderRightAction],
  );

  const clearQueue = useCallback(async (): Promise<void> => {
    await confirmRemoveActionAlert(async () => {
      await clearMMKVData();
      await setQueue(getRequestQueue());
    });
  }, [clearMMKVData, confirmRemoveActionAlert, getRequestQueue]);

  const QueueSkeleton = useMemo(() => {
    return loading ? (
      <Fragment>
        {Array.from({ length: itemList.length > 0 ? 1 : 3 }).map((_, index) => {
          const skeletonProps = {
            show: true,
            // animationType: 'shiver' as AnimationType,
            duration: 1200,
            backgroundColor: 'tertiary200',
          };
          return (
            <SkeletonContainer key={index}>
              <SkeletonChildContainer>
                <SkeletonLeftContentData>
                  <Skeleton {...skeletonProps} height={12} width={100} borderRadius={5} />
                  <Skeleton {...skeletonProps} height={12} width={200} borderRadius={5} />
                  <Skeleton {...skeletonProps} height={10} width={60} borderRadius={5} />
                </SkeletonLeftContentData>
                <RightSkeletonContainer>
                  <Skeleton {...skeletonProps} height={12} width={40} borderRadius={5} />
                  <Skeleton {...skeletonProps} height={10} width={30} borderRadius={5} />
                </RightSkeletonContainer>
              </SkeletonChildContainer>
              <FooterSkeletonContainer>
                <Skeleton {...skeletonProps} height={18} width={80} borderRadius={5} />
                <Skeleton {...skeletonProps} height={18} width={80} borderRadius={5} />
                <Skeleton {...skeletonProps} height={18} width={80} borderRadius={5} />
              </FooterSkeletonContainer>
            </SkeletonContainer>
          );
        })}
      </Fragment>
    ) : (
      <Fragment />
    );
  }, [itemList.length, loading]);

  return {
    itemList,
    filterBy,
    clearQueue,
    queueHeaderTitle,
    getRequestQueue,
    renderRightActions,
    QueueSkeleton,
    queueSearcher,
    refetch,
    loading,
  };
};
