import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/core';
import { type ApplicationStackParamList, type ApplicationScreenProps } from '@types';
import { useProfile } from './hooks/useProfile';
import { OpacityAnimation, TransformAnimation } from '@components/animated';
import { AvatarProfile } from '@components/molecules';
import { MenuList } from '@components/organisms';
import { CallToAction } from '@components/templates';
import {
  BodyContainer,
  StyledScrollView,
  ProfileContainer,
  ProfileDetailContainer,
  ProfileImageContainer,
} from './styles';

interface Props {
  navigation: ApplicationScreenProps;
  route: RouteProp<ApplicationStackParamList, 'Profile'>;
}

const Profile: React.FC<Props> = () => {
  const useProfileHook = useProfile();

  return (
    <CallToAction
      testID="ProfileID"
      // title="profile:Profile.title"
      // description="profile:Profile.description"
      numberOfLinesTitle={2}
      headerStyle="Secondary"
      backButton
      body={
        <BodyContainer testID="ProfileBodyID">
          <StyledScrollView>
            <ProfileImageContainer>
              <AvatarProfile showImagePickerButton={true} size={90} trigger={false} />
            </ProfileImageContainer>

            <OpacityAnimation
              duration={200}
              initialValue={0}
              finalValue={1}
              delay={200}
              repeat={1}
              reverse
            >
              <TransformAnimation
                duration={200}
                initialYValue={0}
                finalYValue={-5}
                repeat={1}
                delay={200}
                reverse
              >
                <ProfileContainer>
                  {[
                    useProfileHook.listItemsSection1,
                    useProfileHook.listItemsSection2,
                    useProfileHook.listItemsSection3,
                  ].map((items, index) => (
                    <ProfileDetailContainer key={index}>
                      <MenuList scrollEnabled={false} listItems={items} />
                    </ProfileDetailContainer>
                  ))}
                </ProfileContainer>
              </TransformAnimation>
            </OpacityAnimation>
          </StyledScrollView>
        </BodyContainer>
      }
      primaryButton={useProfileHook.primaryButton}
    />
  );
};

export default memo(Profile);
