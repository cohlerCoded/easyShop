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
  const [zip, setZip] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [flagImg, setFlagImg] = useState('')
  useEffect(() => {
    setCountry(country)
  }, [country])

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
              minLength={4}
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
