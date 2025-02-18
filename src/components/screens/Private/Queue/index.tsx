import React, { memo } from 'react';
import type { QueueMethodType } from '@types';
import { CallToAction } from '@components/templates';
import { useQueue } from './hooks/useQueue';
import QueueItem from './components/QueueItem';
import { BodyContainer, FeatureButton, FeaturesContainer, ListItems } from './styles';

export interface IQueueItem {
  url: string;
  method: QueueMethodType;
  body: any;
  timestamp?: string;
  index?: React.Key;
}

export const Queue: React.FC = () => {
  const useQueueHook = useQueue();

  return (
    <CallToAction
      testID="QueueID"
      title={useQueueHook.queueHeaderTitle}
      description={'queue:Queue.description'}
      numberOfLinesTitle={3}
      backButton
      headerOptions={
        useQueueHook.itemList.length > 0 && (
          <FeaturesContainer>
            <FeatureButton
              onPress={useQueueHook.clearQueue}
              type="Icon"
              iconType="svg"
              icon="remove"
              textColor="typography800"
            />
          </FeaturesContainer>
        )
      }
      body={
        <BodyContainer>
          <ListItems
            data={useQueueHook.itemList}
            searchLabel={useQueueHook.queueSearcher}
            filterBy={useQueueHook.filterBy}
            showEmptyData={!useQueueHook.loading}
            scrollEnabled
            useFlashList
            draggable={false}
            swipeable
            renderRightActions={useQueueHook.renderRightActions}
            renderItem={({ item, index }: { item: IQueueItem; index: React.Key }) => {
              return <QueueItem key={index} item={{ ...item, index }} itemHeight={70} />;
            }}
            footerComponent={useQueueHook.QueueSkeleton}
            showReload
            refreshHandler={useQueueHook.refetch}
          />
        </BodyContainer>
      }
    />
  );
};

export default memo(Queue);
