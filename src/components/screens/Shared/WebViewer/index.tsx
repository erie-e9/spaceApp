import React, { Fragment, memo, useCallback, useRef } from 'react';
import { RouteProp } from '@react-navigation/core';
import { Logger } from '@services';
import { type ApplicationStackParamList } from '@types';
import WebViewHeader from './components/WebViewHeader';
import { StyledWebView } from './styles';

export interface WebViewerProps {
  route: RouteProp<ApplicationStackParamList, 'WebViewer'>;
}

export const WebViewer: React.FC<WebViewerProps> = ({ route }) => {
  const webViewRef = useRef();
  const { url } = route?.params;

  const onReloadHandler = useCallback(() => {
    webViewRef.current?.reload();
  }, []);

  const onCloseHandler = useCallback(() => {
    Logger.log('onCloseHandler');
  }, []);

  return (
    <Fragment>
      <WebViewHeader url={url} onReload={onReloadHandler} onClose={onCloseHandler} />
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
    </Fragment>
  );
};

export default memo(WebViewer);
