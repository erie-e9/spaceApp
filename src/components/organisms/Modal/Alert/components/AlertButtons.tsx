import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import { OptionsMap } from '@store/slices/types/modal';
import { useCopy } from '@services';
import { useTheme } from '@hooks';
import {
  StyledButton,
  TypographyStyled,
  StyledActionButton,
  ActionsWrapper,
  TextButtonItem,
} from '../styles';

export interface AlertButtonsProps {
  testID?: string;
  optionsMap?: OptionsMap[];
  options?: OptionsMap[];
  handleClose: () => void;
  handlers?: (() => void)[];
  handlerAction?: () => void;
  primaryButtonTheme: 'Primary' | 'Secondary' | 'Dark' | undefined;
  actions?: boolean;
  secondButtonColor?: keyof DefaultTheme['tokens']['colors'];
}

export const AlertButtons: React.FC<AlertButtonsProps> = ({
  testID = 'AlertButtonsID',
  optionsMap = undefined,
  options = undefined,
  handleClose,
  handlers = undefined,
  handlerAction = undefined,
  primaryButtonTheme,
  actions = true,
  secondButtonColor = undefined,
}) => {
  const { getCopyValue } = useCopy();
  const { darkMode: isDarkMode } = useTheme();

  const multipleOptionsGenerator = (
    handleCloseFn: () => void,
    btnOptions: OptionsMap[],
  ): JSX.Element[] => {
    return btnOptions?.map((item, i) => {
      const text = getCopyValue(item.text);
      if (i < 1) {
        return (
          <StyledButton
            key={`alert-primary${0 + i}`}
            onPress={item.handler ? item.handler : undefined}
            onPressAsync={
              (item.handleAsync
                ? item.handleAsync
                : undefined) as () => Promise<void>
            }
            title={text}
            buttonTheme="Secondary"
            fontWeight={item.fontWeight}
            minWidth={item.minWidth ? item.minWidth : undefined}
          />
        );
      }
      return (
        <TypographyStyled
          color={isDarkMode ? 'secondaryD5' : 'surfaceL1'}
          type="Subtitle1"
          fontSize={18}
          weight={item.fontWeight}
          key={`alert-${0 + i}`}
          onPress={item.handler ? item.handler : handleCloseFn}
        >
          {text}
        </TypographyStyled>
      );
    });
  };

  return (
    <ActionsWrapper testID={testID}>
      {!actions && (
        <StyledButton
          type="Button"
          buttonTheme={primaryButtonTheme}
          onPress={handleClose}
          title="Ok"
        />
      )}
      {/* {optionsMap && generatedButtons(handleClose, optionsMap)} */}
      {options?.map((item, i) => {
        const text = getCopyValue(item?.text);
        if (i < 1) {
          if (item?.isSimpleButton) {
            return (
              <TextButtonItem
                isSimpleButton
                type="Body2"
                key={`item-${0 + i}`}
                onPress={() => {
                  if (item?.handler) item?.handler();
                  handleClose();
                }}
              >
                {text}
              </TextButtonItem>
            );
          }
          return (
            <StyledActionButton
              key={`item${0 + i}`}
              mainBtn={i < 1}
              title={text}
              elevation="0"
              onPress={() => {
                if (item?.handler && handlerAction) {
                  item?.handler();
                  handlerAction();
                }
              }}
            />
          );
        }
      })}
    </ActionsWrapper>
  );
};

export default memo(AlertButtons);
