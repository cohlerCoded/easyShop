import { HStack, VStack } from 'native-base'
import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import AnimatedInput from '../../../Components/AnimatedInput'
import FormContainer from '../../../Components/FormContainer'

const width = Dimensions.get('window')

const Checkout = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cartItems)
  console.log(cartItems)
  return (
    <FormContainer>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        &#x1F4E6; Checkout &#x1F4E6;
      </Text>
      <VStack
        alignItems='center'
        style={{
          flexDirection: 'row',
          backgroundColor: 'green',
          width: '100%',
        }}
      >
        <HStack width='50%'>
          <AnimatedInput
            fontSize={16}
            borderWidth={2}
            placeHolder={'First Name'}
          />
        </HStack>
        <HStack width='50%'>
          <AnimatedInput
            fontSize={16}
            borderWidth={2}
            placeHolder={'Last Name'}
          />
        </HStack>
      </VStack>
      <VStack width='100%' alignItems='center'>
        <HStack marginLeft={0}>
          <AnimatedInput
            fontSize={16}
            borderWidth={2}
            placeHolder={'Address 1'}
            width='90%'
          />
        </HStack>
      </VStack>
      <VStack width='100%'>
        <AnimatedInput
          fontSize={16}
          borderWidth={2}
          placeHolder={'Address 2'}
        />
      </VStack>
    </FormContainer>
  )
}

export default Checkout

const styles = StyleSheet.create({})
