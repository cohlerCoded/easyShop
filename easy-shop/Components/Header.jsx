import React from 'react'
import { StyleSheet, Text, Image, SafeAreaView } from 'react-native'

const Header = () => {
  return (
    <SafeAreaView>
      <Image
        source={require('../assets/Logo.png')}
        resizeMode='contain'
        style={{ height: 70 }}
      />
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
