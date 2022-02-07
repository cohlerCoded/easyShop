import { Text, Animated, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'

const AnimationSandbox = () => {
  const [text, setText] = useState('')
  const translationPlaceHolder = useRef(new Animated.Value(0)).current
  const translationPlaceHolderSize = useRef(new Animated.Value(1)).current
  const translationPlaceHolderMargin = useRef(new Animated.Value(0)).current
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

  return (
    <Animated.View style={{ backgroundColor: '#f1eff1' }}>
      <TextInput
        selectionColor={'lightgrey'}
        value={text}
        onChangeText={(input) => setText(input)}
        style={{
          paddingLeft: 10,
          fontSize: 16,
          margin: 20,
          borderWidth: 1,
          borderColor: '#000',
          height: 40,
        }}
        onFocus={movePlaceHolder}
        onBlur={movePlaceHolderBack}
      />
      <Animated.View
        pointerEvents='none'
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
