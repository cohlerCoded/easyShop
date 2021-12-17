import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Header from './Components/Header'
import ProductContainer from './Screens/Products/ProductContainer'

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header />
        <ProductContainer />
      </View>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
})
