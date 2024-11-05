import React, { memo } from 'react';
import { type ApplicationScreenProps } from '@types';
import { useTheme, useShare } from '@hooks';
import {
  InterpolateColorAnimation,
  TransformAnimation,
  RotateAnimation,
  ScaleAnimation,
  OpacityAnimation,
} from '@components/animated';
import { BlackHoleToMoon } from '@components/molecules';
import {
  StyledScrollView,
  HeaderContainer,
  BodyContainer,
  ContentContainer,
  StyledText,
  FeaturesContainer,
  FeatureButton,
  TitleContainer,
  DescriptionContainer,
  BrandDecorItem1,
  BrandDecorItem2,
  BrandDecorItem3,
  Brand,
  BrandDecorItem4,
  BrandDecorItem5,
  BrandDecorItem6,
  BrandDecorItem7,
  BrandDecorItem8,
  BrandDecorItem9,
} from './styles';

interface HomeProps {
  navigation: ApplicationScreenProps;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { Images } = useTheme();
  const { shareMessage, shareCustomContent } = useShare();

  return (
    <InterpolateColorAnimation>
      <HeaderContainer>
        <TransformAnimation
          duration={3500}
          initialXValue={20}
          finalXValue={0}
          initialYValue={0}
          finalYValue={10}
          repeat={-1}
          reverse
        >
          <BrandDecorItem1 source={Images.sparkles.bottomLeft} />
        </TransformAnimation>
        <TransformAnimation
          duration={3500}
          initialXValue={0}
          finalXValue={0}
          initialYValue={0}
          finalYValue={-80}
          repeat={-1}
          reverse
        >
          <BrandDecorItem2 source={Images.sparkles.bottomLeft2} />
        </TransformAnimation>
        <BrandDecorItem3>
          <BlackHoleToMoon>
            <Brand source={Images.logo} />
          </BlackHoleToMoon>
        </BrandDecorItem3>
        <ScaleAnimation duration={3000} initialValue={1} finalValue={1.05} repeat={-1} reverse>
          <BrandDecorItem4 source={Images.sparkles.topLeft} />
        </ScaleAnimation>
        <TransformAnimation
          duration={5000}
          initialXValue={-30}
          finalXValue={30}
          initialYValue={0}
          finalYValue={10}
          repeat={-1}
          reverse
        >
          <BrandDecorItem5 source={Images.sparkles.top} />
        </TransformAnimation>
        <TransformAnimation
          duration={2000}
          initialXValue={0}
          finalXValue={0}
          initialYValue={0}
          finalYValue={10}
          repeat={-1}
          reverse
        >
          <RotateAnimation
            duration={20000}
            initialValue={0}
            finalValue={360}
            repeat={-1}
            easing="linear"
          >
            <BrandDecorItem6 source={Images.sparkles.topRight} />
          </RotateAnimation>
        </TransformAnimation>
        <TransformAnimation
          duration={4500}
          initialXValue={10}
          finalXValue={20}
          initialYValue={0}
          finalYValue={0}
          repeat={-1}
          reverse
        >
          <BrandDecorItem7 source={Images.sparkles.right} />
        </TransformAnimation>
        <TransformAnimation
          duration={4500}
          initialXValue={0}
          finalXValue={20}
          initialYValue={0}
          finalYValue={0}
          repeat={-1}
          reverse
        >
          <BrandDecorItem8 source={Images.sparkles.bottomRight} />
        </TransformAnimation>
        <ScaleAnimation duration={3000} initialValue={1} finalValue={1.1} repeat={-1} reverse>
          <BrandDecorItem9 source={Images.sparkles.bottom} />
        </ScaleAnimation>
      </HeaderContainer>
      <BodyContainer>
        <ContentContainer>
          <TitleContainer>
            <StyledText type="Headline2" weight="bold" color="primary500">
              {'welcome:title'}
            </StyledText>
          </TitleContainer>
          <StyledText type="Subtitle1" font="Primary" color="tertiary950" textAlign="left">
            {'welcome:subtitle'}
          </StyledText>
        </ContentContainer>
        <StyledScrollView testID="HomeContentContainerID">
          <ContentContainer>
            <DescriptionContainer>
              <StyledText type="Subtitle2" font="Primary" color="tertiary800" textAlign="justify">
                {'welcome:description'}
              </StyledText>
            </DescriptionContainer>
          </ContentContainer>
        </StyledScrollView>
        <FeaturesContainer>
          <OpacityAnimation
            duration={1500}
            initialValue={1}
            finalValue={0.7}
            delay={1000}
            repeat={-1}
            reverse
          >
            <FeatureButton
              type="Icon"
              icon="features"
              iconType="svg"
              buttonTheme="Primary"
              onPress={() => {
                navigation.removeListener;
                navigation.navigate('MenuNavigator', { screen: 'Menu' } as never);
              }}
              remoteFeatureFlags={['menu']}
            />
          </OpacityAnimation>
        </FeaturesContainer>
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(Home);
