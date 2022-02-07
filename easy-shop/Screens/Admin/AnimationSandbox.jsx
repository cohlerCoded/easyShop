import { StyleSheet, Text, View, Animated, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AnimationSandbox = () => {
  const [text, setText] = useState('')
  const translation = useRef(new Animated.Value(0)).current
  const translationPlaceHolder = useRef(new Animated.Value(0)).current
  const translationPlaceHolderSize = useRef(new Animated.Value(1)).current
  const translationPlaceHolderMargin = useRef(new Animated.Value(0)).current
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
      toValue: -20,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderSize, {
      toValue: 0.75,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderMargin, {
      toValue: -15,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }
  const movePlaceHolderBack = () => {
    Animated.timing(translationPlaceHolder, {
      toValue: !text.length ? 0 : -20,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderSize, {
      toValue: !text.length ? 1 : 0.75,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderMargin, {
      toValue: !text.length ? 0 : -15,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }
  //   useEffect(() => {
  //     movePlaceHolder()
  //   }, [movePlaceHolder])

  return (
    <Animated.View
      style={{ backgroundColor: '#f1eff1' }}
      //   style={{
      //     width: 100,
      //     height: 100,
      //     backgroundColor: 'orange',
      //     transform: [{ translateX: translation }],
      //   }}
    >
      <TextInput
        value={text}
        onChangeText={(input) => setText(input)}
        style={{
          paddingLeft: 10,
          fontSize: 16,
          margin: 20,
          borderWidth: 1,
          height: 40,
        }}
        onFocus={movePlaceHolder}
        onBlur={movePlaceHolderBack}
      />
      <Animated.View
        style={{
          position: 'absolute',
          margin: 25,
          backgroundColor: '#f1eff1',
          transform: [
            { translateY: translationPlaceHolder },
            { scale: translationPlaceHolderSize },
            { translateX: translationPlaceHolderMargin },
          ],
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            marginVertical: 5,
            marginHorizontal: 5,
            fontSize: 16,
            color: 'lightgrey',
          }}
        >
          PlaceHolder
        </Text>
      </Animated.View>
    </Animated.View>
  )
}

export default AnimationSandbox

const styles = StyleSheet.create({
  square: {},
})
