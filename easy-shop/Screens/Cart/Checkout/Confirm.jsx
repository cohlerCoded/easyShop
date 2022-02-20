import React, { useEffect, useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from 'react-native'
import AnimatedInput from '../../../Components/AnimatedInput'
import countries from 'world_countries_lists/data/countries/en/countries.json'
import flags from 'world_countries_lists/data/flags/24x24/flags-24x24.json'

const { width } = Dimensions.get('window')

const Confirm = () => {
  const [modalVisible, setModalVisible] = useState(false)
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
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setCountry(country)
          setModalVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ width: '100%' }}
              keyExtractor={(item) => item.alpha3}
              data={countries}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => {
                    setModalVisible(false)
                    setCountry(item.alpha3.toUpperCase())
                    setFlagImg(item.alpha2)
                  }}
                >
                  <Image
                    source={{ uri: flags[item.alpha2] }}
                    style={{ width: 24, height: 24 }}
                  />
                  <Text
                    style={{ fontSize: 16, marginVertical: 5, marginLeft: 5 }}
                  >{`${item.alpha3.toUpperCase()} - ${item.name}`}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.centeredView}>
        <Button title='test' onPress={() => setModalVisible(true)} />

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
            isSelectable={true}
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default Confirm
