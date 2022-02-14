import { HStack, VStack, Select, CheckIcon } from 'native-base'
import React, { useState, useRef } from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'
import { useSelector } from 'react-redux'
import AnimatedInput from '../../../Components/AnimatedInput'
import FormContainer from '../../../Components/FormContainer'
import { Picker } from '@react-native-picker/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const width = Dimensions.get('window')

const state = [
  'AK - Alaska',
  'AL - Alabama',
  'AR - Arkansas',
  'AS - American Samoa',
  'AZ - Arizona',
  'CA - California',
  'CO - Colorado',
  'CT - Connecticut',
  'DC - District of Columbia',
  'DE - Delaware',
  'FL - Florida',
  'GA - Georgia',
  'GU - Guam',
  'HI - Hawaii',
  'IA - Iowa',
  'ID - Idaho',
  'IL - Illinois',
  'IN - Indiana',
  'KS - Kansas',
  'KY - Kentucky',
  'LA - Louisiana',
  'MA - Massachusetts',
  'MD - Maryland',
  'ME - Maine',
  'MI - Michigan',
  'MN - Minnesota',
  'MO - Missouri',
  'MS - Mississippi',
  'MT - Montana',
  'NC - North Carolina',
  'ND - North Dakota',
  'NE - Nebraska',
  'NH - New Hampshire',
  'NJ - New Jersey',
  'NM - New Mexico',
  'NV - Nevada',
  'NY - New York',
  'OH - Ohio',
  'OK - Oklahoma',
  'OR - Oregon',
  'PA - Pennsylvania',
  'PR - Puerto Rico',
  'RI - Rhode Island',
  'SC - South Carolina',
  'SD - South Dakota',
  'TN - Tennessee',
  'TX - Texas',
  'UT - Utah',
  'VA - Virginia',
  'VI - Virgin Islands',
  'VT - Vermont',
  'WA - Washington',
  'WI - Wisconsin',
  'WV - West Virginia',
  'WY - Wyoming',
]

const Checkout = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cartItems)
  const [service, setService] = useState('')

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
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        viewIsInsideTabBar={true}
        extraHeight
      >
        <VStack
          alignItems='center'
          marginHorizontal={5}
          style={{
            flexDirection: 'row',
            backgroundColor: 'green',
            width: '100%',
          }}
        >
          <HStack width='50%' alignItems='center'>
            <AnimatedInput
              width='90%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'First Name'}
            />
          </HStack>
          <HStack width='50%' alignItems='center'>
            <AnimatedInput
              width='90%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'Last Name'}
            />
          </HStack>
        </VStack>

        <AnimatedInput
          fontSize={16}
          borderWidth={2}
          placeHolder={'Address 1'}
          marginHorizontal={5}
        />

        <VStack width='100%'>
          <AnimatedInput
            fontSize={16}
            borderWidth={2}
            placeHolder={'Address 2'}
            marginHorizontal={5}
          />
        </VStack>
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
              width='90%'
              fontSize={16}
              borderWidth={2}
              placeHolder={'City'}
            />
          </HStack>
          <HStack width='50%'>
            <Select
              width='90%'
              borderColor='#0369a1'
              borderRadius={0}
              borderWidth={2}
              height={10}
              selectedValue={service}
              minWidth='150'
              accessibilityLabel='State'
              placeholder='Choose State'
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size='5' />,
              }}
              mt={-0.5}
              onValueChange={(itemValue) => setService(itemValue)}
            >
              {state.map((state) => (
                <Select.Item label={state} value={state} />
              ))}
            </Select>
          </HStack>
        </VStack>
      </KeyboardAwareScrollView>
    </FormContainer>
  )
}

export default Checkout

const styles = StyleSheet.create({})
