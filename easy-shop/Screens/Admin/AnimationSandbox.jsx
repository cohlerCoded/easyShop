import { StyleSheet, Text, View, Animated, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AnimationSandbox = () => {
  const translation = useRef(new Animated.Value(0)).current
  const translationPlaceHolder = useRef(new Animated.Value(0)).current
  let value = 0
  //   const moveSquare = () => {
  //     Animated.timing(translation, {
  //       toValue: value + 50,
  //       useNativeDriver: true,
  //     }).start()
  //     value += 50
  //   }
  const movePlaceHolder = () => {
    Animated.timing(translationPlaceHolder, {
      toValue: -25,
      useNativeDriver: true,
    }).start()
  }
  const movePlaceHolderBack = () => {
    Animated.timing(translationPlaceHolder, {
      toValue: 0,
      useNativeDriver: true,
    }).start()
  }
  //   useEffect(() => {
  //     movePlaceHolder()
  //   }, [movePlaceHolder])

  return (
    <Animated.View
    //   style={{
    //     width: 100,
    //     height: 100,
    //     backgroundColor: 'orange',
    //     transform: [{ translateX: translation }],
    //   }}
    >
      <TextInput
        style={{ margin: 20, borderWidth: 1 }}
        onFocus={movePlaceHolder}
        onBlur={movePlaceHolderBack}
      />
      <Animated.View
        style={{
          position: 'absolute',
          margin: 20,
          transform: [{ translateY: translationPlaceHolder }],
        }}
      >
        <Text style={{ marginLeft: 5, marginTop: 5 }}>PlaceHolder</Text>
      </Animated.View>
    </Animated.View>
  )
}

export default AnimationSandbox

const styles = StyleSheet.create({
  square: {},
})
