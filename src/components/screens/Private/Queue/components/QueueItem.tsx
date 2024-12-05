import { FC, memo, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { testProperties } from '@utils/functions';
import { useTheme } from '@hooks';
// import { labels } from '@utils/forms/labels';
import { dayjs } from '@utils/formatters';
import {
  type QueueMethodType,
  type ApplicationScreenProps,
  type QueueURLType,
  type Task,
} from '@types';
import TaskItem from '@components/screens/Private/Tasks/components/TaskItem';
import { QueueTagText, QueueItemContainer, QueueTagContainer, QueueMetaContainer } from './styles';
import { IQueueItem } from '..';

export interface QueueItemProps {
  testID?: string;
  item: IQueueItem;
  itemHeight?: number | undefined;
}

export const QueueItem: FC<QueueItemProps> = ({ testID, item, itemHeight }) => {
  const navigation: ApplicationScreenProps = useNavigation();
  // const { queueEndpoints, queueMethod } = labels();
  const { darkMode } = useTheme();

  const formattedCreatedAt = useMemo(() => {
    return `${dayjs(item?.body?.timestamp || item?.timestamp).fromNow(false)}`;
  }, [item]);

  const colorTagBackground: { [key in QueueMethodType]: string } = useMemo(() => {
    return {
      GET: 'secondary200',
      POST: 'success_status',
      PUT: 'info_status',
      PATCH: 'info_status',
      DELETE: 'danger_status',
    };
  }, []);

  const colorTagColor: { [key in QueueMethodType]: string } = useMemo(() => {
    return {
      GET: darkMode ? 'secondary200' : 'typography900',
      POST: darkMode ? 'typography100' : 'typography900',
      PUT: darkMode ? 'typography900' : 'typography100',
      PATCH: darkMode ? 'typography900' : 'typography100',
      DELETE: darkMode ? 'typography900' : 'typography100',
    };
  }, []);

  const queueMethod: { [key in QueueMethodType]: string } = useMemo(() => {
    return {
      GET: 'queue:Queue.httpVerbs.get',
      POST: 'queue:Queue.httpVerbs.post',
      PUT: 'queue:Queue.httpVerbs.put',
      PATCH: 'queue:Queue.httpVerbs.patch',
      DELETE: 'queue:Queue.httpVerbs.delete',
    };
  }, []);

  const queueEndpoints: { [key in QueueURLType]: string } = useMemo(() => {
    return {
      tasks: 'menu:Menu.menu.items.tasks.title',
    };
  }, []);

  const groupLabel = useMemo(() => {
    if (item.url.includes('/')) {
      return item.url.split('/')[0];
    }
    return item.url;
  }, [item.url]);

  const itemFormmated = useMemo((): Partial<IQueueItem> => {
    const indexedItem = { ...item, ...item.body, id: item.method === 'POST' ? null : item.id };
    // console.log('itemFormmated', { indexedItem });
    return indexedItem;
  }, [item]);

  return (
    <QueueItemContainer {...testProperties(testID || 'QueueItemID')}>
      {groupLabel === 'tasks' && (
        <>
          <TaskItem
            item={itemFormmated as Task}
            itemHeight={itemHeight}
            // rightContent={formattedCreatedAt}
            onPress={() =>
              navigation.navigate('Private', {
                screen: 'Task',
                params: { task: itemFormmated },
              } as never)
            }
          />
        </>
      )}
      <QueueMetaContainer>
        <QueueTagContainer backgroundColor="tertiary200">
          <QueueTagText type="Label" color="tertiary700">
            {queueEndpoints[groupLabel]}
          </QueueTagText>
        </QueueTagContainer>
        <QueueTagContainer backgroundColor={colorTagBackground[itemFormmated.method]}>
          <QueueTagText type="Label" color={colorTagColor[itemFormmated.method]}>
            {queueMethod[itemFormmated?.method]}
          </QueueTagText>
        </QueueTagContainer>
        <QueueTagContainer backgroundColor="tertiary200">
          <QueueTagText type="Label" color="tertiary700">
            {formattedCreatedAt}
          </QueueTagText>
        </QueueTagContainer>
      </QueueMetaContainer>
    </QueueItemContainer>
  );
};

export default memo(QueueItem);
