import React from 'react';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components';
import QRCodeIcon from '@assets/light/svg/QRCodeIcon.svg';
import QRCodeIconDark from '@assets/dark/svg/QRCodeIcon.svg';
import QRCodeNavigator from '@assets/light/svg/QRCodeNavigator.svg';
import QRCodeNavigatorDark from '@assets/dark/svg/QRCodeNavigator.svg';

interface SvgObject {
  [key: string]: {
    [key: string]: React.FC<SvgProps>;
    light: React.FC<SvgProps>;
    dark: React.FC<SvgProps>;
  };
}

const svgLibrary: SvgObject = {
  QRCodeIcon: {
    light: QRCodeIcon,
    dark: QRCodeIconDark,
  },
  QRCodeNavigator: {
    light: QRCodeNavigator,
    dark: QRCodeNavigatorDark,
  },
};

const useSVG = (svgName: string): React.FC<SvgProps> => {
  const colorScheme = useTheme()?.mode || 'light';
  return svgLibrary[svgName][colorScheme];
};

export default useSVG;
export { useSVG };
