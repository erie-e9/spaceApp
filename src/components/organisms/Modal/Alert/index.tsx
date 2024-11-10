import React, { Fragment, memo, useCallback } from 'react';
import { testProperties } from '@utils/functions';
import { useModal } from '@hooks';
import { useModalSelectorHook } from '@redux/hooks/useModalSelectorHook';
import { TransformAnimation, OpacityAnimation } from '@components/animated';
import { RenderWhen } from '@components/atoms';
import { CloseButton } from '@components/molecules';
import ModalHeader from '@components/organisms/Modal/ModalHeader';
import AlertButtons from '@components/organisms/Modal/Alert/components/AlertButtons';
import { type ModalProps } from '@slices/types';
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
  const modalArgs: ModalProps & any = { ...useModalSelectorHook() };

  const {
    testID = 'AlertID',
    isVisible,
    title,
    description,
    showCancelIcon,
    body,
    onModalHide,
    options,
    handlers,
    width,
    callback,
    onCloseIcon,
    buttonsStyles,
    // lockBackdrop,
  } = modalArgs;

  const { hideModal } = useModal();
  const handleClose = (): void => {
    hideModal();
    if (onModalHide) onModalHide();
    if (onCloseIcon) onCloseIcon();
  };

  const onModalShow = useCallback((): void => {
    if (callback) callback();
  }, []);

  if (!isVisible) return;

  return (
    <StyledModal
      {...testProperties(testID)}
      transparent
      visible={isVisible}
      onShow={onModalShow}
      animationType="none"
      style={MODAL_STYLE}
      statusBarTranslucent
    >
      <AnimatedBackground onTouch={true ? undefined : handleClose} isActive>
        <ModalBodyContainer>
          <TransformAnimation trigger={isVisible} initialYValue={0} finalYValue={-5} duration={250}>
            <OpacityAnimation trigger={isVisible} initialValue={0} finalValue={1} duration={100}>
              <Wrapper width={width}>
                <HeaderContainer>
                  <ModalHeader title={title || ''} description={description || ''} />
                  <RenderWhen isTrue={showCancelIcon}>
                    <CloseIconContainer>
                      <CloseButton onPress={handleClose} />
                    </CloseIconContainer>
                  </RenderWhen>
                </HeaderContainer>
                {body || <Fragment></Fragment>}
                {options && (
                  <AlertButtons
                    options={options}
                    handlers={handlers}
                    primaryButtonTheme="Secondary"
                    handleClose={handleClose}
                    buttonsStyles={buttonsStyles}
                  />
                )}
              </Wrapper>
            </OpacityAnimation>
          </TransformAnimation>
        </ModalBodyContainer>
      </AnimatedBackground>
    </StyledModal>
  );
};

export default memo(Alert);
