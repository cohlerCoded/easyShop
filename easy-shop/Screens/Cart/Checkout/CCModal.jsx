import { VStack, HStack } from 'native-base'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CardView } from 'react-native-credit-card-input'
import AnimatedInput from '../../../Components/AnimatedInput'
import { AntDesign } from '@expo/vector-icons'
import EasyButton from '../../../Components/EasyButton'
import FormContainer from '../../../Components/FormContainer'
import { set } from 'react-native-reanimated'

const CCModal = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [brand, setBrand] = useState('')
  const [expiration, setExpiration] = useState('')
  const [cvc, setCVC] = useState('')
  const [zip, setZip] = useState('')
  const [focused, setFocused] = useState(false)
  const [extraHeight, setExtraHeight] = useState(false)

  const ccBrand = (num) => {
    if (num) {
      return parseInt(num.slice(0, 4)) > 3527 &&
        parseInt(num.slice(0, 4)) < 3590
        ? 'jcb'
        : num.slice(0, 2) === '36' || num.slice(0, 2) === '54'
        ? 'diners-club'
        : num[0] === '3'
        ? 'american-express'
        : num[0] === '4'
        ? 'visa'
        : num[0] === '5'
        ? 'master-card'
        : num[0] === '6'
        ? 'discover'
        : 'placeholder'
    }
  }

  const ccMaxLength = (brand) => {
    if (brand) {
      return brand === 'american-express' ? 17 : 19
    }
  }
  const ccNumberFormatter = (brand, number) => {
    let newNum = ''
    if (brand === 'american-express') {
      for (let i = 0; i < number.length; i++) {
        if (i === 4 && number[i] !== ' ') newNum += ' ' + number[i]
        else if (i === 11 && number[i] !== ' ') newNum += ' ' + number[i]
        else newNum += number[i]
      }
    } else {
      for (let i = 0; i < number.length; i++) {
        if (i === 4 && number[i] !== ' ') newNum += ' ' + number[i]
        else if (i === 9 && number[i] !== ' ') newNum += ' ' + number[i]
        else if (i === 14 && number[i] !== ' ') newNum += ' ' + number[i]
        else newNum += number[i]
      }
    }
    return newNum
  }

  useEffect(() => {
    setBrand(ccBrand(cardNumber))

    console.log(brand)
  }, [cardNumber, ccBrand, setBrand])

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      nestedScrollEnabled={true}
      enableOnAndroid={true}
      extraHeight={60}
    >
      <AntDesign
        name='closecircleo'
        size={30}
        color='black'
        style={{
          position: 'absolute',
          top: extraHeight === true ? 100 : 20,
          right: 20,
        }}
        onPress={() => props.setModalVisible(false)}
      />
      <VStack
        alignItems='center'
        marginTop={20}
        style={{ transform: [{ scale: 0.75 }] }}
      >
        <CardView
          name={`${firstName || 'Your'} ${lastName || 'Name'}`}
          number={cardNumber}
          expiry={expiration}
          cvc={cvc}
          brand={brand}
          focused={focused === false ? 'notCVC' : 'cvc'}
        />
      </VStack>
      <VStack>
        <AnimatedInput
          required
          backgroundColor={'#fff'}
          textInputColor={'#000'}
          width={'99%'}
          marginHorizontal={5}
          fontSize={16}
          borderWidth={2}
          placeHolder={'Card Number'}
          value={cardNumber}
          onChangeText={(number) =>
            setCardNumber(ccNumberFormatter(brand, number))
          }
          maxLength={ccMaxLength(brand)}
          keyboardType='numeric'
        />
      </VStack>
      <VStack
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginHorizontal: 5,
          width: '100%',
        }}
      >
        <HStack width='50%'>
          <AnimatedInput
            required
            backgroundColor={'#fff'}
            textInputColor={'#000'}
            width='46%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'First Name'}
            value={firstName}
            onChangeText={setFirstName}
          />
        </HStack>
        <HStack width='50%'>
          <AnimatedInput
            required
            backgroundColor={'#fff'}
            textInputColor={'#000'}
            width='46%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'Last Name'}
            minLength={4}
            value={lastName}
            onChangeText={setLastName}
          />
        </HStack>
      </VStack>
      <VStack
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginHorizontal: 5,
          width: '100%',
        }}
      >
        <HStack width='33.33%'>
          <AnimatedInput
            backgroundColor={'#fff'}
            textInputColor={'#000'}
            width='32%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'Zip Code'}
            value={zip}
            onChangeText={setZip}
            maxLength={5}
            keyboardType='numeric'
            required
          />
        </HStack>
        <HStack width='33.33%'>
          <AnimatedInput
            backgroundColor={'#fff'}
            textInputColor={'#000'}
            width='32%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'Expiration'}
            value={expiration}
            maxLength={5}
            onChangeText={setExpiration}
            isCCDate
            keyboardType='numeric'
            required
          />
        </HStack>
        <HStack width='33.33%'>
          <AnimatedInput
            required
            backgroundColor={'#fff'}
            textInputColor={'#000'}
            width='30%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'CVC'}
            value={cvc}
            maxLength={brand === 'american-express' ? 4 : 3}
            onChangeText={setCVC}
            keyboardType='numeric'
            onFocus={() => {
              setFocused(true)
              setExtraHeight(true)
            }}
            onBlur={() => {
              setFocused(false)
              setExtraHeight(false)
            }}
          />
        </HStack>
      </VStack>
      <VStack alignItems='center' marginTop={20}>
        <EasyButton primary large onPress={() => console.log('confirm')}>
          <Text style={{ color: 'white' }}>Confirm</Text>
        </EasyButton>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default CCModal

const styles = StyleSheet.create({})
