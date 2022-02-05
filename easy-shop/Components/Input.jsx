import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

const Input = (props) => {
  return (
    <>
      {props.label && <Text style={style.label}>{props.label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        value={props.value}
        autoCorrect={props.autoCorrect}
        onChangeText={props.onChangeText}
        onFocus={props.onFocus}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
      ></TextInput>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
  },
})

export default Input
