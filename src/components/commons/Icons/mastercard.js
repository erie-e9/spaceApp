import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MasterCardIcon(props) {
  return (
    <Svg width={20.016} height={13.916} viewBox="0 0 18.016 11.916" {...props}>
      <Path
        data-name="Rect\xE1ngulo 2"
        fill="#ff5f00"
        d="M6.632 2.076h4.753v7.762H6.632z"
      />
      <Path
        data-name="Trazado 1"
        d="M7.122 5.958a4.928 4.928 0 011.885-3.88 4.936 4.936 0 100 7.762 4.928 4.928 0 01-1.885-3.882z"
        fill="#eb001b"
      />
      <Path
        data-name="Trazado 2"
        d="M16.518 9.017v-.159h.069v-.033h-.163v.033h.064v.159zm.317 0v-.192h-.049l-.058.137-.058-.137h-.049v.192h.036v-.145l.053.125h.037l.053-.125v.145z"
        fill="#f79e1b"
      />
      <Path
        data-name="Trazado 3"
        d="M16.994 5.958a4.936 4.936 0 01-7.987 3.88 4.936 4.936 0 000-7.762 4.936 4.936 0 017.987 3.88z"
        fill="#f79e1b"
      />
    </Svg>
  )
}

const MemoMasterCardIcon = React.memo(MasterCardIcon)
export default MemoMasterCardIcon
