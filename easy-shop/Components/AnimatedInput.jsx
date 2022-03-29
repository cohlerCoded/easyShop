import {
  TextInput,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import Svg, { Line } from 'react-native-svg'
import PropTypes from 'prop-types'
import { CheckIcon } from 'native-base'
import SearchBar from './SearchBar'

const { width } = Dimensions.get('window')

//HELPER FUNCTIONS
const phoneNumberFormater = (number) => {
  return number.length <= 1 && number[0] === '('
    ? ''
    : number.length === 1
    ? '(' + number
    : number.length === 4
    ? number + ') '
    : number.length <= 5 && number[4] === ')'
    ? number.slice(0, 4)
    : number.length === 9
    ? number + ' - '
    : number.length <= 11 && number[10] === '-'
    ? number.slice(0, 9)
    : number
}
const ccDateFormater = (number) => {
  console.log(number.length)
  return number.length > 2 && number[2] !== '/'
    ? number.slice(0, 2) + '/' + number.slice(2)
    : number.length < 3
    ? number.slice(0, 2)
    : number
}

//COMPONENT
const AnimatedInput = (props) => {
  const inputWidth =
    props.width && typeof props.width === 'string'
      ? (width * parseInt(props.width)) / 100
      : props.width
      ? props.width
      : width
  const height = props.fontSize * 1.9

  const [modalVisible, setModalVisible] = useState(false)
  const [term, setTerm] = useState('')
  const [localValue, setLocalValue] = useState('')
  const [validation, setValidation] = useState(false)
  const [validationStore, setValidationStore] = useState(false)
  const [requiresValidation, setRequiresValidation] = useState(false)
  const [validationColor, setValidationColor] = useState()
  const [validationTrueColor, setValidationTrueColor] = useState(
    props.isValidColor || 'green'
  )
  const [validationFalseColor, setValidationFalseColor] = useState(
    props.isNotValidColor || 'red'
  )
  const [focusBorderColor, setFocusBorderColor] = useState(
    props.placeHolderColor || 'rgb(125, 211, 252)'
  )
  const [validationBorderColor, setValidationBorderColor] = useState()
  const [firstValidation, setFirstValidation] = useState(true)
  const [focusBorderValue, setFocusBorderValue] = useState(0)

  //TODO Focus color
  const AnimatedLineTopFocus = Animated.createAnimatedComponent(Line)
  const AnimatedLineRightFocus = Animated.createAnimatedComponent(Line)
  const AnimatedLineBottomFocus = Animated.createAnimatedComponent(Line)
  const AnimatedLineLeftFocus = Animated.createAnimatedComponent(Line)

  const AnimatedLineTopValidation = Animated.createAnimatedComponent(Line)
  const AnimatedLineRightValidation = Animated.createAnimatedComponent(Line)
  const AnimatedLineBottomValidation = Animated.createAnimatedComponent(Line)
  const AnimatedLineLeftValidation = Animated.createAnimatedComponent(Line)

  const translationPlaceHolder = useRef(new Animated.Value(0)).current
  const translationPlaceHolderSize = useRef(new Animated.Value(1)).current
  const translationPlaceHolderMargin = useRef(new Animated.Value(0)).current
  const translationPlaceHolderColor = useRef(new Animated.Value(0)).current

  const topBorderLine = useRef(new Animated.Value(0)).current
  const rightBorderLine = useRef(new Animated.Value(0)).current
  const bottomBorderLine = useRef(new Animated.Value(0)).current
  const leftBorderLine = useRef(new Animated.Value(0)).current

  const validationTopBorderLine = useRef(new Animated.Value(0)).current
  const validationRightBorderLine = useRef(new Animated.Value(0)).current
  const validationBottomBorderLine = useRef(new Animated.Value(0)).current
  const validationLeftBorderLine = useRef(new Animated.Value(0)).current

  const color =
    validationColor ||
    translationPlaceHolderColor.interpolate({
      inputRange: [0, 1],
      outputRange: [focusBorderColor, props.borderColor || 'rgb(3, 105, 161)'],
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

  const validationTopBorder = validationTopBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  })
  const validationRightBorder = validationRightBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '0%'],
  })
  const validationBottomBorder = validationBottomBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })
  const validationLeftBorder = validationLeftBorderLine.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  const moveFocusLineClocwise = () => {
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
    setFocusBorderValue(1)
  }
  const moveFocusLineCounterClockwise = () => {
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
    setFocusBorderValue(0)
  }
  const moveValidationLineCounterClocwise = () =>
    Animated.sequence([
      Animated.timing(validationLeftBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 25,
      }),
      Animated.timing(validationBottomBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 125,
      }),
      Animated.timing(validationRightBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 25,
      }),
      Animated.timing(validationTopBorderLine, {
        toValue: 1,
        useNativeDriver: true,
        duration: 125,
      }),
    ]).start()

  const moveValidationLineClocwise = () =>
    Animated.sequence([
      Animated.timing(validationTopBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 125,
      }),
      Animated.timing(validationRightBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 25,
      }),
      Animated.timing(validationBottomBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 125,
      }),
      Animated.timing(validationLeftBorderLine, {
        toValue: 0,
        useNativeDriver: true,
        duration: 25,
      }),
    ]).start()

  const validationSequence = () => {
    if (!props.isSelectable && requiresValidation) {
      if (validation === true) setValidationColor(validationTrueColor)
      if (validation === false) setValidationColor(validationFalseColor)
      setFirstValidation(false)
      changeValidationSequence()
    }
  }

  const changeValidationSequence = () => {
    if (focusBorderValue === 0) {
      setFocusBorderColor(
        validation ? validationTrueColor : validationFalseColor
      )
      moveValidationLineClocwise()
      moveFocusLineClocwise()
    } else {
      setValidationBorderColor(
        validation ? validationTrueColor : validationFalseColor
      )
      moveValidationLineCounterClocwise()
      moveFocusLineCounterClockwise()
    }
    setValidationColor(validation ? validationTrueColor : validationFalseColor)
    return setValidationStore(validation)
  }

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
    if (validation !== undefined && firstValidation === false) return
    firstValidation && moveFocusLineClocwise()
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
    if (!requiresValidation || firstValidation) {
      moveFocusLineCounterClockwise()
    }
    firstValidation && validationSequence()
  }
  useEffect(() => {
    setValidationFalseColor(props.isNotValidColor || 'red')
  }, [])

  useEffect(() => {
    if (props.isSelectable) {
      movePlaceHolderBack()
    }
  }, [props.value, movePlaceHolderBack])
  useEffect(() => {
    if (props.minLength) setRequiresValidation(true)
    if (props.minLength && !props.isSelectable && firstValidation) {
      if (props.value.length >= props.minLength) {
        setValidation(true)
        setValidationStore(true)
      } else {
        setValidation(false)
        setValidationStore(false)
      }
    } else if (props.minLength && !props.isSelectable) {
      if (props.value.length >= props.minLength) {
        setValidation(true)
      } else {
        setValidation(false)
      }
    }
    if (
      !firstValidation &&
      requiresValidation &&
      validation !== validationStore
    ) {
      changeValidationSequence()
    }
  }, [validation, setValidation, props.value])

  return (
    <Animated.View
      style={{
        backgroundColor: props.backgroundColor || '#f1eff1',
        width: '100%',
      }}
    >
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ height: '100%', width: '100%' }}
            >
              <View
                style={{
                  alignSelf: 'center',
                  height: 10,
                  width: 100,
                  backgroundColor: '#eee',
                  marginVertical: 15,
                  borderRadius: 50,
                }}
              />
              {props.searchBar && (
                <SearchBar
                  icon={'search'}
                  term={term}
                  onTermChange={(text) => setTerm(text)}
                  onTermSubmit={() => setTerm(term)}
                />
              )}
              <FlatList
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}
                keyExtractor={props.keyExtractor}
                data={
                  term.length && props.selectSearchFilterFunction
                    ? props.selectSearchFilterFunction(term)
                    : props.data
                }
                renderItem={(item) => (
                  <TouchableOpacity
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 5,
                      backgroundColor:
                        props.value === props.selectedValue(item)
                          ? props.selectColor || 'rgba(125, 211, 252, 0.3)'
                          : 'white',
                    }}
                    onPress={() => {
                      props.onCloseSelect(item)
                      setTimeout(() => setModalVisible(false), 500)
                    }}
                  >
                    {props.renderItem(item)}
                    {props.value === props.selectedValue(item) && (
                      <CheckIcon size='5' style={{ marginLeft: 10 }} />
                    )}
                  </TouchableOpacity>
                )}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FOCUS/UNFOCUS TRACE */}

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
            stroke={focusBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineRightFocus
            x1='100%'
            y1='0%'
            x2='100%'
            y2={rightBorder}
            stroke={focusBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineBottomFocus
            x1='100%'
            y1='100%'
            x2={bottomBorder}
            y2='100%'
            stroke={focusBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineLeftFocus
            x1='0%'
            y1='100%'
            x2='0%'
            y2={leftBorder}
            stroke={focusBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
        </Svg>
      </Animated.View>
      {/* VALID/INVALID TRACE */}

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
          <AnimatedLineTopValidation
            x1={validationTopBorder}
            y1='0%'
            x2='100%'
            y2='0%'
            stroke={validationBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineRightValidation
            x1='100%'
            y1='100%'
            x2='100%'
            y2={validationRightBorder}
            stroke={validationBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineBottomValidation
            x1='0%'
            y1='100%'
            x2={validationBottomBorder}
            y2='100%'
            stroke={validationBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
          <AnimatedLineLeftValidation
            x1='0%'
            y1='0%'
            x2='0%'
            y2={validationLeftBorder}
            stroke={validationBorderColor}
            strokeWidth={props.borderWidth * 4}
          />
        </Svg>
      </Animated.View>
      {props.isSelectable ? (
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
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
              selectionColor={props.placeHolderColor || 'rgb(125, 211, 252)'}
              // onEndEditing={props.onEndEditing}
              style={{
                color: props.textInputColor || focusBorderColor,
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
          onChangeText={
            props.isPhone
              ? (text) => props.onChangeText(phoneNumberFormater(text))
              : props.isCCDate
              ? (text) => props.onChangeText(ccDateFormater(text))
              : props.onChangeText
          }
          maxLength={props.isPhone ? 16 : props.maxLength}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
          selectionColor={props.placeHolderColor || 'rgb(125, 211, 252)'}
          onEndEditing={props.onEndEditing}
          style={{
            color: props.textInputColor || focusBorderColor,
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
            fontSize: props.fontSize || 16,
            color: color,
          }}
        >
          {props.placeHolder}
        </Animated.Text>
      </Animated.View>
      <Text style={styles.errorMessage}>
        {props.required &&
          !firstValidation &&
          props.value.length === 0 &&
          'Required Field'}
      </Text>
      <Text style={styles.errorMessage}>
        {props.minLength &&
          !firstValidation &&
          props.value.length !== 0 &&
          props.value.length < props.minLength &&
          `Must be at least ${props.minLength} characters.`}
      </Text>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '87%',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -2,
    left: 5,
    fontSize: 12,
    color: 'red',
  },
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
  selectColor: PropTypes.string,
  textInputColor: PropTypes.string,
  isSelectable: PropTypes.bool,
  searchBar: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedValue: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  autoCorrect: PropTypes.bool,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  onEndEditing: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onCloseSelect: PropTypes.func,
  selectSearchFilterFunction: PropTypes.func,
  //Validation
  //!!!TODO!!!//
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  hasUpperCase: PropTypes.bool,
  hasLowerCase: PropTypes.bool,
  hasNumber: PropTypes.bool,
  hasSpecialCharacter: PropTypes.bool,
  isEmail: PropTypes.bool,
  isPhone: PropTypes.bool,
  isDate: PropTypes.bool,
  isNumber: PropTypes.bool,
  isCCDate: PropTypes.bool,
}

export default AnimatedInput
