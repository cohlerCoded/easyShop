import React from 'react'
import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native'
import { Badge, Text } from 'native-base'
import categories from '../../assets/categories.json'

const CategoryFilter = () => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 0, padding: 0, borderRadius: 0 }}>
        <TouchableOpacity key={1}>
          <Badge style={[styles.center, { margin: 5 }]}>
            <Text>{item.name}</Text>
          </Badge>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView bounces style={{ backgroundColor: '#f2f2f2' }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.$oid}
      />
    </ScrollView>
  )
}

export default CategoryFilter

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
