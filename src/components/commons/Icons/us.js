import * as React from 'react'
import Svg, { Path, G, Use } from 'react-native-svg'

function USIconComponent(props) {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 3910 4000'
      width={30} height={13}
    >
      <Path fill='#b22234' d='M0 0h7410v3900H0z' />
      <Path
        d='M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0'
        stroke='#fff'
        strokeWidth={300}
      />
      <Path fill='#3c3b6e' d='M0 0h2964v2100H0z' />
      <G fill='#fff'>
        <G id='prefix__d'>
          <G id='prefix__c'>
            <G id='prefix__e'>
              <G id='prefix__b'>
                <Path
                  id='prefix__a'
                  d='M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z'
                />
                <Use xlinkHref='#prefix__a' y={420} />
                <Use xlinkHref='#prefix__a' y={840} />
                <Use xlinkHref='#prefix__a' y={1260} />
              </G>
              <Use xlinkHref='#prefix__a' y={1680} />
            </G>
            <Use xlinkHref='#prefix__b' x={247} y={210} />
          </G>
          <Use xlinkHref='#prefix__c' x={494} />
        </G>
        <Use xlinkHref='#prefix__d' x={988} />
        <Use xlinkHref='#prefix__c' x={1976} />
        <Use xlinkHref='#prefix__e' x={2470} />
      </G>
    </Svg>
  )
}

const MemoUSIconComponent = React.memo(USIconComponent)
export default MemoUSIconComponent
