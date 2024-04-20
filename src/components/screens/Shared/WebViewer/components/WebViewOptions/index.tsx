import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useSVG } from '@hooks';
import { useCopy } from '@services';
import { hideModal } from '@slices/shared/modal';
import { RenderWhen } from '@components/atoms';
import {
  OptionButton,
  OptionButtonContainer,
  OptionsContainer,
  OptionButtonLabel,
} from './styles';

interface WebViewOptionsProps {
  onReload?: () => void;
  onShare?: () => void;
  onOpenBrowser?: () => void;
}

const WebViewOptions: React.FC<WebViewOptionsProps> = ({
  onReload,
  onShare,
  onOpenBrowser,
}) => {
  const BrowserIcon = useSVG('BrowserIcon');
  const ReloadIcon = useSVG('ReloadIcon');
  const ShareIcon = useSVG('ShareIcon');

  const dispatch = useDispatch();
  const { getCopyValue } = useCopy();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();

  const closeBottomSheet = useCallback(() => {
    dispatch(hideModal());
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
      <RenderWhen
        isTrue={remoteConfigFeatures?.webviewShare?.status !== 'hide'}
      >
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPressIn={() => shareHandler}
            Icon={<ShareIcon />}
            featureFlags={['webviewShare']}
          />
          <OptionButtonLabel textAlign="center" color="opposing">
            {getCopyValue('common:webviewer.option1')}
          </OptionButtonLabel>
        </OptionButtonContainer>
      </RenderWhen>
      <RenderWhen
        isTrue={remoteConfigFeatures?.webviewReload?.status !== 'hide'}
      >
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPress={reloadHandler}
            Icon={<ReloadIcon />}
            featureFlags={['webviewReload']}
          />
          <OptionButtonLabel textAlign="center" color="opposing">
            {getCopyValue('common:webviewer.option2')}
          </OptionButtonLabel>
        </OptionButtonContainer>
      </RenderWhen>
      <RenderWhen
        isTrue={remoteConfigFeatures?.webviewOpenOnBrowser?.status !== 'hide'}
      >
        <OptionButtonContainer>
          <OptionButton
            type="Icon"
            buttonTheme="Primary"
            onPress={openInBrowserHandler}
            Icon={<BrowserIcon />}
            featureFlags={['webviewOpenOnBrowser']}
          />
          <OptionButtonLabel textAlign="center" color="opposing">
            {getCopyValue('common:webviewer.option3')}
          </OptionButtonLabel>
        </OptionButtonContainer>
      </RenderWhen>
    </OptionsContainer>
  );
};

WebViewOptions.defaultProps = {
  onReload: undefined,
  onShare: undefined,
  onOpenBrowser: undefined,
};

export default memo(WebViewOptions);
