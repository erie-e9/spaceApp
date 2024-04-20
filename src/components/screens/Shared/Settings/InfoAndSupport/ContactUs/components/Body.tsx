import React, { memo } from 'react';
import { useCopy } from '@services';
import { OptionSelectorDrawer } from '@components/organisms';
import { useContactUs } from '../hooks/useContactUs';
import { BodyContainer, LabelContainer, StyledText } from './styles';

export const Body: React.FC = () => {
  // Global Hook Values
  const { getCopyValue } = useCopy();

  // Component Hooks
  const { listItems } = useContactUs();

  // JSX Components
  return (
    <BodyContainer>
      <LabelContainer>
        <StyledText textAlign="center">
          {getCopyValue(
            'settings:infoAndSupport.support.items.contactUs.content.description',
          )}
        </StyledText>
      </LabelContainer>
      <OptionSelectorDrawer
        listOptions={listItems}
        numColumns={listItems.length <= 6 ? listItems.length : 3}
      />
    </BodyContainer>
  );
};

export default memo(Body);
