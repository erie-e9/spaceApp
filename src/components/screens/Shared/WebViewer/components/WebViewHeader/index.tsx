import React, { memo, useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import truncate from 'lodash/truncate';
import { useModal } from '@hooks';
import { AnimatedButton } from '@components/animated';
import { BackButton } from '@components/molecules';
import WebViewOptions from '@components/screens/Shared/WebViewer/components/WebViewOptions';
import {
  UrlContainer,
  StyledUrlText,
  WebViewHeaderContainer,
  ActionButtonsContainer,
  ActionButtonContainer,
} from './styles';

interface WebViewHeaderProps {
  url: string;
  onReload?: () => void;
  onClose?: () => void;
}

const WebViewHeader: React.FC<WebViewHeaderProps> = ({
  url,
  onReload = undefined,
  onClose = undefined,
}) => {
  const { showModal } = useModal();
  const ishttps = url.includes('https');
  const splittedUrl = url.split(/(?=www)/g);

  const onCloseHandler = useCallback(() => {
    onClose?.();
  }, []);

  const onOpenBrowserHandler = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  const menuHandler = useCallback((): void => {
    showModal({
      type: 'bottomsheet',
      body: <WebViewOptions onReload={onReload} onOpenBrowser={onOpenBrowserHandler} />,
      dropdownOptions: {
        height: 175,
      },
    });
  }, []);

  return (
    <WebViewHeaderContainer>
      <ActionButtonsContainer>
        <ActionButtonContainer>
          <BackButton onPress={onCloseHandler} />
        </ActionButtonContainer>
        <UrlContainer>
          <StyledUrlText
            testID="url-text-protocol"
            color={ishttps ? 'success_status' : 'secondary950'}
            type="Body3"
          >
            {splittedUrl[0]}
          </StyledUrlText>
          <StyledUrlText testID="url-text-address" color={'secondary950'} type="Body3">
            {truncate(splittedUrl[1], {
              length: 15,
            })}
          </StyledUrlText>
        </UrlContainer>
        <ActionButtonContainer>
          <AnimatedButton onPress={menuHandler} source="menu" size={80} />
        </ActionButtonContainer>
      </ActionButtonsContainer>
    </WebViewHeaderContainer>
  );
};

export default memo(WebViewHeader);
