import React, { memo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedParamsList } from '@navigators/Shared';
import { CallToAction } from '@components/templates';
import { useTasks } from './hooks/useTasks';
import { BodyContainer, FeatureButton, FeaturesContainer, ListItems } from './styles';

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
          <ListItems
            data={useTasksHook.itemList}
            searchLabel={useTasksHook.tasksSearcher}
            filterBy={useTasksHook.filterBy}
            showEmptyData={!useTasksHook.isLoading && useTasksHook.itemList.length === 0}
            scrollEnabled={true}
            useFlashList={true}
            draggable={!true}
            swipeable={true}
            renderRightActions={
              useTasksHook.itemList.length > 0 ? useTasksHook.renderRightActions : undefined
            }
            renderLeftActions={
              useTasksHook.itemList.length > 0 ? useTasksHook.renderLeftActions : undefined
            }
            renderItem={useTasksHook.renderItemComponent}
            footerComponent={useTasksHook.TaskSkeleton}
          />
        </BodyContainer>
      }
    />
  );
};

export default memo(Tasks);
