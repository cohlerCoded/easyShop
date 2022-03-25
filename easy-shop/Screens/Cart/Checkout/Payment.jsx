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
  const [selected, setSelected] = useState()
  const [card, setCard] = useState()
  return (
    <Container>
      <Heading>
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
        </View>
      </Heading>

      <VStack>
        {methods.map((item, index) => {
          return (
            <Radio.Group
              key={item.name}
              onPress={() => setSelected(item.value)}
            >
              <HStack>
                <Text>{item.name}</Text>
              </HStack>
              <HStack>
                <Radio selected={selected == item.value} />
              </HStack>
            </Radio.Group>
          )
        })}
      </VStack>
    </Container>
  )
}

export default Payment

const styles = StyleSheet.create({})
