import React, { Fragment, memo, useCallback, useMemo } from 'react';
import { useRemoteFeaturesSelectorHook } from '@redux/hooks';
import { useAppPreferences, useModal, useTheme } from '@hooks';
import themes from '@theme/themes/themes.json';
import { RenderWhen, SelectedSVG } from '@components/atoms';
import { useAppearance } from './hooks/useAppearance';
import { ModeSelectorItem } from './components/ModeSelectorItem';
import {
  StyledFlatList,
  BodyContainer,
  TitleContainer,
  StyledTitle,
  StyledTouchableOpacity,
  ModeSelectorContainer,
  ModeListContainer,
  TitleNameContainer,
  Separator,
  ThemeListContainer,
  ThemeIconContainer,
} from './styles';

export interface AppearanceSelectorProps {
  autoCloseOnSelect?: boolean;
}

const themeItems = (transformedJSON: any, darkMode: boolean) => {
  return Object.keys(transformedJSON).map((themeKey: string) => ({
    name: themeKey,
    title: transformedJSON[themeKey].name,
    colors: {
      primary: transformedJSON[themeKey].primary[darkMode ? 'dark' : 'light'],
      secondary: transformedJSON[themeKey].secondary[darkMode ? 'dark' : 'light'],
      tertiary: transformedJSON[themeKey].tertiary[darkMode ? 'dark' : 'light'],
    },
  }));
};

const AppearanceSelector: React.FC<AppearanceSelectorProps> = ({ autoCloseOnSelect }) => {
  const { switchTheme, theme } = useAppPreferences();
  const remoteConfigFeatures = useRemoteFeaturesSelectorHook();
  const useAppearanceHook = useAppearance();
  const { hideModal } = useModal();
  const { darkMode } = useTheme();
  const items = useMemo(() => useAppearanceHook.listOptions, [useAppearanceHook.listOptions]);
  const transformedJSON = useAppearanceHook.transformJSON(themes);
  const themeList = themeItems(transformedJSON, darkMode);
  const onPressHandler = useCallback(() => {
    if (autoCloseOnSelect) {
      hideModal();
    }
  }, []);

  return (
    <BodyContainer>
      <RenderWhen isTrue={remoteConfigFeatures?.changeMode?.status === 'on'}>
        <>
          <TitleContainer>
            <StyledTitle testID="list-title" type="Body2">
              {'menu:Menu.settings.items.appPreferences.items.changeAppearance.modes.title'}
            </StyledTitle>
          </TitleContainer>
          <ModeListContainer>
            <StyledFlatList
              data={items}
              horizontal
              contentContainerStyle={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
              renderItem={({ item, index }: { item: any; index: number }) => (
                <ModeSelectorContainer key={index}>
                  <ModeSelectorItem
                    {...item}
                    onPress={() => {
                      item.onPress();
                      onPressHandler();
                    }}
                  />
                </ModeSelectorContainer>
              )}
            />
          </ModeListContainer>
        </>
      </RenderWhen>
      <RenderWhen
        isTrue={
          remoteConfigFeatures?.changeMode?.status === 'on' &&
          remoteConfigFeatures?.changeTheme?.status === 'on'
        }
      >
        <Separator />
      </RenderWhen>
      <RenderWhen isTrue={remoteConfigFeatures?.changeTheme?.status === 'on'}>
        <>
          <TitleContainer>
            <StyledTitle type="Body2">
              {'menu:Menu.settings.items.appPreferences.items.changeAppearance.themes.title'}
            </StyledTitle>
          </TitleContainer>
          <ThemeListContainer>
            <StyledFlatList
              data={themeList}
              horizontal
              contentContainerStyle={{
                flexGrow: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
              renderItem={({ item, index }: { item: any; index: number }) => {
                const selectedItem = theme === item.name;
                return (
                  <StyledTouchableOpacity
                    key={index}
                    activeOpacity={1}
                    onPress={() => {
                      switchTheme(item.name);
                      onPressHandler();
                    }}
                  >
                    <Fragment>
                      <ThemeIconContainer>
                        <SelectedSVG
                          primary={item.colors.primary}
                          secondary={item.colors.secondary}
                          tertiary={item.colors.tertiary}
                        />
                      </ThemeIconContainer>
                      <TitleNameContainer selected={theme === item.name}>
                        <StyledTitle
                          type="Label"
                          textAlign="center"
                          color={selectedItem ? 'tertiary900' : 'tertiary700'}
                          weight={selectedItem ? 'semi-bold' : 'normal'}
                        >
                          {item.title}
                        </StyledTitle>
                      </TitleNameContainer>
                    </Fragment>
                  </StyledTouchableOpacity>
                );
              }}
            />
          </ThemeListContainer>
        </>
      </RenderWhen>
    </BodyContainer>
  );
};

export default memo(AppearanceSelector);
