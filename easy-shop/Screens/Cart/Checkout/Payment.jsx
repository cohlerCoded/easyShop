import { Container, VStack, Heading, Radio, HStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const methods = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 },
]

const Payment = (props) => {
  const order = props.route.params
  const [value, setValue] = useState()
  const [card, setCard] = useState()
  return (
    <View>
      <Text
        style={{
          marginTop: 30,
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        &#x1F4B8; Payment &#x1F4B8;
      </Text>

      <VStack
        style={{
          marginTop: 20,
          marginLeft: 15,
          textAlign: 'center',
        }}
      >
        <Radio.Group
          name='myRadioGroup'
          accessibilityLabel='favorite number'
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue)
          }}
        >
          <Radio value={1}>Bank Transfer</Radio>
          <Radio value={2}>Credit Card</Radio>
          <Radio value={3}>PayPal</Radio>
          <Radio value={4}>Crypto</Radio>
        </Radio.Group>
      </VStack>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({})
