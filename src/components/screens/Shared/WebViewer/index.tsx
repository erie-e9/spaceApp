import React, { memo, useCallback, useRef } from 'react';
import { RouteProp } from '@react-navigation/core';
import { ApplicationStackParamList } from 'types/navigation';
import { Logger } from '@services';
import WebViewHeader from './components/WebViewHeader';
import { StyledWebView } from './styles';

export interface Props {
  route: RouteProp<ApplicationStackParamList, 'WebViewer'>;
}

const WebViewer: React.FC<Props> = ({ route }) => {
  const webViewRef = useRef();
  const { url } = route?.params;

  const onReloadHandler = useCallback(() => {
    webViewRef.current?.reload();
  }, []);

  const onCloseHandler = useCallback(() => {
    Logger.log('onCloseHandler');
  }, []);

  return (
    <>
      <WebViewHeader
        url={url}
        onReload={onReloadHandler}
        onClose={onCloseHandler}
      />
      <StyledWebView
        ref={webViewRef}
        source={{ uri: url }}
        injectedJavaScript={`
          removeHeader = (event) => { 
            const header = document.getElementById('header');
            if (header) {
              header.style.display='none';
            } else {
              setTimeout(func, 5)
            }
          };
          removeHeader();`}
      />
    </>
  );
};

export default memo(WebViewer);
