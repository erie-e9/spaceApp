import React from 'react';
// import styled from 'styled-components/native';
// import {SvgXml} from 'react-native-svg';
// import testSvg from './landscape-iceCream.svg';
// export default () => <SvgXml width="200" height="200" xml={testSvg} />;
import Svg, {
  // Circle,
  // Ellipse,
  G,
  // Text,
  // TSpan,
  // TextPath,
  Path,
  // Polygon,
  // Polyline,
  // Line,
  // Rect,
  Use,
  Image,
  // Symbol,
  Defs,
  // LinearGradient,
  // RadialGradient,
  // Stop,
  // ClipPath,
  Pattern,
  // Mask,
  // Marker,
} from 'react-native-svg';

// const Root = styled.View``;

const LandscapeAuth = ({children}) => {
  return (
    <>
      <Svg viewBox="0 0 420.1 800.2">
        {children}
        <Defs>
          <Pattern
            id="pattern"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 192 192">
            <Image
              width="192"
              height="192"
              // xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUdwTP5rpP5rpPlYlv5rpP5rpPxinftgnP5rpP5rpPZPj/ZPj/ZPj/ZPj/ZPj/ZPj/5qo/5rpPZPj/pdmvZPj/5rpP5rpPpdmvZPj/5rpJPC5WsAAAAYdFJOUwBgnyq/1E0H9z8/wJ/41GAusrIR9MNwjHz9tA8AAARoSURBVHja7ZwLloMgDEWLioD/tnYG97/Rqb+2TlWJgsZzcjcweU0C4YFzuRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRBEj1CKBbJq4Z5S4lzRe7z6Bw+8k4gYi/6dCfQaBJuKvtPAxJnDb9NQoI0/XA6/RiLNgvBkZQgPz/vzd0nw0CUhlBUIZEkAlM8rCZgUiGsFB1Evr4r/yVWcO34sCtbHj0OB+KmqUytg1SbYboEWigUdn+N9KLcJ2Gs1/Q3kv/G+/cOCVxvhOxRRwQI5Mg3UaWDVZpwXUTG5y3J259sFOE7B/JAgKwt4B86YVgRIH9OMhioFxbXaBVcp2LjE837bCOQxC9GG+HnAPq2sQilvVgW/I4pfBkyJ0Z18pqEUmvg5K+Y2RL5bG68aEeSi8zZlHFmvoVUz/uc53Y+iKIlbkigSHxLkHjW0YsR5H3H9Z+ipHpDFuT+7OHuHF9C1q32R/w++I41zMb09PuwK8ODVL7rwMz1NloipFUJaNUx96ArUnUrmw28kdFn4VqCOTEAXf7gUfiMhHFdgUwB0yO/jT7UJafi9TMiA/1gUoFYNk4bx9wr6hVrWR+ziItRxFdQ6I8bx9wrqRuN17NYBVlA7CwPi7xWEgSNzVK1oAFD8rz5A4VQ1DSAyrdcrqMeOGlv5eIAtBXHTUFL/NXW8du4sTiIbZ7MAXECJhnMTF39k6kg/hqa1B2EJLaDfUq9RkEz0TZr4u/VwswL5qbZMmoidBHhrC8hw4HAtoE1A6UDAliQABASuEtB1uXMBzFkCtihQsD3AVQJWKwBcedUtfM80IgVCeQFgkqsn4Ei7JAdGDxxDC7cV9KQ039JMniqNrUGxUwH6drdf+QMnpCjdCtCRw4sA5rwFniRujFzZXxUnrgWYdAH0HkkGbwc6di3AYCEC+rhD/9y9gGyxjT1Y+GJwFMycCyhzi/X/NqBFlMdxqvcgtmeDvgzoKMn0bsS2GqD/+ZcdXLsHg/Jux0IxNqB33cvMTTiIAb2jAAWLXySpxiXAg8V/0xqXAOMKYgfGPyfAtIKu4sD49W3ab2QA9+Sw+AcXnOts3Ma+yvWhZKMS5NH21VYJ50nAxOHG3Hy4ZwgElF85MJug73scHdcZRcc60BbOZ+eqoKaKwnUCkFRQvRYJqICmBXI0AoZLkfEYFOMRMPBZTCsIk4BBCvgZBXz6LOyMAj7Ha3VKAQnsQINPQAY7EOAToGG2Fm4BBqd6hWkU+haw/MK12cgitAKWu6C5ykMsYNkcRTWNfgtY7mOGrouB3soDXRcDHXZMR8pRAYsKsDVBNnJLL09hq0y6KwsXZUiMrXmzt5i7K2ao2njq3nXmq8/2cWuGuIK6Tpj82I4h6oLZtwfF1AeDxcH+ukkCvj/9f/MoLlgUlFte9WJQkF8up1Zw2/hEX+TpqeOvN7TbueM/5K1Bx7Y37QMJcXpE+DY/vB/5XtXx/JC4+9cNBEEQBEEQBEEQBEEQBEEQBEEQBEEQBvwByjv9J3/AR7wAAAAASUVORK5CYII='
            />
          </Pattern>
          <Image
            id="image"
            width="26"
            height="26"
            // xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUdwTP9rp+8JNJsAAAABdFJOUwBA5thmAAABMUlEQVR42u3aUQ6CQBTFULv/TfttQoyC8qbQruCeHwIzPB5VVVVVVVVVVVVVVVVVVVX1Etupx0sMfJB8/sIEvkg+f0ECO7LvX0jA7uz71xCAW8DR7PuHBeAWgFsAbgFyALgFIBcgFyAHgFyAXECAWQEBZgUEGBb4AJyUe/1/BJybfP6vAeAGgFoAbgByAHIAcgByAHIAuAXtn0WwSHrAXgNLZd+/gwBuAsgF2AXgJoBcgFwAcgF2QYBpAXIBAYYF2AUBpgUBpgUBAhwTIAYgyr1+AwBuAHIAbgC4AQSYBSAHEGAWQIBZAAECBOghFOCOgN6Eepe+N6DPyYUOJOwHKgHG9/sE9lNp+aWA/lrDfan05l7Mvv8Cl/P+X2wu8KNcVVVVVVVVVVVVVVVVVVXV4j0B+MI58rbGYjwAAAAASUVORK5CYII='
          />
          <Image
            id="image-2"
            width="63"
            height="63"
            // xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABmUExURUdwTP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////26W6sgAAAAhdFJOUwC29e8a0sesBSwMOCL6R5wTU+Nhkoj9fGmk28DqdW9BTKGjaoEAAAOGSURBVBgZ7cFXcuNIFATAgm94b2nr/pec3diPWYikSEpAszviZUIIIYQQQgghhBBCCCGEEEIIISyT+Gnbl9E/5u50jStYpSpG58j/GYKyjWGLuAsG3mqcOoEFiijnI8vZh+FSh98KJgWDVZ3LZw4p7kkqP4vjzK8UPqcI+AJ3VFjzr2N5CBovz49N4HSna4WPOLl8TeTjL39ympwc+FfeOK0P3ZKSLwti/EddZ5e3BtItC2iVRHxDk+Jf9WHgQ7lTQJ/E4VuaFEgdPhHF0ERFfM/QpCePTx1HBS06vs3lS5wMGrQ5d9MU2F3scUdui50lDvc1YV8Td5a32JPfcG95jR2N3N8xxm78IzUIK+xlpBYddlKF1GIosI+CmoQJdtFRlwl7UAt1WSrsIKY+LXZwpj6BwvZmajPkV2wvpEYdNucv1GipsLW4oU4ptpZ61OmErV1y6uRga8VAjYYGWysG6uRl2NjFpU7uBRtLj9RpqLGxbKFWEzamQmp1xrZUFlKrXmEzWdEfGm+gVm4TdnWm8Gv+FB35Ka5zjvEr6dzwgwbyGBUKP3WJOPDzDrXCT8RRTkMcCrwtGV2aYygzvCcNaZalxjsml6YZ+gSvUh1N5Ph4TRLRTEGGV/gHmmqJ8VxyoLmaGM8kEU0WZHiio9kOCb51pulmhW+kHo034bEkoPm8GA/1tMFB4YHUpRVaPODQDouPuwoOtMOIuw60hefjjsKlNUbcMdMeQYUbmUeL1Lgx0SYzboS0iefji8ylTYYaX0y0S4kvStolUFhJDrTLMcZK1tAueY2VdKBlTlipaZmhw8qZtpmx0tM2DlZK2ibESknbhFgpaZsQKyVtE2KlpG1CrHS0jYOVkbaZsdLSNh1WLrTNCSvxkXYZaqxUIe1yjLE20y6BwtqJdpnxRezSKjW+CmgT18dXI20S4Ubs0iItbiiH9lh83KoHWqPHHUlAW7g+7mlpix53qZB2aDLcV+S0whmPlLRBqPCI39B8borHrjmNN+I7PU0XJfiOimi2wMf3qpAma2I8kwU0l3fBc1lAUx0veEUW0kxNitdUEU0UxHiV6mme2ccb6oVmOZ7xHr+kSZwYbytCmmJpFX6iDWmCYEzwQ0nt5PysIWx9/Ebchx4/xQ26VOG3VDqVQU7tluh0SbCRKiumvox0mfvzNfYVhBBCCCGEEEIIIYQQQgghhBC3/gDiBRJb3b9rigAAAABJRU5ErkJggg=='
          />
        </Defs>
        <G data-name="Grupo 25" transform="translate(6.1)">
          <Path fill="#f5f5f5" d="M0 0H414V736H0z" data-name="Rectángulo 4" />
          <Use
            opacity="0.67"
            transform="translate(235 589)"
            // xlinkHref='#image'
          />
          <Path
            fill="#f5b7ce"
            d="M343.613 767.948s-49.466-128.755-112.457-157.009-143.648 23.05-143.648 23.05L72.4 646.876l22.662 121.072z"
            data-name="Trazado 4"
            transform="translate(-15.1 -31.947)"
          />
          <Path
            fill="#ff5a99"
            d="M421 255.5c-117 80.533-123.947 141.908-123.947 141.908l-14 43.249S251 463.831 248.2 471.517 225.9 550.1 225.9 550.1H421z"
            data-name="Trazado 1"
            transform="translate(-7 186.2)"
          />
          <Path
            fill="#ff5a99"
            d="M130.419 742.241c12.03 1.319-7.626-54.086-38.454-92.85s-41.891-48.4-41.891-48.4-9.345-20.194-35.017-42.011S-19.1 533.1-19.1 533.1l5.156 213.2s132.333-5.378 144.363-4.059z"
            data-name="Trazado 2"
            transform="translate(13 -4.1)"
          />
          <G
            fill="none"
            stroke="#f54f8e"
            data-name="Grupo 20"
            transform="translate(1 233)">
            <G data-name="Grupo 19">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(27.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(14.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(14.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(14.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(14.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(14.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(14.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(27.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(26.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(26.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(26.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(26.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(26.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(26.5 487.043)"
              />
            </G>
            <G data-name="Grupo 18">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(67.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(54.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(54.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(54.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(54.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(54.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(54.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(67.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(66.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(66.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(66.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(66.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(66.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(66.5 487.043)"
              />
            </G>
            <G data-name="Grupo 17">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(107.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(94.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(94.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(94.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(94.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(94.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(94.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(107.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(106.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(106.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(106.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(106.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(106.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(106.5 487.043)"
              />
            </G>
            <G data-name="Grupo 16">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(147.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(134.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(134.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(134.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(134.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(134.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(134.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(147.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(146.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(146.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(146.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(146.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(146.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(146.5 487.043)"
              />
            </G>
            <G data-name="Grupo 15">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(187.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(174.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(174.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(174.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(174.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(174.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(174.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(187.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(186.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(186.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(186.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(186.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(186.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(186.5 487.043)"
              />
            </G>
            <G data-name="Grupo 14">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(227.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(214.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(214.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(214.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(214.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(214.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(214.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(227.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(226.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(226.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(226.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(226.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(226.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(226.5 487.043)"
              />
            </G>
            <G data-name="Grupo 13">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(267.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(254.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(254.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(254.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(254.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(254.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(254.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(267.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(266.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(266.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(266.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(266.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(266.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(266.5 487.043)"
              />
            </G>
            <G data-name="Grupo 12">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(307.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(294.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(294.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(294.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(294.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(294.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(294.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(307.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(306.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(306.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(306.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(306.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(306.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(306.5 487.043)"
              />
            </G>
            <G data-name="Grupo 11">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(347.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(334.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(334.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(334.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(334.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(334.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(334.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(347.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(346.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(346.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(346.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(346.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(346.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(346.5 487.043)"
              />
            </G>
            <G data-name="Grupo 10">
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(387.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 2"
                transform="translate(374.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 3"
                transform="translate(374.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 4"
                transform="translate(374.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 5"
                transform="translate(374.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 6"
                transform="translate(374.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M0 9.206L14 0"
                data-name="Línea 7"
                transform="translate(374.5 487.043)"
              />
              <Path
                strokeWidth="3"
                d="M0 71.6L0 0"
                data-name="Línea 1"
                transform="translate(387.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 2"
                transform="translate(386.5 435.9)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 3"
                transform="translate(386.5 446.129)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 4"
                transform="translate(386.5 456.357)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 5"
                transform="translate(386.5 466.586)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 6"
                transform="translate(386.5 476.814)"
              />
              <Path
                strokeWidth="4"
                d="M14 9.206L0 0"
                data-name="Línea 7"
                transform="translate(386.5 487.043)"
              />
            </G>
          </G>
          <Image
            width="56"
            height="56"
            transform="translate(133 543)"
            // xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJUExURUdwTP////j4+DIaUNEAAAABdFJOUwBA5thmAAAB+0lEQVR42u3bW5LTQBQE0b61/0XzQQCBQRqpn1WQuYBxHVoT2B2e1oiIiIiIiIiIiIiIiIiIiIiIfqQ/yl6fhNB94fPdCXpW+n5Xgt6Uvt+QIEUL1FP6fiOClC2QsgVStkAKF8QALl5XyhBcvbCUILh56QSAlhc+fy1AihZI2QApW6BwwLxVZwSz/0V3A1Y8DjsBi57mbYLh9fXRlz/ZAnAx/sOwAzAwv+66+ennAV/Pvycc3v9s/k+CHeD5/ktBzP4rwUnAu/3fBR8/4TygqlNg8Cbi9f5fApuL/qoOgcnHmK79vwlmq94DqnoFS45mywFUVVv0eO3av+w3ZM8DtJBgcABjAosDGCF4HMCAwOUAugVGgErf/1ogSbmAvs+R5SLo/RhfJoLee5QyASgcIGNArXv8mwlg6AK6DATzbqDPAKZeQB8ATL+A3ixYewNnBjg0/xYQsX8S4Nj8SYCD+yt9/yxAHWwYcHj/pSHiAbojBB3A3wlRBzAGKJPiAdUDaP8AoMpTkAio/w/QzAAFwEgAAMCOXwIAp/8nAHD87RCA02+pnd9LPBLEA2QOaPGAlvYMvb/h8ge0qCPouOi1AvRcVRtfDT3/K6+A/TcGoyMY+Eps+n4PQQsXDH83P33/YcGcv/AIn+/4lQ8iIiIiIiIiIiIiIiIiouV9A8DQSvSWdJb1AAAAAElFTkSuQmCC'
          />
          <Use
            data-name="cloudpink1"
            opacity="0.67"
            transform="matrix(2 0 0 2 5 494)"
            // xlinkHref='#image'
          />
          <Use transform="translate(307 502)" />
          <Use
            data-name="cloudwhite1"
            transform="matrix(.524 0 0 .524 33 501)"
            // xlinkHref='#image-2'
          />
          <Path
            fill="url(#pattern)"
            d="M0 0H68V69H0z"
            opacity="0.32"
            transform="translate(239 460)"
          />
          <Image
            width="24"
            height="24"
            data-name="cloudspink1"
            opacity="0.15"
            transform="translate(105 496)"
            // xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABOUExURUdwTP5rpP5rpPlYlv5rpP5rpPxinftgnP5rpP5rpPZPj/ZPj/ZPj/ZPj/ZPj/ZPj/5qo/5rpPZPj/pdmvZPj/5rpP5rpPpdmvZPj/5rpJPC5WsAAAAYdFJOUwBgnyq/1E0H9z8/wJ/41GAusrIR9MNwjHz9tA8AAARoSURBVHja7ZwLloMgDEWLioD/tnYG97/Rqb+2TlWJgsZzcjcweU0C4YFzuRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRBEj1CKBbJq4Z5S4lzRe7z6Bw+8k4gYi/6dCfQaBJuKvtPAxJnDb9NQoI0/XA6/RiLNgvBkZQgPz/vzd0nw0CUhlBUIZEkAlM8rCZgUiGsFB1Evr4r/yVWcO34sCtbHj0OB+KmqUytg1SbYboEWigUdn+N9KLcJ2Gs1/Q3kv/G+/cOCVxvhOxRRwQI5Mg3UaWDVZpwXUTG5y3J259sFOE7B/JAgKwt4B86YVgRIH9OMhioFxbXaBVcp2LjE837bCOQxC9GG+HnAPq2sQilvVgW/I4pfBkyJ0Z18pqEUmvg5K+Y2RL5bG68aEeSi8zZlHFmvoVUz/uc53Y+iKIlbkigSHxLkHjW0YsR5H3H9Z+ipHpDFuT+7OHuHF9C1q32R/w++I41zMb09PuwK8ODVL7rwMz1NloipFUJaNUx96ArUnUrmw28kdFn4VqCOTEAXf7gUfiMhHFdgUwB0yO/jT7UJafi9TMiA/1gUoFYNk4bx9wr6hVrWR+ziItRxFdQ6I8bx9wrqRuN17NYBVlA7CwPi7xWEgSNzVK1oAFD8rz5A4VQ1DSAyrdcrqMeOGlv5eIAtBXHTUFL/NXW8du4sTiIbZ7MAXECJhnMTF39k6kg/hqa1B2EJLaDfUq9RkEz0TZr4u/VwswL5qbZMmoidBHhrC8hw4HAtoE1A6UDAliQABASuEtB1uXMBzFkCtihQsD3AVQJWKwBcedUtfM80IgVCeQFgkqsn4Ei7JAdGDxxDC7cV9KQ039JMniqNrUGxUwH6drdf+QMnpCjdCtCRw4sA5rwFniRujFzZXxUnrgWYdAH0HkkGbwc6di3AYCEC+rhD/9y9gGyxjT1Y+GJwFMycCyhzi/X/NqBFlMdxqvcgtmeDvgzoKMn0bsS2GqD/+ZcdXLsHg/Jux0IxNqB33cvMTTiIAb2jAAWLXySpxiXAg8V/0xqXAOMKYgfGPyfAtIKu4sD49W3ab2QA9+Sw+AcXnOts3Ma+yvWhZKMS5NH21VYJ50nAxOHG3Hy4ZwgElF85MJug73scHdcZRcc60BbOZ+eqoKaKwnUCkFRQvRYJqICmBXI0AoZLkfEYFOMRMPBZTCsIk4BBCvgZBXz6LOyMAj7Ha3VKAQnsQINPQAY7EOAToGG2Fm4BBqd6hWkU+haw/MK12cgitAKWu6C5ykMsYNkcRTWNfgtY7mOGrouB3soDXRcDHXZMR8pRAYsKsDVBNnJLL09hq0y6KwsXZUiMrXmzt5i7K2ao2njq3nXmq8/2cWuGuIK6Tpj82I4h6oLZtwfF1AeDxcH+ukkCvj/9f/MoLlgUlFte9WJQkF8up1Zw2/hEX+TpqeOvN7TbueM/5K1Bx7Y37QMJcXpE+DY/vB/5XtXx/JC4+9cNBEEQBEEQBEEQBEEQBEEQBEEQBEEQBvwByjv9J3/AR7wAAAAASUVORK5CYII='
          />
        </G>
      </Svg>
    </>
  );
};

export default LandscapeAuth;
