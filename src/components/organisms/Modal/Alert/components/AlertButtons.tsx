import React, { memo } from 'react';
import { DefaultTheme } from 'styled-components/native';
import {
  StyledButton,
  TypographyStyled,
  StyledActionButton,
  ActionsWrapper,
  TextButtonItem,
} from '../styles';

export interface AlertButtonsProps {
  testID?: string;
  optionsMap?: any[];
  options?: string[];
  handleClose: () => void;
  handlers?: (() => void)[];
  handlerAction?: () => void;
  primaryButtonTheme: 'Primary' | 'Secondary' | 'Dark' | undefined;
  theme: DefaultTheme;
  actions?: boolean;
  isSimpleButton?: boolean;
  secondButtonColor?: keyof DefaultTheme['tokens']['colors'];
  getCopyValue: (key: string, config?: any) => string;
}

export const AlertButtons: React.FC<AlertButtonsProps> = ({
  testID,
  optionsMap,
  options,
  handlers,
  handleClose,
  primaryButtonTheme,
  handlerAction,
  theme,
  actions,
  isSimpleButton,
  secondButtonColor,
  getCopyValue,
}) => {
  const isDarkMode = theme.mode === 'dark';
  const handlersPresent = handlers && handlers[0];
  const defaultSecondButtonColor = isDarkMode ? 'surfaceL5' : 'darkBlueD1';

  const multipleOptionsGenerator = (
    handleCloseFn: () => void,
    btnOptions: any[],
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
          color={isDarkMode ? 'secondaryD5' : 'darkBlueD1'}
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

  const generatedButtons = (
    handleCloseFn: () => void,
    btnOptions: any[],
  ): JSX.Element | JSX.Element[] => {
    if (btnOptions.length === 1) {
      const option = btnOptions[0];
      const renderDefaultHander = !(!option.handleAsync && option.handler);
      const renderOptionHandler = !option.handleAsync && option.handler;
      let onPressFn;

      if (renderDefaultHander) onPressFn = handleCloseFn;
      else if (renderOptionHandler) onPressFn = option.handler;

      return (
        <StyledButton
          key="alert-primary1"
          onPress={onPressFn}
          onPressAsync={option.handleAsync}
          title={getCopyValue(option.text)}
          buttonTheme="Secondary"
        />
      );
    }
    return multipleOptionsGenerator(handleCloseFn, btnOptions);
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
      {optionsMap && generatedButtons(handleClose, optionsMap)}
      {options?.map((rawText, i) => {
        const text = getCopyValue(rawText);
        if (handlersPresent) {
          const loadedHandler = handlers[i] ? handlers[i] : handleClose;
          if (i < 1) {
            if (isSimpleButton) {
              return (
                <TextButtonItem
                  isSimpleButton
                  key={`otp${0 + i}`}
                  onPress={loadedHandler}
                >
                  {text}
                </TextButtonItem>
              );
            }
            return (
              <StyledButton
                textColor={theme.colors.opposing}
                backgroundColor={
                  isDarkMode
                    ? theme.tokens.colors.darkBlueD2
                    : theme.tokens.colors.none
                }
                key={`otp${0 + i}`}
                onPress={loadedHandler}
                type="Button"
                title={text}
                buttonTheme={primaryButtonTheme}
                minWidth={200}
              />
            );
          }
          return (
            <TextButtonItem
              color={secondButtonColor || defaultSecondButtonColor}
              key={`otp${0 + i}`}
              onPress={loadedHandler}
            >
              {text}
            </TextButtonItem>
          );
        }
        return (
          <StyledActionButton
            key={`opt${0 + i}`}
            textTransform="uppercase"
            mainBtn={i < 1}
            title={text}
            elevation="0"
            onPress={i < 1 ? handleClose : handlerAction}
          />
        );
      })}
    </ActionsWrapper>
  );
};

AlertButtons.defaultProps = {
  testID: 'AlertButtonsID',
  optionsMap: undefined,
  options: undefined,
  handlers: undefined,
  handlerAction: undefined,
  actions: true,
  isSimpleButton: false,
  secondButtonColor: undefined,
};

export default memo(AlertButtons);
