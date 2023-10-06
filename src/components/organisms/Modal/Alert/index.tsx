import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from 'styled-components';
import { useCopy } from '@services/copyLibrary';
import { hideModal } from '@slices/shared/modal';
import { TransformAnimation, OpacityAnimation } from '@components/animated';
import { CloseButton } from '@components/atoms';
import ModalHeader from '@components/organisms/Modal/ModalHeader';
import { ModalPayload } from '@slices/types/modal';
import AnimatedBackground from '../AnimatedBackground';
import AlertModalButtons from './components/AlertModalButtons';
import {
  StyledModal,
  Wrapper,
  ModalBodyContainer,
  CloseIconContainer,
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
    console.log('ewe handleClose');
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
    <>
      <StyledModal
        transparent
        visible={isVisible}
        testID={testID}
        onShow={onModalShow}
        animationType="fade"
      >
        <ModalBodyContainer>
          <AnimatedBackground isActive={isVisible} />
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
                {showCloseModalIcon && showCancelIcon && (
                  <CloseIconContainer>
                    <CloseButton onPress={handleClose} />
                  </CloseIconContainer>
                )}
                <ModalHeader
                  title={title || ''}
                  description={description || ''}
                />
                {children || <></>}
                <AlertModalButtons
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
      </StyledModal>
    </>
  );
};

Alert.defaultProps = {
  navigation: undefined,
};

export default memo(Alert);
