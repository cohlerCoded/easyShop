import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import AnimatedInput from '../../../Components/AnimatedInput'
import countries from 'world_countries_lists/data/countries/en/countries.json'
import flags from 'world_countries_lists/data/flags/24x24/flags-24x24.json'

const { width } = Dimensions.get('window')

const Confirm = () => {
  const [country, setCountry] = useState('')
  const [flagImg, setFlagImg] = useState('')
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
