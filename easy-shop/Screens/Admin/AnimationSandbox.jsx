import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AnimationSandbox = () => {
  const translation = useRef(new Animated.Value(0)).current
  let value = 0
  const moveSquare = () => {
    Animated.timing(translation, {
      toValue: value + 50,
      useNativeDriver: true,
    }).start()
    value += 50
  }
  useEffect(() => {
    moveSquare()
  }, [moveSquare])

  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        transform: [{ translateX: translation }],
      }}
    >
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'orange',
        }}
        onPress={moveSquare}
      >
        <Text>AnimationSandbox</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default AnimationSandbox

const styles = StyleSheet.create({
  square: {},
})
