import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ApplicationScreenProps } from 'types/navigation';
import { AppPreferencesState } from '@slices/types/appPreferences';
import { changeTheme, setDefaultTheme } from '@slices/shared';
import { useTheme, useSVG, useToast, useModal } from '@hooks';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useCopy } from '@services';
import * as resources from '@services/translations/resources';
import {
  InterpolateColorAnimation,
  TransformAnimation,
  RotateAnimation,
  ScaleAnimation,
} from '@components/animated';
import { RenderWhen, FallbackAnimation } from '@components/atoms';
import {
  StyledScrollView,
  NavigateButtonFallback,
  NavigateButtonFallbackContainer,
  HeaderContainer,
  BrandCircleContainer,
  BodyContainer,
  ContentContainer,
  StyledTypography,
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
  const { getCopyValue } = useCopy();
  const { showModal } = useModal();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const QRCodeIconIcon = useSVG('QRCodeIcon');
  const AlertTriangleIcon = useSVG('AlertTriangle');
  const LanguageIcon = useSVG('Language');
  const SwitchThemeIcon = useSVG('SwitchTheme');
  const { Images, darkMode: isDarkMode } = useTheme();
  const dispatch = useDispatch();

  const appPresentation = useCallback((): void => {
    useToast.success({
      message: getCopyValue('home:helloUser'),
      duration: 3000,
      vibration: true,
    });
    dispatch(setDefaultTheme({ theme: 'default', darkMode: null }));
  }, []);

  const onChangeTheme = useCallback(
    ({ theme, darkMode }: Partial<AppPreferencesState>): void => {
      dispatch(changeTheme({ theme, darkMode }));
    },
    [],
  );

  const onChangeLanguage = useCallback((): void => {
    showModal({
      type: 'bottomsheet',
      title: 'languages:switchLanguage.title',
      description: 'languages:switchLanguage.description',
      list: {
        data: Object.keys(resources),
        predefinedList: 'languages',
      },
    });
  }, []);

  return (
    <InterpolateColorAnimation isScreen>
      <HeaderContainer>
        <NavigateButtonFallbackContainer>
          <NavigateButtonFallback
            onPress={() => navigation.navigate('CustomFallback')}
          >
            <RotateAnimation
              duration={3000}
              initialValue={0}
              finalValue={360}
              repeat={-1}
              easing="linear"
            >
              <FallbackAnimation size={20} />
            </RotateAnimation>
          </NavigateButtonFallback>
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
              <StyledTypography
                type="Headline4"
                weight="bold"
                color="buttonColor"
              >
                {getCopyValue('welcome:title')}
              </StyledTypography>
            </TitleContainer>
            <StyledTypography
              type="Headline6"
              font="primary"
              color="surfaceL1"
              textAlign="left"
            >
              {getCopyValue('welcome:subtitle')}
            </StyledTypography>
            <DescriptionContainer>
              <StyledTypography
                type="Subtitle1"
                font="primary"
                color="surfaceL1"
                textAlign="left"
              >
                {getCopyValue('welcome:description')}
              </StyledTypography>
            </DescriptionContainer>
          </ContentContainer>
        </StyledScrollView>
        <FeaturesContainer>
          <RenderWhen
            isTrue={remoteConfigFeatures?.triggerAlert?.status !== 'hide'}
          >
            <FeatureButton
              type="Icon"
              buttonTheme="Primary"
              onPress={() => appPresentation()}
              Icon={<QRCodeIconIcon />}
              featureFlags={['triggerAlert']}
            />
          </RenderWhen>
          <RenderWhen isTrue={remoteConfigFeatures?.warning?.status !== 'hide'}>
            <FeatureButton
              type="Icon"
              buttonTheme="Primary"
              onPress={() => navigation.navigate('Warning')}
              Icon={<AlertTriangleIcon />}
              featureFlags={['warning']}
            />
          </RenderWhen>
          <RenderWhen
            isTrue={remoteConfigFeatures?.changeTheme?.status !== 'hide'}
          >
            <FeatureButton
              type="Icon"
              buttonTheme="Primary"
              onPress={() => onChangeTheme({ darkMode: !isDarkMode })}
              Icon={<SwitchThemeIcon />}
              featureFlags={['changeTheme']}
            />
          </RenderWhen>
          <RenderWhen
            isTrue={remoteConfigFeatures?.changeLanguage?.status !== 'hide'}
          >
            <FeatureButton
              type="Icon"
              buttonTheme="Primary"
              onPress={() => onChangeLanguage()}
              Icon={<LanguageIcon />}
              featureFlags={['changeLanguage']}
            />
          </RenderWhen>
        </FeaturesContainer>
      </BodyContainer>
    </InterpolateColorAnimation>
  );
};

export default memo(Home);
