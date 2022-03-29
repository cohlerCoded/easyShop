import {
  Container,
  VStack,
  Heading,
  Radio,
  HStack,
  Icon,
  Divider,
} from 'native-base'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CardView, CreditCardInput } from 'react-native-credit-card-input'
import { AntDesign } from '@expo/vector-icons'
import AnimatedInput from '../../../Components/AnimatedInput'

const methods = [
  { name: 'Bank Transfer', value: 1 },
  { name: 'Card Payment', value: 2 },
  { name: 'PayPal', value: 3 },
  { name: 'Crypto', value: 4 },
]

const Payment = (props) => {
  const order = props.route.params
  const [value, setValue] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiration, setExpiration] = useState('')
  const [cvc, setCVC] = useState('')
  const [zip, setZip] = useState('')
  const [focused, setFocused] = useState(false)
  useEffect(() => {
    console.log(cardNumber.slice(0, 2))
  }, [cardNumber])

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      nestedScrollEnabled={true}
      enableOnAndroid={true}
      viewIsInsideTabBar={true}
      extraHeight={200}
      removeClippedSubviews={false}
    >
      <Text
        style={{
          marginTop: 15,
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        &#x1F4B8; Select Payment Method &#x1F4B8;
      </Text>

      {/* <VStack
        style={{
          marginTop: 15,
          marginHorizontal: 10,
          textAlign: 'center',
        }}
      >
        {methods.map((method) => (
          <VStack>
            <TouchableOpacity
              onPress={() => setValue(method.value)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                // marginVertical: 5,
              }}
            >
              <HStack>
                <Text style={{ fontSize: 16 }}>{method.name}</Text>
              </HStack>
              <HStack>
                {method.value === value && (
                  <AntDesign name='check' size={20} color='green' />
                )}
              </HStack>
            </TouchableOpacity>
            <Divider my='2' />
          </VStack>
        ))}
      </VStack> */}
      <VStack alignItems='center'>
        <CardView
          name={`${firstName || 'Your'} ${lastName || 'Name'}`}
          number={cardNumber}
          expiry={expiration}
          cvc={cvc}
          brand={
            parseInt(cardNumber.slice(0, 4)) > 3527 &&
            parseInt(cardNumber.slice(0, 4)) < 3590
              ? 'jcb'
              : cardNumber.slice(0, 2) === '36' ||
                cardNumber.slice(0, 2) === '54'
              ? 'diners-club'
              : cardNumber[0] === '3'
              ? 'american-express'
              : cardNumber[0] === '4'
              ? 'visa'
              : cardNumber[0] === '5'
              ? 'master-card'
              : cardNumber[0] === '6'
              ? 'discover'
              : 'placeholder'
          }
          focused={focused === false ? 'notCVC' : 'cvc'}
        />
      </VStack>
      <VStack>
        <AnimatedInput
          required
          textInputColor={'#000'}
          width={'99%'}
          marginHorizontal={5}
          fontSize={16}
          borderWidth={2}
          placeHolder={'Card Number'}
          value={cardNumber}
          onChangeText={setCardNumber}
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
            textInputColor={'#000'}
            width='30%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'CVC'}
            value={cvc}
            maxLength={4}
            onChangeText={setCVC}
            keyboardType='numeric'
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default Payment

const styles = StyleSheet.create({})
