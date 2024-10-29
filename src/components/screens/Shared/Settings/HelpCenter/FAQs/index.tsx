import React, { memo } from 'react';
import { useFAQs } from './hooks/useFAQs';
import { MenuList } from '@components/organisms';
import { CallToAction } from '@components/templates';
import { BodyContainer } from './styles';

export const FAQs: React.FC = () => {
  const useFAQsHook = useFAQs();

  return (
    <CallToAction
      testID="FAQsID"
      title={'menu:helpCenter.support.items.faqs.title'}
      description={'menu:helpCenter.support.items.faqs.description'}
      numberOfLinesTitle={3}
      backButton
      body={
        <BodyContainer>
          <MenuList listItems={useFAQsHook.listItems} />
        </BodyContainer>
      }
    />
  );
};

export default memo(FAQs);
