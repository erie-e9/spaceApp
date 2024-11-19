import React, { useCallback } from 'react';
import { Logger } from '@services';
import { Task } from '@types';
import { useTasks as useTasksHook, useShare } from '@hooks';
import { SVGIcon } from '@components/atoms';
import { SwipeButton, SwipeableFullContainer, AnimatedView } from './styles';

const SwipeableTaskOptions = (): {
  renderLeftAction: (task: Task) => void;
  renderLeftActions: (taks: Task) => JSX.Element;
  renderRightAction: (task: Task, type?: 'remove' | 'share') => void;
  renderRightActions: (task: Task) => JSX.Element;
} => {
  const { updateTaskHook, deleteTaskHook } = useTasksHook();
  const { shareMessage, shareCustomContent } = useShare();

  const renderLeftAction = useCallback(
    (task: Task) => {
      const { id } = task;
      try {
        if (id) {
          if ((task.status && task.status < 3) || task.status === null) {
            updateTaskHook({ id, ...task, status: 3 });
          } else {
            updateTaskHook({ id, ...task, status: 2 });
          }
        }
      } catch (error) {
        Logger.log('[SwipeableTaskOptions] renderLeftAction: ', { error });
      }
    },
    [updateTaskHook],
  );

  const renderLeftActions = useCallback((task: Task) => {
    return (
      <SwipeableFullContainer>
        <SwipeButton
          backgroundColor={task.status === 3 ? 'tertiary200' : 'primary500'}
          onPress={() => renderLeftAction(task)}
        >
          <SVGIcon
            icon={task.status === 3 ? 'arrowback' : 'check'}
            strokeWidth={task.status === 3 ? 1.5 : 2}
          />
        </SwipeButton>
      </SwipeableFullContainer>
    );
  }, []);

  const renderRightAction = useCallback(
    (task: Task, type?: 'remove' | 'share') => {
      const { id, title, description } = task;
      if (id) {
        if (type === 'remove') {
          deleteTaskHook({ id });
        } else {
          shareMessage(title);
        }
      }
    },
    [deleteTaskHook],
  );

  const renderRightActions = useCallback((task: Task) => {
    return (
      <AnimatedView>
        <SwipeButton
          backgroundColor="danger_status"
          onPress={() => renderRightAction(task, 'remove')}
        >
          <SVGIcon icon="remove" iconColor="#fff" />
        </SwipeButton>
        <SwipeButton backgroundColor="tertiary200" onPress={() => renderRightAction(task, 'share')}>
          <SVGIcon icon="share" />
        </SwipeButton>
      </AnimatedView>
    );
  }, []);

  return {
    renderLeftAction,
    renderLeftActions,
    renderRightAction,
    renderRightActions,
  };
};

export default SwipeableTaskOptions;
