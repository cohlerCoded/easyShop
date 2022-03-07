import { HStack, VStack, Select, CheckIcon } from 'native-base'
import React, { useState, useEffect, useMemo } from 'react'
import { FlatList, StyleSheet, Text, Dimensions, Image } from 'react-native'
import { useSelector } from 'react-redux'
import AnimatedInput from '../../../Components/AnimatedInput'
import FormContainer from '../../../Components/FormContainer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import countries from 'world_countries_lists/data/countries/en/countries.json'
import flags from 'world_countries_lists/data/flags/24x24/flags-24x24.json'
import { states } from '../../../assets/states'

const Checkout = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cartItems)

  const [orderItems, setOrderItems] = useState()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [flagImg, setFlagImg] = useState('')
  useEffect(() => {
    setCountry(country)
  }, [country])

  useEffect(() => {
    setOrderItems(cartItems)
    setState('')
    setFirstName('')
    return () => {
      setOrderItems()
      setState('')
      setFirstName('')
    }
  }, [])
  console.log(orderItems)

  return (
    <FormContainer title='&#x1F4E6; Checkout &#x1F4E6;'>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='handled'
        nestedScrollEnabled={true}
        enableOnAndroid={true}
        viewIsInsideTabBar={true}
        extraHeight={200}
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

        <AnimatedInput
          textInputColor={'#000'}
          fontSize={16}
          borderWidth={2}
          placeHolder={'Address 1'}
          marginHorizontal={5}
          value={address1}
          onChangeText={setAddress1}
        />

        <AnimatedInput
          textInputColor={'#000'}
          marginHorizontal={5}
          fontSize={16}
          borderWidth={2}
          placeHolder={'Address 2'}
          value={address2}
          onChangeText={setAddress2}
        />
        <VStack
          alignItems='center'
          style={{
            flexDirection: 'row',
            width: '100%',
            marginHorizontal: 5,
          }}
        >
          <HStack width='46%'>
            <AnimatedInput
              textInputColor={'#000'}
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'City'}
              value={city}
              onChangeText={setCity}
            />
          </HStack>
          <HStack width='25%' marginHorizontal={7.5}>
            <AnimatedInput
              textInputColor={'#000'}
              style={{ paddingLeft: 35 }}
              onPress={() => setModalVisible(true)}
              width='25%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'State'}
              value={state}
              selectedValue={({ item }) => item.slice(0, 2)}
              onChangeText={setState}
              onBlur={setState}
              isSelectable={true}
              selectColor='rgba(125, 211, 252, 0.3)'
              onCloseSelect={({ item }) => {
                setState(item.slice(0, 2))
              }}
              data={states}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      marginVertical: 5,
                      marginLeft: 5,
                      width: '80%',
                    }}
                  >
                    {item}
                  </Text>
                </>
              )}
            />
          </HStack>
          <HStack width='25%'>
            <AnimatedInput
              textInputColor={'#000'}
              width='20%'
              fontSize={16}
              borderWidth={2}
              maxLength={5}
              keyboardType='numeric'
              placeHolder={'Zip'}
              value={zip}
              onChangeText={setZip}
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
          <HStack width='50%' alignItems='center'>
            <Image
              source={{ uri: flags[flagImg] || null }}
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                zIndex: 100,
                marginLeft: 5,
              }}
            />
            <AnimatedInput
              textInputColor={'#000'}
              style={{ paddingLeft: 35 }}
              onPress={() => setModalVisible(true)}
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Country'}
              value={country}
              onChangeText={(text) => setCountry(text)}
              onBlur={() => {
                setCountry(country)
              }}
              isSelectable={true}
              selectedValue={({ item }) => item.alpha3.toUpperCase()}
              selectColor='rgba(125, 211, 252, 0.3)'
              onCloseSelect={({ item }) => {
                setCountry(item.alpha3.toUpperCase())
                setFlagImg(item.alpha2)
              }}
              searchBar
              selectSearchFilterFunction={(term) =>
                countries.filter(
                  (country) =>
                    country.name.toLowerCase().includes(term.toLowerCase()) ||
                    country.alpha3.includes(term.toLowerCase())
                )
              }
              data={countries}
              keyExtractor={(item) => item.alpha3}
              renderItem={({ item }) => (
                <>
                  <Image
                    source={{ uri: flags[item.alpha2] }}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginVertical: 5,
                      marginLeft: 5,
                      width: '80%',
                    }}
                  >{`${item.alpha3.toUpperCase()} - ${item.name}`}</Text>
                </>
              )}
            />
          </HStack>
          <HStack width='50%'>
            <AnimatedInput
              isPhone={true}
              textInputColor={'#000'}
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Phone'}
              value={phone}
              keyboardType='numeric'
              onChangeText={setPhone}
            />
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </FormContainer>
  )
}

export default Checkout

const styles = StyleSheet.create({})
