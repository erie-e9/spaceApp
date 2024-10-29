import { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import { type Mode } from '@slices/types/appPreferences';
import { useCopy } from '@services';
import { useAppPreferences, useTheme } from '@hooks';
import { DeviceSVG, DeviceSVGProps } from '@components/atoms';

type InputJSON = {
  [key: string]: {
    name: string;
    light: { [key: string]: string };
    dark: { [key: string]: string };
  };
};

type OutputJSON = {
  [theme: string]: {
    name: string;
    primary?: {
      light: string;
      dark: string;
    };
    secondary?: {
      light: string;
      dark: string;
    };
    tertiary?: {
      light: string;
      dark: string;
    };
  };
};

export const useAppearance = () => {
  const { switchMode } = useAppPreferences();
  const { darkMode } = useTheme();
  const { getCopyValue } = useCopy();

  const setMode = useCallback((modeParam: Mode) => switchMode(modeParam), [switchMode]);
  const transformJSON = (input: InputJSON): OutputJSON => {
    const output: OutputJSON = {};

    Object.keys(input).forEach((theme) => {
      output[theme] = {
        name: input[theme]?.name, // Asignar el valor de 'name' directamente en el output
      };

      if (input[theme].light.primary500 && input[theme].dark.primary500) {
        output[theme].primary = {
          light: input[theme].light.primary500,
          dark: input[theme].dark.primary500,
        };
      }

      if (input[theme].light.secondary800 && input[theme].dark.secondary800) {
        output[theme].secondary = {
          light: input[theme].light.secondary800,
          dark: input[theme].dark.secondary800,
        };
      }

      if (input[theme].light.tertiary50 && input[theme].dark.tertiary50) {
        output[theme].tertiary = {
          light: input[theme].light.tertiary50,
          dark: input[theme].dark.tertiary50,
        };
      }
    });

    return output;
  };

  const renderDeviceSVG = useCallback((props: DeviceSVGProps) => <DeviceSVG {...props} />, []);

  const listOptions = useMemo(() => {
    const commonProps = {
      widthIcon: 40,
      heightIcon: 80,
      primary: 'primary500',
    };

    const themes = [
      {
        value: 'light',
        leftTop: 'tertiary50',
        leftBottom: 'tertiary50',
        headLeft: 'secondary950',
        headRight: 'secondary950',
        controllersColor: 'tertiary200',
        rightTop: 'tertiary50',
        rightBottom: 'tertiary50',
        darkModeProps: {
          leftTop: 'secondary950',
          leftBottom: 'secondary950',
          headLeft: 'tertiary50',
          headRight: 'tertiary50',
          controllersColor: 'secondary800',
          rightTop: 'secondary950',
          rightBottom: 'secondary950',
        },
      },
      {
        value: 'dark',
        leftTop: 'secondary950',
        leftBottom: 'secondary950',
        headLeft: 'tertiary50',
        headRight: 'tertiary50',
        controllersColor: 'tertiary200',
        rightTop: 'secondary950',
        rightBottom: 'secondary950',
        darkModeProps: {
          leftTop: 'tertiary50',
          leftBottom: 'tertiary50',
          headLeft: 'secondary950',
          headRight: 'secondary950',
          controllersColor: 'secondary800',
          rightTop: 'tertiary50',
          rightBottom: 'tertiary50',
        },
      },
      {
        value: null,
        leftTop: 'tertiary50',
        leftBottom: 'tertiary50',
        headLeft: 'secondary950',
        headRight: 'tertiary50',
        controllersColor: 'tertiary200',
        rightTop: 'secondary950',
        rightBottom: 'secondary950',
        darkModeProps: {
          leftTop: 'secondary950',
          leftBottom: 'secondary950',
          headLeft: 'tertiary50',
          headRight: 'secondary950',
          controllersColor: 'secondary800',
          rightTop: 'tertiary50',
          rightBottom: 'tertiary50',
        },
      },
      {
        value: 'sunflower',
        opacity: 0.8,
        leftTop: 'tertiary50',
        leftBottom: 'tertiary50',
        headLeft: 'secondary950',
        headRight: 'tertiary50',
        controllersColor: 'tertiary200',
        rightTop: 'secondary950',
        rightBottom: 'secondary950',
        iconColor: 'secondary950',
        darkModeProps: {
          leftTop: 'secondary950',
          leftBottom: 'secondary950',
          headLeft: 'tertiary50',
          headRight: 'secondary950',
          controllersColor: 'secondary800',
          rightTop: 'tertiary50',
          rightBottom: 'tertiary50',
          iconColor: 'secondary950',
        },
      },
    ];

    return themes.map(
      ({
        value,
        leftTop,
        leftBottom,
        headLeft,
        headRight,
        controllersColor,
        rightTop,
        rightBottom,
        iconColor,
        darkModeProps,
        opacity = 1,
      }) => ({
        value,
        title: getCopyValue(
          `menu:Menu.settings.items.appPreferences.items.changeAppearance.modes.${
            value || 'system'
          }Mode`,
          {
            osDevice: Platform.OS === 'ios' ? 'iOS' : 'Android',
          },
        ),
        icon: renderDeviceSVG({
          ...commonProps,
          opacity,
          leftTop: darkMode ? darkModeProps.leftTop : leftTop,
          leftBottom: darkMode ? darkModeProps.leftBottom : leftBottom,
          headLeft: darkMode ? darkModeProps.headLeft : headLeft,
          headRight: darkMode ? darkModeProps.headRight : headRight,
          controllersColor: darkMode ? darkModeProps.controllersColor : controllersColor,
          rightTop: darkMode ? darkModeProps.rightTop : rightTop,
          rightBottom: darkMode ? darkModeProps.rightBottom : rightBottom,
          iconColor: darkMode ? darkModeProps.iconColor : iconColor,
        }),
        onPress: () => setMode(value as Mode),
      }),
    );
  }, [darkMode, setMode]);

  return {
    transformJSON,
    listOptions,
  };
};
