import React from 'react';
import { useTheme, useShare } from '@hooks';
import { TransformAnimation, RotateAnimation, ScaleAnimation } from '@components/animated';
import { BlackHoleToMoon } from '@components/molecules';
import {
  HeaderContainer,
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
  Container,
} from './styles';

const DecorationItems = () => {
  const { Images } = useTheme();
  const { shareMessage, shareCustomContent } = useShare();

  return (
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
        <Container>
          <BrandDecorItem1 source={Images.sparkles.bottomLeft} />
        </Container>
      </TransformAnimation>
      <TransformAnimation
        duration={2000}
        initialXValue={0}
        finalXValue={0}
        initialYValue={0}
        finalYValue={15}
        repeat={-1}
        reverse
      >
        <Container>
          <BrandDecorItem2 source={Images.sparkles.bottomLeft2} />
        </Container>
      </TransformAnimation>
      <BrandDecorItem3>
        <BlackHoleToMoon>
          <Brand source={Images.logo} />
        </BlackHoleToMoon>
      </BrandDecorItem3>
      <ScaleAnimation duration={3000} initialValue={1} finalValue={1.05} repeat={-1} reverse>
        <Container>
          <BrandDecorItem4 source={Images.sparkles.topLeft} />
        </Container>
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
        <Container>
          <BrandDecorItem5 source={Images.sparkles.top} />
        </Container>
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
        <Container>
          <RotateAnimation
            duration={20000}
            initialValue={0}
            finalValue={360}
            repeat={-1}
            easing="linear"
          >
            <BrandDecorItem6 source={Images.sparkles.topRight} />
          </RotateAnimation>
        </Container>
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
        <Container>
          <BrandDecorItem7 source={Images.sparkles.right} />
        </Container>
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
        <Container>
          <BrandDecorItem8 source={Images.sparkles.bottomRight} />
        </Container>
      </TransformAnimation>
      <ScaleAnimation duration={3000} initialValue={1} finalValue={1.1} repeat={-1} reverse>
        <BrandDecorItem9 source={Images.sparkles.bottom} />
      </ScaleAnimation>
    </HeaderContainer>
  );
};

export default DecorationItems;
