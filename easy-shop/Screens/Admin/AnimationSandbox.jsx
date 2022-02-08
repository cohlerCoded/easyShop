import { TextInput, StyleSheet, Animated, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import Svg, { Line } from 'react-native-svg'

const { width } = Dimensions.get('window')

const AnimationSandbox = () => {
  const [text, setText] = useState('')

  const AnimatedLineTopFocus = Animated.createAnimatedComponent(Line)
  const AnimatedLineRightFocus = Animated.createAnimatedComponent(Line)
  const AnimatedLineBottomFocus = Animated.createAnimatedComponent(Line)
  const AnimatedLineLeftFocus = Animated.createAnimatedComponent(Line)

  const translationPlaceHolder = useRef(new Animated.Value(0)).current
  const translationPlaceHolderSize = useRef(new Animated.Value(1)).current
  const translationPlaceHolderMargin = useRef(new Animated.Value(0)).current
  const translationPlaceHolderColor = useRef(new Animated.Value(0)).current

  const topBorderLine = useRef(new Animated.Value(0)).current
  const rightBorderLine = useRef(new Animated.Value(0)).current
  const bottomBorderLine = useRef(new Animated.Value(0)).current
  const leftBorderLine = useRef(new Animated.Value(0)).current

  const movePlaceHolder = () => {
    Animated.timing(translationPlaceHolder, {
      toValue: -20,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderSize, {
      toValue: 0.75,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderMargin, {
      toValue: -15,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderColor, {
      toValue: 1,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.sequence([
      Animated.timing(topBorderLine, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
      }),
      Animated.timing(rightBorderLine, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
      }),
      Animated.timing(bottomBorderLine, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
      }),
      Animated.timing(leftBorderLine, {
        toValue: 1,
        useNativeDriver: false,
        duration: 100,
      }),
    ]).start()
  }

  const movePlaceHolderBack = () => {
    Animated.timing(translationPlaceHolder, {
      toValue: !text.length ? 0 : -20,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderSize, {
      toValue: !text.length ? 1 : 0.75,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderMargin, {
      toValue: !text.length ? 0 : -15,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderColor, {
      toValue: 0,
      useNativeDriver: false,
      duration: 250,
    }).start()
  }

  const color = translationPlaceHolderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(125, 211, 252)', 'rgb(3, 105, 161)'],
  })

  const topBorder = topBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - 20],
  })
  const rightBorder = rightBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })
  const bottomBorder = bottomBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  })
  const leftBorder = leftBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  })

  return (
    <Animated.View style={{ backgroundColor: '#f1eff1' }}>
      <Animated.View
        pointerEvents='none'
        style={{
          zIndex: 3,
          marginTop: 20,
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
      >
        <Svg
          height={40}
          width={width - 40}
          style={{ zIndex: 0, marginLeft: 20 }}
        >
          <AnimatedLineTopFocus
            x1='0%'
            y1='0%'
            x2={topBorder}
            y2='0%'
            stroke='#7dd3fc'
            strokeWidth='4'
          />
          <AnimatedLineRightFocus
            x1='100%'
            y1='0%'
            x2='100%'
            y2={rightBorder}
            stroke='#7dd3fc'
            strokeWidth='4'
          />
          <AnimatedLineBottomFocus
            x1='100%'
            y1='100%'
            x2={bottomBorder}
            y2='100%'
            stroke='#7dd3fc'
            strokeWidth='4'
          />
          <AnimatedLineLeftFocus
            x1='0%'
            y1='100%'
            x2='0%'
            y2={leftBorder}
            stroke='#7dd3fc'
            strokeWidth='4'
          />
        </Svg>
      </Animated.View>

      <TextInput
        selectionColor={'#7dd3fc'}
        value={text}
        onChangeText={(input) => setText(input)}
        style={{
          paddingLeft: 10,
          fontSize: 16,
          margin: 20,
          borderWidth: 2,
          borderStartWidth: 1,
          borderColor: '#0369a1',
          height: 40,
        }}
        onFocus={movePlaceHolder}
        onBlur={movePlaceHolderBack}
      ></TextInput>
      <Animated.View
        pointerEvents='none'
        style={{
          zIndex: 3,
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
        <Animated.Text
          style={{
            textAlign: 'center',
            marginVertical: 5,
            marginHorizontal: 5,
            fontSize: 16,
            color: color,
          }}
        >
          PlaceHolder
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  text: {},
})

export default AnimationSandbox
