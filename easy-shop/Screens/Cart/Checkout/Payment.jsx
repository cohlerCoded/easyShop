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
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CardView, CreditCardInput } from 'react-native-credit-card-input'
import { AntDesign } from '@expo/vector-icons'
import AnimatedInput from '../../../Components/AnimatedInput'
import CCModal from './CCModal'

const methods = [
  { name: 'Bank Transfer', value: 1 },
  { name: 'Card Payment', value: 2 },
  { name: 'PayPal', value: 3 },
  { name: 'Crypto', value: 4 },
]

const Payment = (props) => {
  const order = props.route.params
  const [modalVisible, setModalVisible] = useState(false)
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
    <View>
      <Text
        style={{
          marginTop: 15,
          fontSize: 20,
          textAlign: 'center',
        }}
      >
        &#x1F4B8; Select Payment Method &#x1F4B8;
      </Text>

      <VStack
        style={{
          marginTop: 15,
          marginHorizontal: 10,
          textAlign: 'center',
        }}
      >
        {methods.map((method) => (
          <VStack>
            <TouchableOpacity
              onPress={() => {
                setValue(method.value)
                setModalVisible(true)
              }}
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
      </VStack>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CCModal setModalVisible={setModalVisible} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Payment

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
    // marginTop: 20,
    // width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
