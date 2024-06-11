import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';
import { testProperties } from '@utils/testID';
import RNUxcam from 'react-native-ux-cam';
import { useIsFocused } from '@react-navigation/core';
import { DefaultTheme } from 'styled-components/native';
import SVGUrl from '@components/atoms/SVGUrl';
import { Typography } from '@components/atoms';
import AnimatedRippleButton from '@components/molecules/AnimatedRippleButton';
import {
  ContainerWithOutPress,
  TextContainer,
  TitleContainer,
  RightContainer,
  StyledSafeAreaView,
} from './styles';

interface ListItemProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  onPressOut?: () => void;
  color?: keyof DefaultTheme['tokens']['colors'] | undefined;
  isPressable?: boolean;
  testID?: string;
  occludeSensitiveView?: boolean;
  verified?: boolean;
  badgeUrl?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  left = undefined,
  right = undefined,
  title = undefined,
  subtitle = undefined,
  onPress = undefined,
  onPressOut = undefined,
  color = undefined,
  isPressable = undefined,
  testID = undefined,
  occludeSensitiveView = undefined,
  badgeUrl = undefined,
  verified = false,
}) => {
  const isFocused = useIsFocused();

  const child = (
    <>
      {left}
      {isFocused && (
        <TextContainer
          ref={view =>
            occludeSensitiveView
              ? RNUxcam.occludeSensitiveView(view)
              : undefined
          }
        >
          <TitleContainer>
            {!!title && (
              <Typography
                {...testProperties('contact-name')}
                type="Body3"
                color={color || 'darkBlueD2'}
              >
                {title}
              </Typography>
            )}
            {badgeUrl && verified && (
              <SVGUrl URLImage={badgeUrl} width={20} paddingLeft={3} />
            )}
          </TitleContainer>
          {!!subtitle && (
            <Typography
              {...testProperties('username')}
              type="Caption"
              color="darkBlueL1"
              paddingTop={5}
            >
              {subtitle}
            </Typography>
          )}
        </TextContainer>
      )}
    </>
  );
  if (isPressable === undefined || isPressable === false) {
    return (
      <StyledSafeAreaView>
        <AnimatedRippleButton
          testID={testID}
          onPress={() => {
            if (onPress) onPress();
          }}
          onPressOut={onPressOut}
        >
          {child}
        </AnimatedRippleButton>
        <RightContainer>{right}</RightContainer>
      </StyledSafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <ContainerWithOutPress testID={testID}>{child}</ContainerWithOutPress>
      <RightContainer>{right}</RightContainer>
    </SafeAreaView>
  );
};

export default memo(ListItem);
