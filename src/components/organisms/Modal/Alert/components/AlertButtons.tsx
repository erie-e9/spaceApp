import React, { memo, useCallback } from 'react';
import truncate from 'lodash/truncate';
import { useCopy } from '@services';
import type { OptionsMap, AlertButtonsProps } from '@slices/types';
import { testProperties } from '@utils/functions';
import {
  StyledButton,
  StyledActionButton,
  ActionsWrapper,
  StyledList,
  ButtonContainer,
} from '../styles';

export const AlertButtons: React.FC<AlertButtonsProps> = ({
  testID = 'AlertButtonsID',
  options,
  handleClose,
  handlerAction,
  buttonTheme = 'Primary',
  actions = true,
  buttonsStyles,
}) => {
  const { getCopyValue } = useCopy();

  const renderButtons = useCallback(
    ({ item, index }: { item: OptionsMap; index: number }) => (
      <ButtonContainer
        key={`button-container-${index}`}
        direction={buttonsStyles?.direction || 'row'}
        alignment={buttonsStyles?.alignment || 'center'}
      >
        <StyledActionButton
          title={truncate(getCopyValue(item.text), { length: 16, omission: '...' })}
          widthButton="auto"
          textColor={item.color || 'typography950'}
          type={item.isSimpleButton ? 'Text' : 'Button'}
          onPress={() => {
            item?.handler?.();
            handlerAction?.();
            handleClose();
          }}
        />
      </ButtonContainer>
    ),
    [buttonsStyles?.alignment, buttonsStyles?.direction, getCopyValue, handleClose, handlerAction],
  );

  return (
    <ActionsWrapper {...testProperties(testID)} optionsLenght={options.length}>
      {!actions && (
        <StyledButton type="Button" buttonTheme={buttonTheme} onPress={handleClose} title="Ok" />
      )}
      <StyledList
        data={options}
        showsVerticalScrollIndicator={false}
        horizontal={options.length > 1}
        renderItem={renderButtons}
        scrollEnabled={options.length > 1}
        containerStyle={{
          // width: '65%', //! check
          alignItems: 'center',
        }}
      />
    </ActionsWrapper>
  );
};

export default memo(AlertButtons);
