import React, { memo } from 'react';
import { QueueMethodType } from '@types';
import { CallToAction } from '@components/templates';
import { useQueue } from './hooks/useQueue';
import QueueItem from './components/QueueItem';
import { BodyContainer, FeatureButton, FeaturesContainer, ListItems } from './styles';

export interface IQueueItem {
  url: string;
  method: QueueMethodType;
  body: any;
  timestamp?: string;
  index?: number;
}

export const Queue: React.FC = () => {
  const useQueueHook = useQueue();

  return (
    <CallToAction
      testID="QueueID"
      title={useQueueHook.QueueHeaderTitle}
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
            searchLabel={'queue:Queue.controllers.searchInputLabel'}
            scrollEnabled={true}
            draggable={!true}
            swipeable={true}
            useFlashList
            filterBy={['title', 'description', 'priority']}
            renderRightActions={useQueueHook.renderRightActions}
            renderItem={({ item, index }: { item: IQueueItem; index: React.Key }) => {
              return <QueueItem key={index} item={{ ...item, index }} itemHeight={70} />;
            }}
          />
        </BodyContainer>
      }
    />
  );
};

export default memo(Queue);
