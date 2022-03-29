import {
  Container,
  VStack,
  Heading,
  Radio,
  HStack,
  Icon,
  Divider,
} from 'native-base'
import React, { useState } from 'react'
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
          brand='american-express'
          focused='cvc'
        />
      </VStack>
      <VStack>
        <AnimatedInput
          textInputColor={'#000'}
          width={'99%'}
          marginHorizontal={5}
          fontSize={16}
          borderWidth={2}
          placeHolder={'First Name'}
          value={firstName}
          onChangeText={setFirstName}
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
        <HStack width='50%'>
          <AnimatedInput
            textInputColor={'#000'}
            width='46%'
            fontSize={16}
            borderWidth={2}
            placeHolder={'Experiation'}
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
            placeHolder={'CVC'}
            minLength={4}
            value={lastName}
            onChangeText={setLastName}
          />
        </HStack>
      </VStack>
    </KeyboardAwareScrollView>
  )
}

export default Payment

const styles = StyleSheet.create({})
