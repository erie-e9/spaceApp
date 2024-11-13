import React, { memo, useCallback } from 'react';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useModal } from '@hooks';
import { RenderWhen, SVGIcon } from '@components/atoms';
import { OptionButton, OptionButtonContainer, OptionsContainer, OptionButtonLabel } from './styles';

interface WebViewOptionsProps {
  onReload?: () => void;
  onShare?: () => void;
  onOpenBrowser?: () => void;
}

const WebViewOptions: React.FC<WebViewOptionsProps> = ({
  onReload = undefined,
  onShare = undefined,
  onOpenBrowser = undefined,
}) => {
  const { hideModal } = useModal();

  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();

  const closeBottomSheet = useCallback(() => {
    hideModal();
  }, []);

  const shareHandler = useCallback(() => {
    closeBottomSheet();
    if (onShare) onShare();
  }, []);

  const reloadHandler = useCallback(() => {
    closeBottomSheet();
    if (onReload) onReload();
  }, []);

  const openInBrowserHandler = useCallback(() => {
    closeBottomSheet();
    if (onOpenBrowser) onOpenBrowser();
  }, []);

  return (
    <OptionsContainer>
      <RenderWhen isTrue={remoteConfigFeatures?.webviewShare?.status !== 'hide'}>
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPress={() => shareHandler}
            icon={<SVGIcon icon="share" />}
            remoteFeatureFlags={['webviewShare']}
          />
          <OptionButtonLabel textAlign="center" color="typography950">
            {'common:webviewer.option1'}
          </OptionButtonLabel>
        </OptionButtonContainer>
      </RenderWhen>
      <RenderWhen isTrue={remoteConfigFeatures?.webviewReload?.status !== 'hide'}>
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPress={reloadHandler}
            icon={<SVGIcon icon="reload" />}
            remoteFeatureFlags={['webviewReload']}
          />
          <OptionButtonLabel textAlign="center" color="typography950">
            {'common:webviewer.option2'}
          </OptionButtonLabel>
        </OptionButtonContainer>
      </RenderWhen>
      <RenderWhen isTrue={remoteConfigFeatures?.webviewOpenOnBrowser?.status !== 'hide'}>
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPress={openInBrowserHandler}
            icon={<SVGIcon icon="browser" />}
            remoteFeatureFlags={['webviewOpenOnBrowser']}
          />
          <OptionButtonLabel textAlign="center" color="typography950">
            {'common:webviewer.option3'}
          </OptionButtonLabel>
        </OptionButtonContainer>
      </RenderWhen>
    </OptionsContainer>
  );
};

export default memo(WebViewOptions);
