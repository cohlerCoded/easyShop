import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const AnimationSandbox = () => {
  const [translation, setTranslation] = useState(0)
  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        setTranslation(i)
      }, 25 * i)
    }
  }, [])

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
