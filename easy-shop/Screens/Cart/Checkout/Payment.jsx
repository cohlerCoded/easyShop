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
import { AntDesign } from '@expo/vector-icons'

const methods = [
  { name: 'Bank Transfer', value: 1 },
  { name: 'Card Payment', value: 2 },
  { name: 'PayPal', value: 3 },
  { name: 'Crypto', value: 4 },
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
          <Radio
            value={1}
            icon={
              <Icon as={<AntDesign name='check' size={24} color='black' />} />
            }
          >
            Bank Transfer
          </Radio>
          <Radio value={2}>Card Payment</Radio>
          <Radio value={3}>PayPal</Radio>
          <Radio value={4}>Crypto</Radio>
        </Radio.Group>
        {methods.map((method) => (
          <VStack>
            <TouchableOpacity
              onPress={() => setValue(method.value)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 30,
                marginVertical: 5,
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
      </VStack>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({})
