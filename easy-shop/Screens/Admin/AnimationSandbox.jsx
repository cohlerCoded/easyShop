import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const AnimationSandbox = () => {
  const [translation, setTranslation] = useState(50)

  return (
    <View style={styles.square} transform={[{ translateX: translation }]}>
      <Text>AnimationSandbox</Text>
    </View>
  )
}

export default AnimationSandbox

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
  },
})
