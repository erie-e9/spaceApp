import * as React from 'react';
import { Ref, forwardRef, memo } from 'react';
import { useTheme } from 'styled-components/native';
import Svg, { SvgProps, Circle } from 'react-native-svg';

export interface SelectedSVG extends SvgProps {
  primary: string;
  secondary: string;
  tertiary: string;
}
const SelectedSvgComponent = (props: SelectedSVG, ref: Ref<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={30}
      height={30}
      fill="none"
      focusable={true}
      ref={ref}
      {...props}
    >
      <Circle
        cx={15}
        cy={15}
        r={10}
        stroke={
          String(props.secondary).includes('#')
            ? props.secondary
            : theme.tokens.colors[props.secondary]
        }
        strokeWidth={8}
      />
      <Circle
        cx={15}
        cy={15}
        r={8}
        stroke={
          String(props.tertiary).includes('#')
            ? props.tertiary
            : theme.tokens.colors[props.tertiary]
        }
        strokeWidth={6}
      />
      <Circle
        cx={15}
        cy={15}
        r={8.5}
        fill={
          String(props.primary).includes('#') ? props.primary : theme.tokens.colors[props.primary]
        }
      />
    </Svg>
  );
};
const ForwardRef = forwardRef(SelectedSvgComponent);
const SelectedSVG = memo(ForwardRef);
export default memo(SelectedSVG);
