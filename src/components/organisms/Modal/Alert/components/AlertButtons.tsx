import React, { memo, useCallback } from 'react';
import { type ButtonContainerProps, type OptionsMap } from '@store/slices/types/modal';
import { useCopy } from '@services';
import { truncate, testProperties } from '@utils/functions';
import {
  StyledButton,
  StyledActionButton,
  ActionsWrapper,
  StyledList,
  ButtonContainer,
} from '../styles';

interface AlertButtonsProps {
  testID?: string;
  options: OptionsMap[];
  handleClose: () => void;
  handlers?: (() => void)[];
  handlerAction?: () => void;
  primaryButtonTheme?: 'Primary' | 'Secondary' | 'Dark';
  actions?: boolean;
  buttonsStyles?: ButtonContainerProps;
}

export const AlertButtons: React.FC<AlertButtonsProps> = ({
  testID = 'AlertButtonsID',
  options,
  handleClose,
  handlerAction,
  primaryButtonTheme = 'Primary',
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
          title={truncate(getCopyValue(item.text), 16)}
          widthButton="auto"
          textColor={item.color}
          type={item.isSimpleButton ? 'Text' : 'Button'}
          onPress={() => {
            if (item.handler) item.handler();
            if (handlerAction) handlerAction();
            handleClose();
          }}
        />
      </ButtonContainer>
    ),
    [],
  );

  return (
    <ActionsWrapper {...testProperties(testID)} optionsLenght={options.length}>
      {!actions && (
        <StyledButton
          type="Button"
          buttonTheme={primaryButtonTheme}
          onPress={handleClose}
          title="Ok"
        />
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
        alignItems={(options.length > 1 && 'flex-end') || undefined}
      />
    </ActionsWrapper>
  );
};

export default memo(AlertButtons);
