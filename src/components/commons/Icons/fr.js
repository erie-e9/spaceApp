import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function FRIconComponent(props) {
  return (
    <Svg 
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 3.2 1.8'
      width={30.899} height={11}>
      <Path fill='#ED2939' d='M0 0h3v2H0z' />
      <Path fill='#fff' d='M0 0h2v2H0z' />
      <Path fill='#002395' d='M0 0h1v2H0z' />
    </Svg>
  )
}

const MemoFRIconComponent = React.memo(FRIconComponent)
export default MemoFRIconComponent
