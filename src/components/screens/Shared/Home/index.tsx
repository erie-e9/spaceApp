import React, { memo } from 'react';
import { useCopy } from '@services';
import { ApplicationScreenProps } from 'types/navigation';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useTheme, useSVG } from '@hooks';
import {
  InterpolateColorAnimation,
  TransformAnimation,
  RotateAnimation,
  ScaleAnimation,
  OpacityAnimation,
} from '@components/animated';
import { RenderWhen } from '@components/atoms';
import {
  StyledScrollView,
  NavigateButtonFallbackContainer,
  HeaderContainer,
  BrandCircleContainer,
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

interface Props {
  navigation: ApplicationScreenProps;
}

export const Home: React.FC<Props> = ({ navigation }) => {
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const { getCopyValue } = useCopy();
  const { Images } = useTheme();
  const SettingsIcon = useSVG('SettingsIcon');

  return (
    <InterpolateColorAnimation>
      <HeaderContainer>
        <NavigateButtonFallbackContainer>
          <FeatureButton
            type="Text"
            title="Auth"
            buttonTheme="Secondary"
            onPress={() =>
              navigation.navigate('Auth', { screen: 'Authentication' })
            }
            featureFlags={['auth']}
          />
        </NavigateButtonFallbackContainer>
        <BrandCircleContainer initialColor="#DFDFDF" finalColor="#000000" />
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
          <TransformAnimation
            duration={2000}
            initialXValue={0}
            finalXValue={0}
            initialYValue={0}
            finalYValue={15}
            repeat={-1}
            reverse
          >
            <RotateAnimation
              duration={5000}
              initialValue={0}
              finalValue={20}
              repeat={-1}
              reverse
            >
              <Brand source={Images.logo} />
            </RotateAnimation>
          </TransformAnimation>
        </BrandDecorItem3>
        <ScaleAnimation
          duration={3000}
          initialValue={1}
          finalValue={1.05}
          repeat={-1}
          reverse
        >
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
        <ScaleAnimation
          duration={3000}
          initialValue={1}
          finalValue={1.1}
          repeat={-1}
          reverse
        >
          <BrandDecorItem9 source={Images.sparkles.bottom} />
        </ScaleAnimation>
      </HeaderContainer>
      <BodyContainer>
        <StyledScrollView testID="HomeID">
          <ContentContainer>
            <TitleContainer>
              <StyledText type="Headline4" weight="bold" color="buttonColor">
                {getCopyValue('welcome:title')}
              </StyledText>
            </TitleContainer>
            <StyledText
              type="Headline6"
              font="primary"
              color="surfaceL1"
              textAlign="left"
            >
              {getCopyValue('welcome:subtitle')}
            </StyledText>
            <DescriptionContainer>
              <StyledText
                type="Subtitle2"
                font="primary"
                color="tertiaryL5"
                textAlign="left"
              >
                {getCopyValue('welcome:description')}
              </StyledText>
            </DescriptionContainer>
          </ContentContainer>
        </StyledScrollView>
        <FeaturesContainer>
          <RenderWhen isTrue={remoteConfigFeatures?.warning?.status !== 'hide'}>
            <OpacityAnimation
              duration={1500}
              initialValue={1}
              finalValue={0.45}
              delay={1000}
              repeat={-1}
              reverse
            >
              <FeatureButton
                type="Icon"
                buttonTheme="Primary"
                onPress={() => navigation.navigate('Settings')}
                icon={<SettingsIcon />}
                featureFlags={['warning']}
              />
            </OpacityAnimation>
          </RenderWhen>
        </FeaturesContainer>
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(Home);
