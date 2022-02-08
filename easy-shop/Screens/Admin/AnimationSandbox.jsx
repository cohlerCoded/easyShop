import {
  Text,
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  View,
} from 'react-native'
import React, { useState, useRef } from 'react'
import Svg, { Line } from 'react-native-svg'
import { AnimatedSVGPath } from 'react-native-svg-animations'
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const AnimationSandbox = () => {
  const [text, setText] = useState('')

  const translationPlaceHolder = useRef(new Animated.Value(0)).current
  const translationPlaceHolderSize = useRef(new Animated.Value(1)).current
  const translationPlaceHolderMargin = useRef(new Animated.Value(0)).current
  const translationPlaceHolderColor = useRef(new Animated.Value(0)).current
  const topBorderWidth = useRef(new Animated.Value(0)).current

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
    Animated.timing(topBorderWidth, {
      toValue: 1,
      useNativeDriver: false,
      duration: 250,
    }).start()
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

  const topBorder = topBorderWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  console.log(topBorderWidth)

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
          height='100%'
          width={width - 40}
          style={{ zIndex: 4, marginLeft: 20 }}
        >
          <Line x1={0} y1='0' x2='100%' y2='0' stroke='red' strokeWidth='4' />
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
      <View>
        <AnimatedSVGPath
          strokeColor={'green'}
          duration={500}
          strokeWidth={5}
          //   strokeDashArray={[42.76482137044271, 42.76482137044271]}
          height={400}
          width={width}
          scale={1.5}
          delay={0}
          d={d}
          loop={false}
        />
      </View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  text: {},
})

export default AnimationSandbox

{
  /* <svg width="647" height="180" viewBox="0 0 647 180" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_2_4" fill="white">
<path d="M0 0H647V180H0V0Z"/>
</mask> */
}
const d =
  'M0 0V-1H-1V0H0ZM274 0H275V-1H274V0ZM274 120V121H275V120H274ZM0 120H-1V121H0V120ZM0 1H274V-1H0V1ZM273 0V120H275V0H273ZM274 119H0V121H274V119ZM1 120V0H-1V120H1Z'
// // </svg>
// <svg width="274" height="120" viewBox="0 0 274 120" fill="none" xmlns="http://www.w3.org/2000/svg">
// <mask id="path-1-inside-1_2_4" fill="white">
// <path d="M0 0H274V120H0V0Z"/>
// </mask>
// <path d="M0 0V-1H-1V0H0ZM274 0H275V-1H274V0ZM274 120V121H275V120H274ZM0 120H-1V121H0V120ZM0 1H274V-1H0V1ZM273 0V120H275V0H273ZM274 119H0V121H274V119ZM1 120V0H-1V120H1Z" fill="black" mask="url(#path-1-inside-1_2_4)"/>
// </svg>
