import { Dimensions } from 'react-native'
import { Button, Image, Text, View } from 'tamagui'
import { MapaSVG } from '../../assets/Mapa'
import { useEffect, useRef, useState } from 'react'

export const MapExample = () => {
  const [dataTest, setDataTest] = useState({
    410: 0,
    510: 0,
  })
  const [color, setColor] = useState('#ff0000')
  const width = Dimensions.get('window').width

  return (
    <View>
      <Text fontSize="$8" marginTop="$10">
        Map
      </Text>
      <Text>
        {width} x {Dimensions.get('window').height}
      </Text>
      <Button
        onPress={() => setDataTest((prev) => ({ ...prev, 410: prev[410] + 1 }))}
      >
        add 410
      </Button>
      <Button
        onPress={() => setDataTest((prev) => ({ ...prev, 510: prev[510] + 1 }))}
      >
        add 510
      </Button>

      <MapaSVG state={dataTest} />
    </View>
  )
}
