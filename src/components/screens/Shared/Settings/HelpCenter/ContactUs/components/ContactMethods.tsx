import React, { memo } from 'react';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { OptionSelectorDrawer } from '@components/organisms';
import { useContactUs } from '../hooks/useContactUs';
import { BodyContainer } from './styles';
import { RenderWhen } from '@components/atoms';

export const ContactMethods: React.FC = () => {
  // Component Hooks
  const useContactUsHook = useContactUs();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const remoteConfigStatus = remoteConfigFeatures.socialNetworksAuth.status;

  // JSX Components
  return (
    <RenderWhen isTrue={remoteConfigStatus !== 'hide'}>
      <BodyContainer>
        <OptionSelectorDrawer
          listOptions={useContactUsHook.listItems}
          horizontal
          containerStyle={{
            flexGrow: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            justifySelf: 'center',
          }}
          numColumns={
            useContactUsHook.listItems.length <= 6 ? useContactUsHook.listItems.length : 3
          }
        />
      </BodyContainer>
    </RenderWhen>
  );
};

export default memo(ContactMethods);
