import * as React from 'react';
import Svg, {Defs, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

function MasterCardIcon({size}) {
  return (
    <Svg viewBox="0 0 60 60" width={size} height={size}>
      <Defs />
      <Path fill="#ff5f00" d="M48.37 15.14h34.66v56.61H48.37z" />
      <Path
        d="M51.94 43.45a35.94 35.94 0 0113.75-28.3 36 36 0 100 56.61 35.94 35.94 0 01-13.75-28.31z"
        fill="#eb001b"
      />
      <Path
        className="prefix__e"
        d="M120.5 65.76V64.6h.5v-.24h-1.19v.24h.47v1.16zm2.31 0v-1.4h-.36l-.42 1-.42-1h-.36v1.4h.26V64.7l.39.91h.27l.39-.91v1.06zM123.94 43.45a36 36 0 01-58.25 28.3 36 36 0 000-56.61 36 36 0 0158.25 28.3z"
      />
    </Svg>
  );
}

const MemoMasterCardIcon = React.memo(MasterCardIcon);
export default MemoMasterCardIcon;
