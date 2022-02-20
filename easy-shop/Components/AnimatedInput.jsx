import {
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Svg, { Line } from 'react-native-svg'
import PropTypes from 'prop-types'

const { width } = Dimensions.get('window')

const AnimatedInput = (props) => {
  const inputWidth =
    props.width && typeof props.width === 'string'
      ? (width * parseInt(props.width)) / 100
      : props.width
      ? props.width
      : width
  const height = props.fontSize * 1.9
  const [value, setValue] = useState(null)

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
    if (props.isSelectable) return
    Animated.timing(translationPlaceHolder, {
      toValue: height / -1.5 || -20,
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
    Animated.timing(translationPlaceHolderColor, {
      toValue: 1,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.sequence([
      Animated.timing(topBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 125,
      }),
      Animated.timing(rightBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 25,
      }),
      Animated.timing(bottomBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 125,
      }),
      Animated.timing(leftBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 25,
      }),
    ]).start()
  }

  const movePlaceHolderBack = () => {
    Animated.timing(translationPlaceHolder, {
      toValue: props.value.length < 1 ? 0 : height / -1.5 || -20,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderSize, {
      toValue: props.value.length < 1 ? 1 : 0.75,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderMargin, {
      toValue: props.value.length < 1 ? 0 : -15,
      useNativeDriver: true,
      duration: 250,
    }).start()
    Animated.timing(translationPlaceHolderColor, {
      toValue: 0,
      useNativeDriver: false,
      duration: 250,
    }).start()
    Animated.sequence([
      Animated.timing(leftBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 25,
      }),
      Animated.timing(bottomBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 125,
      }),
      Animated.timing(rightBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 25,
      }),
      Animated.timing(topBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 125,
      }),
    ]).start()
  }

  const showSelectionList = () => (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!modalVisible)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ width: '100%' }}
            keyExtractor={(item, i) => i}
            data={props.states}
            renderItem={({ item }) => <Text>{item}</Text>}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )

  const color = translationPlaceHolderColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      props.placeHolderColor || 'rgb(125, 211, 252)',
      props.borderColor || 'rgb(3, 105, 161)',
    ],
  })

  const topBorder = topBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
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

  useEffect(() => {
    if (props.isSelectable) {
      movePlaceHolderBack()
    }
  }, [props.value, movePlaceHolderBack])

  return (
    <Animated.View
      style={{
        backgroundColor: props.backgroundColor || '#f1eff1',
        width: '100%',
      }}
    >
      <Animated.View
        pointerEvents='none'
        style={{
          zIndex: 3,
          marginTop: height / 2 || 20,
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
      >
        <Svg
          height={height * 1.3 + props.borderWidth || 40}
          width={
            props.marginLeft || props.marginRight
              ? inputWidth + props.borderWidth - props.marginLeft ||
                props.marginRight
              : props.marginHorizontal
              ? inputWidth + props.borderWidth - props.marginHorizontal * 2
              : inputWidth + props.borderWidth
          }
          style={{
            marginHorizontal: props.marginHorizontal,
            marginLeft: props.marginLeft,
            marginRight: props.marginRight,
          }}
        >
          <AnimatedLineTopFocus
            x1='0%'
            y1='0%'
            x2={topBorder}
            y2='0%'
            stroke={props.placeHolderColor || '#7dd3fc'}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineRightFocus
            x1='100%'
            y1='0%'
            x2='100%'
            y2={rightBorder}
            stroke={props.placeHolderColor || '#7dd3fc'}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineBottomFocus
            x1='100%'
            y1='100%'
            x2={bottomBorder}
            y2='100%'
            stroke={props.placeHolderColor || '#7dd3fc'}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineLeftFocus
            x1='0%'
            y1='100%'
            x2='0%'
            y2={leftBorder}
            stroke={props.placeHolderColor || '#7dd3fc'}
            strokeWidth={props.borderWidth * 4}
          />
        </Svg>
      </Animated.View>
      {props.isSelectable ? (
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View pointerEvents='box-only'>
            <TextInput
              caretHidden={props.isSelectable && true}
              placeholder={null}
              name={props.name}
              id={props.id}
              value={props.value}
              autoCorrect={props.autoCorrect}
              onChangeText={props.onChangeText}
              secureTextEntry={props.secureTextEntry}
              keyboardType={props.keyboardType}
              selectionColor={props.placeHolderColor || '#7dd3fc'}
              onEndEditing={props.onEndEditing}
              style={{
                color: props.textInputColor || props.placeHolderColor,
                paddingHorizontal: props.fontSize / 2,
                fontSize: props.fontSize || 16,
                marginVertical: height / 2 || 20,
                borderWidth: props.borderWidth || 2,
                borderColor: props.borderColor || '#0369a1',
                height: height * 1.3 || 40,
                width: props.marginLeft
                  ? inputWidth - props.marginLeft
                  : props.marginRight
                  ? inputWidth - props.marginRight
                  : props.marginHorizontal
                  ? inputWidth - props.marginHorizontal * 2
                  : inputWidth,
                marginHorizontal: props.marginHorizontal,
                marginLeft: props.marginLeft,
                marginRight: props.marginRight,
                ...props.style,
              }}
              onFocus={() => {
                movePlaceHolder()
                props.onFocus && props.onFocus()
              }}
              onBlur={() => {
                setValue(props.value)
                if (props.onBlur) props.onBlur()
                movePlaceHolderBack()
              }}
              onPressIn={props.onPressIn}
            />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TextInput
          caretHidden={props.isSelectable && true}
          placeholder={null}
          name={props.name}
          id={props.id}
          value={props.value}
          autoCorrect={props.autoCorrect}
          onChangeText={props.onChangeText}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
          selectionColor={props.placeHolderColor || '#7dd3fc'}
          onEndEditing={props.onEndEditing}
          style={{
            color: props.textInputColor || props.placeHolderColor,
            paddingHorizontal: props.fontSize / 2,
            fontSize: props.fontSize || 16,
            marginVertical: height / 2 || 20,
            borderWidth: props.borderWidth || 2,
            borderColor: props.borderColor || '#0369a1',
            height: height * 1.3 || 40,
            width: props.marginLeft
              ? inputWidth - props.marginLeft
              : props.marginRight
              ? inputWidth - props.marginRight
              : props.marginHorizontal
              ? inputWidth - props.marginHorizontal * 2
              : inputWidth,
            marginHorizontal: props.marginHorizontal,
            marginLeft: props.marginLeft,
            marginRight: props.marginRight,
            ...props.style,
          }}
          onFocus={() => {
            movePlaceHolder()
            props.onFocus && props.onFocus()
          }}
          onBlur={() => {
            setValue(props.value)
            if (props.onBlur) props.onBlur()
            movePlaceHolderBack()
          }}
          onPressIn={props.onPressIn}
        />
      )}
      <Animated.View
        pointerEvents='none'
        style={{
          zIndex: 3,
          height: height * 1.3 - props.borderWidth * 2,
          position: 'absolute',
          marginLeft: props.fontSize,
          marginVertical: height / 2 + props.borderWidth || 20,
          backgroundColor: 'rgba(0,0,0,0)',

          justifyContent: 'center',
          transform: [
            { translateY: translationPlaceHolder },
            { scale: translationPlaceHolderSize },
            { translateX: translationPlaceHolderMargin },
          ],
        }}
      >
        <Animated.Text
          style={{
            paddingHorizontal: props.fontSize / 4,
            textAlign: 'center',
            backgroundColor: props.backgroundColor || '#f1eff1',
            // backgroundColor: 'green',
            fontSize: props.fontSize || 16,
            color: color,
          }}
        >
          {props.placeHolder}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  text: {},
})

AnimatedInput.propTypes = {
  fontSize: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginHorizontal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeHolder: PropTypes.string,
  placeHolderColor: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  textInputColor: PropTypes.string,
  isSelectable: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoCorrect: PropTypes.bool,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  onEndEditing: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
}

export default AnimatedInput
