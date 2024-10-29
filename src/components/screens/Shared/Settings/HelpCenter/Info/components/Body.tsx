import React, { memo, useMemo } from 'react';
import { Platform } from 'react-native';
import { type ApplicationScreenProps, type InfoType } from '@types';
import { InfoHeader } from '@components/molecules';
import { BodyContainer, StyledScrollView, InfoContainer, StyledText } from './styles';

interface BodyProps {
  navigation: ApplicationScreenProps;
  type: InfoType;
}

export const Body: React.FC<BodyProps> = ({ navigation, type }) => {
  // local variables
  const content = useMemo(() => `menu:helpCenter.info.items.${type}.content`, [type]);

  const content2 = useMemo(() => `menu:helpCenter.info.items.${type}.content2`, [type]);

  return (
    <BodyContainer>
      <StyledScrollView showsVerticalScrollIndicator>
        <InfoHeader />
        <InfoContainer>
          <StyledText
            type="Subtitle2"
            weight={Platform.OS === 'ios' ? 300 : 100}
            color="secondary700"
            textAlign="justify"
          >
            {content}
            {type === 'privacyPolicy' && (
              <StyledText
                type="Subtitle2"
                weight="bold"
                color="tertiary600"
                textAlign="justify"
                onPress={() => navigation.navigate('ContactUs', {} as never)}
              >
                {'menu:helpCenter.support.items.contactUs.title'}
              </StyledText>
            )}
          </StyledText>
          {type === 'privacyPolicy' && (
            <StyledText
              type="Subtitle2"
              weight={Platform.OS === 'ios' ? 300 : 100}
              color="secondary700"
              textAlign="justify"
            >
              {content2}
            </StyledText>
          )}
        </InfoContainer>
      </StyledScrollView>
    </BodyContainer>
  );
};

export default memo(Body);
