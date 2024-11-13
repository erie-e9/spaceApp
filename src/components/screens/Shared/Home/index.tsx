import React, { memo } from 'react';
import { type ApplicationScreenProps } from '@types';
import { useTheme } from '@hooks';
import { OpacityAnimation } from '@components/animated';
import { ScreenBackground } from '@components/atoms';
import DecorationItems from './components/DecorationItems';
import {
  StyledScrollView,
  BodyContainer,
  ContentContainer,
  StyledText,
  FeaturesContainer,
  FeatureButton,
  TitleContainer,
  DescriptionContainer,
} from './styles';

interface HomeProps {
  navigation: ApplicationScreenProps;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { Images } = useTheme();

  return (
    <ScreenBackground
      testID={'HomeID'}
      type="parallax"
      backgroundType="image"
      backgroundSource={Images.wallpapers.backgroundstar4}
    >
      <>
        <DecorationItems />
        <BodyContainer>
          <ContentContainer>
            <TitleContainer>
              <StyledText type="Headline2" weight="bold" color="primary500">
                {'welcome:title'}
              </StyledText>
            </TitleContainer>
            <StyledText type="Subtitle1" font="Primary" color="typography950" textAlign="left">
              {'welcome:subtitle'}
            </StyledText>
          </ContentContainer>
          <StyledScrollView testID="HomeContentContainerID">
            <ContentContainer>
              <DescriptionContainer>
                <StyledText
                  type="Subtitle2"
                  font="Primary"
                  color="typography950"
                  textAlign="justify"
                >
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
      </>
    </ScreenBackground>
  );
};

export default memo(Home);
