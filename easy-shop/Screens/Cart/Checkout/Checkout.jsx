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
  const [selectFocus, setSelectFocus] = useState(false)
  const [state, setState] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')

  const countryList = ({ item }) => (
    <Select.Item
      leftIcon={
        <Image
          source={{ uri: flags[item.alpha2] }}
          style={{ width: 24, height: 24 }}
        />
      }
      label={
        selectFocus === true
          ? `${item.alpha2.toUpperCase()} - ${item.name}`
          : item.alpha2.toUpperCase()
      }
      value={item.alpha2.toUpperCase()}
    />
  )

  useEffect(() => {
    setState('')
    setFirstName('')
    return () => {
      setState('')
      setFirstName('')
    }
  }, [])

  console.log(firstName)

  return (
    <FormContainer title='&#x1F4E6; Checkout &#x1F4E6;'>
      <KeyboardAwareScrollView
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
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'First Name'}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </HStack>
          <HStack width='50%'>
            <AnimatedInput
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Last Name'}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </HStack>
        </VStack>

        <AnimatedInput
          fontSize={16}
          borderWidth={2}
          placeHolder={'Address 1'}
          marginHorizontal={5}
          value={address1}
          onChangeText={(text) => setAddress1(text)}
        />

        <AnimatedInput
          marginHorizontal={5}
          fontSize={16}
          borderWidth={2}
          placeHolder={'Address 2'}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <VStack
          alignItems='center'
          style={{
            flexDirection: 'row',
            width: '100%',
            marginHorizontal: 5,
          }}
        >
          <HStack width='50%'>
            <AnimatedInput
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'City'}
              value={city}
              onChangeText={(text) => setCity(text)}
            />
          </HStack>
          <HStack width='25%'>
            <Select
              onOpen={() => setTimeout(() => setSelectFocus(true), 180)}
              onClose={() => setSelectFocus(false)}
              marginLeft={-0.5}
              width='80%'
              borderColor='#0369a1'
              borderRadius={0}
              borderWidth={2}
              height={10}
              selectedValue={state}
              accessibilityLabel='State'
              placeholderTextColor='rgb(125, 211, 252)'
              fontSize='16'
              placeholder='State'
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size='5' />,
              }}
              onValueChange={(itemValue) => {
                setState(itemValue)
                setSelectFocus(false)
              }}
            >
              {states.map((state, i) => (
                <Select.Item
                  label={selectFocus === true ? state : state.slice(0, 2)}
                  value={state}
                  key={i}
                />
              ))}
            </Select>
          </HStack>
          <HStack width='25%'>
            <AnimatedInput
              width='20%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Zip'}
              value={zip}
              onChangeText={(text) => setZip(text)}
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
            <Select
              onOpen={() => setTimeout(() => setSelectFocus(true), 180)}
              onClose={() => setSelectFocus(false)}
              width='75%'
              borderColor='#0369a1'
              borderRadius={0}
              borderWidth={2}
              height={10}
              selectedValue={country}
              accessibilityLabel='Country'
              placeholderTextColor='rgb(125, 211, 252)'
              fontSize='16'
              placeholder='Country'
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size='5' />,
              }}
              onValueChange={(itemValue) => {
                setCountry(itemValue)
                setSelectFocus(false)
              }}
            >
              {countries.map((country, i) => (
                <Select.Item
                  key={i}
                  leftIcon={
                    <Image
                      source={{ uri: flags[country.alpha2] }}
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  label={
                    selectFocus === true
                      ? `${country.alpha2.toUpperCase()} - ${country.name}`
                      : country.alpha2.toUpperCase()
                  }
                  value={country.alpha2.toUpperCase()}
                />
              ))}
            </Select>
          </HStack>
          <HStack width='50%'>
            <AnimatedInput
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Phone'}
              value={phone}
              onChangeText={(text) => setPhone(text)}
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
            <Select
              onOpen={() => setTimeout(() => setSelectFocus(true), 180)}
              onClose={() => setSelectFocus(false)}
              width='75%'
              borderColor='#0369a1'
              borderRadius={0}
              borderWidth={2}
              height={10}
              selectedValue={country}
              accessibilityLabel='Country'
              placeholderTextColor='rgb(125, 211, 252)'
              fontSize='16'
              placeholder='Country'
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size='5' />,
              }}
              onValueChange={(itemValue) => {
                setCountry(itemValue)
                setSelectFocus(false)
              }}
            >
              {
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={countries}
                  renderItem={countryList}
                />
              }
              {/* {countries.map((country, i) => (
                <Select.Item
                  key={i}
                  leftIcon={
                    <Image
                      source={{ uri: flags[country.alpha2] }}
                      style={{ width: 24, height: 24 }}
                    />
                  }
                  label={
                    selectFocus === true
                      ? `${country.alpha2.toUpperCase()} - ${country.name}`
                      : country.alpha2.toUpperCase()
                  }
                  value={country.alpha2.toUpperCase()}
                />
              ))} */}
            </Select>
          </HStack>
          <HStack width='50%'>
            <AnimatedInput
              width='46%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Phone'}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </FormContainer>
  )
}

export default Checkout

const styles = StyleSheet.create({})
