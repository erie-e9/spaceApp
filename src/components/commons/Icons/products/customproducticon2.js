import * as React from "react"
import Svg, { Defs, ClipPath, Path, G, Circle } from "react-native-svg"

const sizewidth = 800
const sizeheight = 870

const CustomProductIcon2 = ({ firstcolor, secondcolor, lastcolor, size, firststrokeColor, secondstrokeColor, laststrokeColor }) => {
  return (
    <Svg width={sizewidth/size} height={(sizeheight)/size} viewBox={`0 0 ${sizewidth} ${sizeheight}`}>
      <Defs>
        <ClipPath id="prefix__a">
          <Path
            data-name="Trazado 29"
            d="M50.441 40.16h23.131v29.385H50.441z"
          />
        </ClipPath>
        <ClipPath id="prefix__b">
          <Path data-name="Trazado 35" d="M50.441 40.16h76.9v97.694h-76.9z" />
        </ClipPath>
      </Defs>
      <G transform="translate(-8.007 -7.768)">
        <Path
          data-name="Trazado 38"
          d="M193.87 380.256A136.315 136.315 0 1157.555 516.571 136.315 136.315 0 01193.87 380.256z"
          fill={firstcolor} strokeWidth={2.5} stroke={firststrokeColor}
        />
        <Path
          data-name="Rect\xE1ngulo 1"
          fill="#ffd54f"
          d="M480.517 7.768l47.81 13.088L391.505 520.65l-47.81-13.089z"
        />
        <Path
          data-name="Rect\xE1ngulo 2"
          fill="#ffd54f"
          d="M288.079 38.256l49.42-3.966 41.455 516.629-49.42 3.965z"
        />
        <Circle
          data-name="Elipse 2"
          cx={136.315}
          cy={136.315}
          r={136.315}
          transform="translate(183.555 252.256)"
          fill={lastcolor} strokeWidth={2.5} stroke={laststrokeColor}
        />
        <Path
        
          transform="translate(0, 3)"
          data-name="Trazado 31"
          d="M750.376 553.747c-12.825-140.373-130.541-247.825-271.5-247.825S220.203 413.374 207.378 553.748z"
          fill={secondcolor} strokeWidth={2.5} stroke={secondstrokeColor}
        />
        <G data-name="Grupo 11">
          <G data-name="Grupo 6">
            <Path
              data-name="Trazado 26"
              d="M488.007 266.925a36.768 36.768 0 0115.048 70.313c-4.364 2.011-2.3 1.166-14.719 1.423-11.73.136-10.626.675-15.509-1.483a36.768 36.768 0 0115.18-70.253z"
              fill="#d02f2f"
            />
            <Path
              data-name="Trazado 27"
              d="M486.169 285.919s-.061-.9-1.609-3.14a77.786 77.786 0 00-17.813-18c-12.5-8.828-9.639-6.818-12.288-8.164a66.023 66.023 0 00-9.362-3.782 9.471 9.471 0 00-4.211 0"
              fill="#2f7931"
            />
          </G>
          <G
            data-name="Grupo 7"
            transform="translate(404.247 238.805)"
            opacity={0.27}
            clipPath="url(#prefix__a)"
          >
            <Path
              data-name="Trazado 28"
              d="M62.09 42.255c-1.424.545 1.766-.854-3.691 1.735-2.724 3.593-5.582 5.8-6.667 18.891 0 0 2.14.57 5.258-2.469 0 0 3.912-16.422 13.612-16.422 0 0 .615-2.939-5.621-2.179"
              fill="#fefefe"
            />
          </G>
        </G>
        <Path
          data-name="Trazado 39"
          d="M524.768 340.126v-8.621l-17.141 1.27s-1.557-2.139-6.361-2.46-6.047 2.072-10.447 2.46-3.389-.956-7.379-1.275-3.821 1.757-8.515 1.757c-1.7 0-2.856-.9-4.6-1.264a14.1 14.1 0 00-4.669 0l-9-.494-6.331 8.621z"
          fill={secondcolor}
        />
        <G
          data-name="Grupo 10"
          transform="translate(156.519 242.496)"
          opacity={0.27}
          clipPath="url(#prefix__b)"
        >
          <Path
            data-name="Trazado 34"
            d="M114.938 40.401s-57.612 11.671-64.5 94.722c0 0 4.607 7.578 14.972-2.526 0 0 26.491-77.04 58.739-77.04 0 0 11.518-17.682-9.214-15.156"
            fill="#fefefe"
          />
        </G>
        <Path
          data-name="Trazado 32"
          d="M231.047 752.024H578.03v34.079a15.49 15.49 0 01-15.49 15.49h-316a15.49 15.49 0 01-15.493-15.49z"
          fill="#efefef"
        />
        <Path
          data-name="Trazado 33"
          d="M25.149 553.747c-12.392 0-20.881 11.835-15.49 22.058C80.047 709.332 230.4 801.592 404.538 801.592s324.492-92.26 394.879-225.787c5.391-10.224-3.1-22.058-15.49-22.058z"
          fill="#efefef"
        />
        <Path
          data-name="Trazado 36"
          d="M73.862 484.9s3.623-21.408 17.481-38.361 33.892-24.542 33.892-24.542 4.507-.712 6.722 1.2 1.19 6.071 1.19 6.071-19.156 12.572-30.007 27.523-13.4 32.282-13.4 32.282-4.709 4.277-9.846 4.277-6.032-8.45-6.032-8.45z"
          fill="rgba(254,254,254,0.45)"
        />
        <Circle
          data-name="Elipse 3"
          cx={4}
          cy={4}
          r={4}
          transform="translate(135.878 416.15)"
          fill="rgba(255,255,255,0.45)"
        />
        <Path
          data-name="Trazado 37"
          d="M270.862 441.361s7.138-29.17 34.463-52.27 66.818-33.44 66.818-33.44 8.885-.97 13.252 1.633 2.345 8.273 2.345 8.273-37.765 17.13-59.157 37.5-26.411 43.987-26.411 43.987-9.284 5.827-19.411 5.827-11.899-11.51-11.899-11.51z"
          fill="rgba(254,254,254,0.45)"
        />
      </G>
    </Svg>
  )
}

const CustomProductIcon2Component = React.memo(CustomProductIcon2)
export default CustomProductIcon2Component
