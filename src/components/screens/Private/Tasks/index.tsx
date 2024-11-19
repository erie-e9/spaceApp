import React, { memo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedParamsList } from '@navigators/Shared';
import { type Task } from '@utils/types';
import { CallToAction } from '@components/templates';
import { useTasks } from './hooks/useTasks';
import TaskItem from './components/TaskItem';
import SwipeableTaskOptions from './components/SwipeableTaskOptions';
import { BodyContainer, ListItems } from './styles';

export interface TasksProps {
  navigation: StackNavigationProp<SharedParamsList>;
}

export const Tasks: React.FC<TasksProps> = ({ navigation }) => {
  const useTasksHook = useTasks({ navigation });
  // if (useTasksHook.isLoading) {return <LoaderContainer>
  //       <Loader width={150} height={75} /></LoaderContainer>}

  return (
    <CallToAction
      testID="TasksID"
      title={useTasksHook.tasksHeaderTitle}
      description={useTasksHook.tasksHeaderDescription}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <ListItems
            data={useTasksHook.itemList}
            searchLabel={useTasksHook.tasksSearcher}
            scrollEnabled={true}
            swipeable={true}
            useFlashList
            filterBy={['title', 'description', 'priority']}
            renderRightAction={SwipeableTaskOptions().renderRightAction}
            renderRightActions={SwipeableTaskOptions().renderRightActions}
            renderLeftAction={SwipeableTaskOptions().renderLeftAction}
            renderLeftActions={SwipeableTaskOptions().renderLeftActions}
            draggable={!true}
            extraFunction={() => navigation.navigate('Private', { screen: 'Task' })}
            renderItem={({ item }: { item: Task }) => {
              return <TaskItem item={item} itemHeight={70} onPress={useTasksHook.taskFormModal} />;
            }}
          />
        </BodyContainer>
      }
    />
  );
};

export default memo(Tasks);
