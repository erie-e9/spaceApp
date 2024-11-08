import React, { memo } from 'react';
import { useTheme } from '@hooks';
import { type TouchableProps } from '@types';
import { OpacityAnimation } from '@components/animated';
import { useSocialMediaAuth } from '../../hooks/useSocialMediaAuth';
import {
  SocialMediaButtonsContainer,
  SocialMediaButtonContainer,
  SocialMediaFooterTextContainer,
  SocialMediaFooterText,
  StyledButton,
  SocialMediaContainer,
} from './styles';

interface Props {
  hookHandler: any;
}

export const SocialMediaAuth: React.FC<Props> = ({ hookHandler }) => {
  const { darkMode } = useTheme();
  const useSocialMediaAuthHook = useSocialMediaAuth();

  return (
    <>
      {useSocialMediaAuthHook.socialNetworksAuth && (
        <SocialMediaContainer>
          <SocialMediaFooterTextContainer>
            <SocialMediaFooterText
              type="Subtitle2"
              font="Primary"
              color="typography900"
              textAlign="center"
              weight={400}
            >
              {hookHandler.signInUpWithText}
            </SocialMediaFooterText>
          </SocialMediaFooterTextContainer>
          <SocialMediaButtonsContainer>
            {useSocialMediaAuthHook.socialNetworksAuth.map(
              (button: TouchableProps, index: React.Key | null | undefined) => {
                return (
                  <SocialMediaButtonContainer key={index}>
                    <OpacityAnimation
                      duration={1500}
                      initialValue={1}
                      finalValue={0.6}
                      delay={1000}
                      repeat={-1}
                      reverse
                    >
                      <StyledButton
                        testID={button.testID || undefined}
                        type="Icon"
                        title={button.title}
                        icon={button.icon}
                        iconType={button.iconType}
                        startFrameAnimation={button.startFrameAnimation}
                        endFrameAnimation={button.endFrameAnimation}
                        widthIcon={button.widthIcon}
                        heightIcon={button.heightIcon}
                        onPress={button.onPress}
                        onPressAsync={button.onPressAsync}
                        onPressType="onPressIn"
                        textTransform={button.textTransform || undefined}
                        style={button.style}
                        buttonTheme={darkMode ? 'Dark' : 'Secondary'}
                        loading={button.loading || undefined}
                        disabled={button.disabled || undefined}
                        backgroundColor={button.backgroundColor || undefined}
                        remoteFeatureFlags={button.remoteFeatureFlags || []}
                      />
                    </OpacityAnimation>
                  </SocialMediaButtonContainer>
                );
              },
            )}
          </SocialMediaButtonsContainer>
        </SocialMediaContainer>
      )}
    </>
  );
};

export default memo(SocialMediaAuth);
