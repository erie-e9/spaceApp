import { memo } from 'react';
import { DefaultTheme, useTheme } from 'styled-components/native';
import { SvgProps } from 'react-native-svg';
import { useSVG } from '@hooks';

export interface SVGIconProps extends SvgProps {
  icon: string;
  iconColor?: string | keyof DefaultTheme['tokens']['colors'];
  opposingColor?: boolean;
}

export const SVGIcon = ({
  icon,
  iconColor,
  opposingColor,
  ...props
}: SVGIconProps): React.JSX.Element => {
  const SVGIconComponent = useSVG(icon);
  const theme = useTheme();

  return (
    <SVGIconComponent
      {...props}
      color={
        iconColor?.includes('#')
          ? iconColor
          : opposingColor
          ? theme.tokens.colors['tertiary50']
          : theme.tokens.colors[iconColor || 'tertiary950']
      }
    />
  );
};

export default memo(SVGIcon);
