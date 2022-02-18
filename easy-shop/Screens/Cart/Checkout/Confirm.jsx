import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React, { useMemo } from 'react'
import countries from 'world_countries_lists/data/countries/en/countries.json'
import flags from 'world_countries_lists/data/flags/24x24/flags-24x24.json'
import { VStack } from 'native-base'

const countryList = ({ item }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={{ uri: flags[item.alpha2] }}
        style={{ width: 24, height: 24 }}
      />
      <Text>{`${item.alpha2.toUpperCase()} - ${item.name}`}</Text>
    </View>
  )
}

const Confirm = () => {
  return (
    <View style={{ marginBottom: 70 }}>
      <Text
        style={{
          marginTop: 30,
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        &#x1F4AF; Confirm &#x1F4AF;
      </Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={countries}
        renderItem={countryList}
      />
    </View>
  )
}

export default Confirm

const styles = StyleSheet.create({})
