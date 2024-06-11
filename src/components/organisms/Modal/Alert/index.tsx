import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { useModalSelectorHook } from '@redux/hooks/useModalSelectorHook';
import { useCopy } from '@services';
import { hideModal } from '@slices/shared/modal';
import { AnyObject } from 'yup';
import { TransformAnimation, OpacityAnimation } from '@components/animated';
import { RenderWhen } from '@components/atoms';
import { CloseButton } from '@components/molecules';
import ModalHeader from '@components/organisms/Modal/ModalHeader';
import AlertButtons from '@components/organisms/Modal/Alert/components/AlertButtons';
import AnimatedBackground from '@components/organisms/Modal/AnimatedBackground';
import {
  StyledModal,
  ModalBodyContainer,
  Wrapper,
  HeaderContainer,
  CloseIconContainer,
  MODAL_STYLE,
} from './styles';

export const Alert: React.FC = () => {
  let modalArgs: AnyObject = { ...useModalSelectorHook() };

  const {
    testID = 'AlertID',
    isVisible,
    title,
    description,
    showCancelIcon,
    body,
    optionsMap,
    onModalHide,
    options,
    handlers,
    Icon,
    style,
    isLockedBackdrop,
    lockBackdrop,
    titleColor,
    secondButtonColor,
    width,
    callback,
    onCloseIcon,
  } = modalArgs;

  const dispatch = useDispatch();
  const { getCopyValue } = useCopy();
  const theme = useTheme();
  const handleClose = (): void => {
    dispatch(hideModal());
    if (onModalHide) onModalHide();
    if (onCloseIcon) onCloseIcon();
  };

  const parsedOptionsMap = optionsMap
    ? optionsMap.map((opt: AnyObject) => {
        const newOpt = { ...opt };
        newOpt.text = getCopyValue(opt.text);
        return newOpt;
      })
    : [];

  const onModalShow = (): void => {
    if (callback) callback();
  };

  return (
    <StyledModal
      testID={testID}
      transparent
      visible={isVisible}
      onShow={onModalShow}
      animationType="fade"
      style={MODAL_STYLE}
      statusBarTranslucent
    >
      <AnimatedBackground isActive={isVisible}>
        <ModalBodyContainer>
          <TransformAnimation
            trigger={isVisible}
            initialYValue={0}
            finalYValue={-20}
            duration={200}
          >
            <OpacityAnimation
              trigger={isVisible}
              initialValue={0}
              finalValue={1}
              duration={200}
            >
              <Wrapper width={width}>
                <HeaderContainer>
                  <ModalHeader
                    title={title || ''}
                    titleColor={titleColor}
                    description={description || ''}
                  />
                  <RenderWhen isTrue={showCancelIcon}>
                    <CloseIconContainer>
                      <CloseButton onPress={handleClose} />
                    </CloseIconContainer>
                  </RenderWhen>
                </HeaderContainer>
                {body || <></>}
                <AlertButtons
                  optionsMap={parsedOptionsMap}
                  options={options}
                  theme={theme}
                  handlers={handlers}
                  primaryButtonTheme="Secondary"
                  handleClose={handleClose}
                  secondButtonColor={secondButtonColor}
                />
              </Wrapper>
            </OpacityAnimation>
          </TransformAnimation>
        </ModalBodyContainer>
      </AnimatedBackground>
    </StyledModal>
  );
};

export default memo(Alert);
