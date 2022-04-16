import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import AnimatedInput from '../../../Components/AnimatedInput'
import countries from 'world_countries_lists/data/countries/en/countries.json'
import flags from 'world_countries_lists/data/flags/24x24/flags-24x24.json'
import { HStack, VStack } from 'native-base'

const { width } = Dimensions.get('window')

const Confirm = () => {
  const [country, setCountry] = useState('')
  const [flagImg, setFlagImg] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  useEffect(() => {
    setCountry(country)
  }, [country])
  console.log(country)
  return (
    <View style={styles.centeredView}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        &#x1F4AF; Confirm &#x1F4AF;
      </Text>
      <View style={styles.centeredView}>
        <View
          style={{
            width: width,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: 'green',
            marginLeft: '50%',
          }}
        >
          <VStack
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 5,
              backgroundColor: 'green',
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
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'blue',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '90%',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    padding: 35,
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
})

export default Confirm
