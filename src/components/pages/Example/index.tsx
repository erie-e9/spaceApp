import React from 'react';
import { useDispatch } from 'react-redux';
import { useTheme, useSVG, useLanguage, useToast } from '@hooks';
import { changeTheme } from '@slices/shared/appPreferences';
import { AppPreferencesState, Language } from '@slices/types/appPreferences';
import { useCopy, i18next } from '@services/copyLibrary';
import { ApplicationScreenProps } from 'types/navigation';
import {
  StyledScrollView,
  HeaderContainer,
  BrandCircleContainer,
  Brand,
  BodyContainer,
  ContentContainer,
  StyledTypography,
  FeaturesContainer,
  FeatureButton,
  FeatureIcon,
  TitleContainer,
  DescriptionContainer,
  BrandDecorItem1,
  BrandDecorItem2,
  BrandDecorItem3,
  BrandDecorItem4,
  BrandDecorItem5,
  BrandDecorItem6,
  BrandDecorItem7,
  BrandDecorItem8,
} from './styles';
interface Props {
  navigation: ApplicationScreenProps;
}

const Example: React.FC<Props> = ({ navigation }) => {
  const { getCopyValue } = useCopy();
  const SVGIconExample = useSVG('QRCodeNavigator');
  const { Images, darkMode } = useTheme();
  const dispatch = useDispatch();
  const { switchLanguage } = useLanguage();

  const appPresentation = (): void => {
    useToast.info({
      message: getCopyValue('example:helloUser' as string, {
        name: process.env.APP_NAME,
      }),
      duration: 3000,
    });
  };

  const onChangeTheme = ({
    theme,
    darkMode,
  }: Partial<AppPreferencesState>): any => {
    dispatch(changeTheme({ theme, darkMode }));
  };

  const onChangeLanguage = (languageParam: Language): void => {
    switchLanguage(languageParam);
  };

  return (
    <StyledScrollView>
      <HeaderContainer>
        <BrandCircleContainer darkMode={darkMode} />
        <BrandDecorItem1 source={Images.sparkles.bottomLeft} />
        <BrandDecorItem2>
          <Brand source={Images.logo} />
        </BrandDecorItem2>
        <BrandDecorItem3 source={Images.sparkles.topLeft} />
        <BrandDecorItem4 source={Images.sparkles.top} />
        <BrandDecorItem5 source={Images.sparkles.topRight} />
        <BrandDecorItem6 source={Images.sparkles.right} />
        <BrandDecorItem7 source={Images.sparkles.bottom} />
        <BrandDecorItem8 source={Images.sparkles.bottomRight} />
      </HeaderContainer>

      <BodyContainer>
        <ContentContainer>
          <TitleContainer>
            <StyledTypography type="Headline4" weight="bold">
              {getCopyValue('welcome:title')}
            </StyledTypography>
          </TitleContainer>
          <StyledTypography
            type="Headline6"
            font="secondary"
            color="darkBlueD3"
            textAlign="justify"
          >
            {getCopyValue('welcome:subtitle')}
          </StyledTypography>
          <DescriptionContainer>
            <StyledTypography
              type="Subtitle1"
              font="secondary"
              color="darkBlueD3"
              textAlign="left"
            >
              {getCopyValue('welcome:description')}
            </StyledTypography>
          </DescriptionContainer>
        </ContentContainer>
        <FeaturesContainer>
          <FeatureButton
            type="Icon"
            buttonTheme="Primary"
            onPress={() => appPresentation()}
            Icon={<FeatureIcon source={Images.icons.send} />}
          />
          <FeatureButton
            type="Icon"
            buttonTheme="Primary"
            onPress={() => navigation.navigate('WarningScreen')}
            Icon={<SVGIconExample />}
          />
          <FeatureButton
            type="Icon"
            buttonTheme="Primary"
            onPress={() => onChangeTheme({ darkMode: !darkMode })}
            Icon={<FeatureIcon source={Images.icons.colors} />}
          />
          <FeatureButton
            type="Icon"
            buttonTheme="Primary"
            onPress={() =>
              onChangeLanguage(i18next.language === 'es' ? 'en' : 'es')
            }
            Icon={<FeatureIcon source={Images.icons.translate} />}
          />
        </FeaturesContainer>
      </BodyContainer>
    </StyledScrollView>
  );
};

export { Example };
export default Example;
