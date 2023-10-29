import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { ModalPayload } from '@slices/types/modal';
import { useCopy } from '@services';
import { hideModal } from '@slices/shared/modal';
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
export const Alert: React.FC = ({
  testID,
  isVisible,
  title,
  description,
  children,
  showCancelIcon,
  options,
  width,
  callback,
  onCloseIcon,
}: ModalPayload) => {
  const dispatch = useDispatch();
  const { getCopyValue } = useCopy();
  const theme = useTheme();

  const handleClose = (): void => {
    dispatch(hideModal());

    if (onCloseIcon) onCloseIcon();
  };

  const optionsLength = options ? options.length : 0;
  const showCloseModalIcon = optionsLength < 1;

  const parsedOptions = options
    ? options.map(opt => getCopyValue(`${opt?.text}`))
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
                    description={description || ''}
                  />
                  <RenderWhen isTrue={showCloseModalIcon && showCancelIcon}>
                    <CloseIconContainer>
                      <CloseButton onPress={handleClose} />
                    </CloseIconContainer>
                  </RenderWhen>
                </HeaderContainer>
                {children || <></>}
                <AlertButtons
                  options={parsedOptions}
                  theme={theme}
                  primaryButtonTheme="Secondary"
                  handleClose={handleClose}
                  getCopyValue={getCopyValue}
                />
              </Wrapper>
            </OpacityAnimation>
          </TransformAnimation>
        </ModalBodyContainer>
      </AnimatedBackground>
    </StyledModal>
  );
};

Alert.defaultProps = {
  testID: 'AlertID',
  navigation: undefined,
};

export default memo(Alert);
