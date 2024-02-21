import * as React from 'react'
import Svg, { Path, Text, TSpan } from 'react-native-svg'

const MapaSVG = ({ state, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={283}
    height={189}
    fill="none"
    {...props}
  >
    <Path fill="#E4E4E4" d="M0 0h283v189H0z" />
    <Path fill="#D9D9D9" d="M9 9h100v100H9z" />
    <Path fill="#DEC7C7" d="M156 61h100v100H156z" />
    <Text
      xmlSpace="preserve"
      fill="#000"
      fontFamily="Inter"
      fontSize={12}
      letterSpacing="0em"
      style={{
        whiteSpace: 'pre',
      }}
    >
      <TSpan x={49} y={63.864}>
        {state['510'] || '-'}
      </TSpan>
    </Text>
    <Text
      xmlSpace="preserve"
      fill="#000"
      fontFamily="Inter"
      fontSize={12}
      letterSpacing="0em"
      style={{
        whiteSpace: 'pre',
      }}
    >
      <TSpan x={196} y={120.864}>
        {state['410'] || '-'}
      </TSpan>
    </Text>
  </Svg>
)
export { MapaSVG }
