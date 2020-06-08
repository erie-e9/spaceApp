import * as React from 'react';
import Svg, { Circle, Path, G } from 'react-native-svg';

const SunIcon = ({focused, color, size}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className='prefix__feather prefix__feather-sun'
    //   {...props}
    >
        <G 
          transform='translate(1 1)' 
          strokeLinecap='round'
          strokeLinejoin='round'
          fillRule='evenodd'>   
          <Circle cx={12} cy={12} r={5} stroke={color} strokeWidth={2}/>
          <Path stroke={color} strokeWidth={2} d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
        </G>
    </Svg>
  );
}

export default React.memo(SunIcon);