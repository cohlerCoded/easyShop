import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { Feather, Entypo } from '@expo/vector-icons'

const SearchBar = ({ term, onTermChange, onTermSubmit, icon }) => {
  return (
    <View style={styles.backgroundStyle}>
      {icon === 'search' ? (
        <Feather name={icon} style={styles.searchIcon} />
      ) : (
        <Entypo name={icon} style={styles.searchIcon} />
      )}
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder={icon === 'search' ? 'Search' : 'Near'}
        style={styles.searchInput}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
        onBlur={onTermSubmit}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    height: 40,
    backgroundColor: '#e5e5e5',
    borderRadius: 5,
    marginVertical: 2,
    marginHorizontal: 15,
    marginVertical: 10,
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
  },
  searchIcon: {
    color: 'black',
    fontSize: 36,
    alignSelf: 'center',
    marginHorizontal: 5,
  },
})

export default SearchBar
