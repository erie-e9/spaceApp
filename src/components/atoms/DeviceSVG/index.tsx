import React, { Ref, forwardRef, memo } from 'react';
import { useTheme } from 'styled-components/native';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';
export { default as SelectedSVG } from './components/Selected';

export interface DeviceSVGProps extends SvgProps {
  opacity: number;
  widthIcon: number | string;
  heightIcon: number | string;
  leftBottom: string;
  leftTop: string;
  headLeft: string;
  headRight: string;
  controllersColor: string;
  rightBottom: string;
  rightTop: string;
  iconColor?: string;
  primary: string;
}

const DeviceSVGComponent = (props: DeviceSVGProps, ref: Ref<SVGSVGElement>) => {
  const theme = useTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      focusable={true}
      width={props.widthIcon}
      height={props.heightIcon}
      ref={ref}
      {...props}
    >
      <G clipPath="url(#a)" opacity={props.opacity}>
        <Path
          fill={
            String(props.leftBottom).includes('#')
              ? props.leftBottom
              : theme.tokens.colors[props.leftBottom]
          }
          d="M35.91 0H4.09A4.545 4.545 0 0 0-.454 4.545V75a4.545 4.545 0 0 0 4.546 4.545h31.818A4.545 4.545 0 0 0 40.455 75V4.545A4.545 4.545 0 0 0 35.909 0Z"
        />
        <Path
          fill={
            String(props.controllersColor).includes('#')
              ? props.controllersColor
              : theme.tokens.colors[props.controllersColor]
          }
          d="M6.364 56.818a2.273 2.273 0 1 0 0-4.545 2.273 2.273 0 0 0 0 4.545ZM15.454 56.818a2.273 2.273 0 1 0 0-4.545 2.273 2.273 0 0 0 0 4.545Z"
        />
        <Path
          fill={
            String(props.primary).includes('#') ? props.primary : theme.tokens.colors[props.primary]
          }
          d="M33.41 70H6.59a2.5 2.5 0 0 0 0 5h26.82a2.5 2.5 0 0 0 0-5Z"
        />
        <Path
          fill={
            String(props.leftTop).includes('#') ? props.leftTop : theme.tokens.colors[props.leftTop]
          }
          d="M-.455 4.545A4.545 4.545 0 0 1 4.091 0h31.818a4.545 4.545 0 0 1 4.546 4.545V40H-.455V4.545Z"
        />
        <Path
          fill={
            String(props.headLeft).includes('#')
              ? props.headLeft
              : theme.tokens.colors[props.headLeft]
          }
          d="M33.636 11.818H6.364a2.273 2.273 0 0 0-2.273 2.273v5a2.273 2.273 0 0 0 2.273 2.273h27.272a2.273 2.273 0 0 0 2.273-2.273v-5a2.273 2.273 0 0 0-2.273-2.273Z"
        />
        <Path
          fill={
            String(props.primary).includes('#') ? props.primary : theme.tokens.colors[props.primary]
          }
          d="M22.273 41.364H6.363a2.273 2.273 0 0 0-2.272 2.272V45a2.273 2.273 0 0 0 2.273 2.273h15.909A2.273 2.273 0 0 0 24.545 45v-1.364a2.273 2.273 0 0 0-2.272-2.272Z"
        />
        <Path
          fill={
            String(props.controllersColor).includes('#')
              ? props.controllersColor
              : theme.tokens.colors[props.controllersColor]
          }
          d="M28.182 25.454H11.818a.91.91 0 1 0 0 1.819h16.364a.91.91 0 1 0 0-1.819Z"
        />
      </G>
      <G clipPath="url(#b)" opacity={props.opacity}>
        <Path
          fill={
            String(props.rightBottom).includes('#')
              ? props.rightBottom
              : theme.tokens.colors[props.rightBottom]
          }
          d="M35.455 0H3.636A4.545 4.545 0 0 0-.909 4.545V75a4.545 4.545 0 0 0 4.545 4.545h31.819A4.545 4.545 0 0 0 40 75V4.545A4.545 4.545 0 0 0 35.455 0Z"
        />
        <Path
          fill={
            String(props.controllersColor).includes('#')
              ? props.controllersColor
              : theme.tokens.colors[props.controllersColor]
          }
          d="M24.09 56.818a2.273 2.273 0 1 0 0-4.545 2.273 2.273 0 0 0 0 4.545ZM33.182 56.818a2.273 2.273 0 1 0 0-4.545 2.273 2.273 0 0 0 0 4.545Z"
        />
        <Path
          fill={
            String(props.primary).includes('#') ? props.primary : theme.tokens.colors[props.primary]
          }
          d="M32.955 70H6.136a2.5 2.5 0 0 0 0 5h26.819a2.5 2.5 0 1 0 0-5Z"
        />
        <Path
          fill={
            String(props.rightTop).includes('#')
              ? props.rightTop
              : theme.tokens.colors[props.rightTop]
          }
          d="M-.91 4.545A4.545 4.545 0 0 1 3.637 0h31.819A4.545 4.545 0 0 1 40 4.545V40H-.91V4.545Z"
        />
        <Path
          fill={
            String(props.headRight).includes('#')
              ? props.headRight
              : theme.tokens.colors[props.headRight]
          }
          d="M33.182 11.818H5.909a2.273 2.273 0 0 0-2.273 2.273v5a2.273 2.273 0 0 0 2.273 2.273h27.273a2.273 2.273 0 0 0 2.273-2.273v-5a2.273 2.273 0 0 0-2.273-2.273Z"
        />
        <Path
          fill={
            String(props.primary).includes('#') ? props.primary : theme.tokens.colors[props.primary]
          }
          d="M21.818 41.364H5.91a2.273 2.273 0 0 0-2.273 2.272V45a2.273 2.273 0 0 0 2.273 2.273h15.91A2.273 2.273 0 0 0 24.09 45v-1.364a2.273 2.273 0 0 0-2.273-2.272Z"
        />
        <Path
          fill={
            String(props.controllersColor).includes('#')
              ? props.controllersColor
              : theme.tokens.colors[props.controllersColor]
          }
          d="M27.727 25.454H11.364a.91.91 0 0 0 0 1.819h16.363a.91.91 0 1 0 0-1.819Z"
        />
      </G>
      {props.iconColor && (
        <G
          stroke={
            String(props.iconColor).includes('#')
              ? props.iconColor
              : theme.tokens.colors[props.iconColor]
          }
          strokeWidth={2}
        >
          <Path d="M27.536 34.185c-.37-3.949-3.37-7.527-7.528-7.527a7.528 7.528 0 0 0-7.528 7.527M32.739 30.549l-4.139.958M29.249 24.712l-3.567 2.594M11.698 36.38h16.537M7.2 31.197l4.138.959M20.17 25.036V19.2M10.118 24.712l3.567 2.594M15.34 38.837h9.38" />
        </G>
      )}
      <Defs>
        <ClipPath id="a">
          <Path
            fill={
              String(props.leftBottom).includes('#')
                ? props.leftBottom
                : theme.tokens.colors[props.leftBottom]
            }
            d="M0 0h20v79.545H0z"
          />
        </ClipPath>
        <ClipPath id="b">
          <Path
            fill={
              String(props.leftBottom).includes('#')
                ? props.leftBottom
                : theme.tokens.colors[props.leftBottom]
            }
            d="M20 0h20v79.545H20z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

const ForwardRef = forwardRef(DeviceSVGComponent);
const DeviceSVG = memo(ForwardRef);
export default memo(DeviceSVG);
