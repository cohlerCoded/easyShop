import { ScrollView, Dimensions, StyleSheet, Text } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

const FormContainer = (props) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps='handled'
    >
      <Text style={styles.title}>{props.title}</Text>
      {props.children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
})

export default FormContainer
