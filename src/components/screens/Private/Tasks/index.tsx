import React, { memo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedParamsList } from '@navigators/Shared';
import { type Task } from '@utils/types';
import { Loader } from '@components/molecules';
import { CallToAction } from '@components/templates';
import { useTasks } from './hooks/useTasks';
import TaskItem from './components/TaskItem';
import {
  BodyContainer,
  FeatureButton,
  FeaturesContainer,
  ListItems,
  LoaderContainer,
} from './styles';

export interface TasksProps {
  navigation: StackNavigationProp<SharedParamsList>;
}

export const Tasks: React.FC<TasksProps> = ({ navigation }) => {
  const useTasksHook = useTasks({ navigation });

  return (
    <CallToAction
      testID="TasksID"
      title={useTasksHook.tasksHeaderTitle}
      description={'tasks:Tasks.description'}
      numberOfLinesTitle={3}
      backButton
      headerOptions={
        <FeaturesContainer>
          <FeatureButton
            onPress={useTasksHook.showPopUp}
            type="Icon"
            iconType="svg"
            icon="menu"
            textColor="typography800"
          />
        </FeaturesContainer>
      }
      body={
        <BodyContainer>
          {useTasksHook.isLoading ? (
            <Loader width={150} height={75} />
          ) : (
            <ListItems
              data={
                useTasksHook.itemList.length > 0
                  ? useTasksHook.itemList
                  : Array.from({ length: 7 }).map((_) => null)
              }
              searchLabel={useTasksHook.tasksSearcher}
              scrollEnabled={true}
              useFlashList
              filterBy={useTasksHook.filterBy}
              draggable={!true}
              swipeable={true}
              renderRightActions={!useTasksHook.isLoading && useTasksHook.renderRightActions}
              renderLeftActions={!useTasksHook.isLoading && useTasksHook.renderLeftActions}
              listEmptyComponent={
                <LoaderContainer>
                  <Loader width={150} height={75} />
                </LoaderContainer>
              }
              // extraFunction={() => navigation.navigate('Private', { screen: 'Task' })}
              renderItem={({ item }: { item: Task }) => {
                return <TaskItem item={item} itemHeight={70} onPress={useTasksHook.taskForm} />;
              }}
            />
          )}
        </BodyContainer>
      }
    />
  );
};

export default memo(Tasks);
