import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, ScrollView, Image } from 'react-native'
import Swiper from 'react-native-swiper'

const { width } = Dimensions.get('window')

const Banner = () => {
  const [bannerData, setBannerData] = useState([])

  useEffect(() => {
    setBannerData([
      'https://images.vexels.com/media/users/3/126443/preview2/ff9af1e1edfa2c4a46c43b0c2040ce52-macbook-pro-touch-bar-banner.jpg',
      'https://pbs.twimg.com/media/D7P_yLdX4AAvJWO.jpg',
      'https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg',
    ])
    return () => {
      setBannerData([])
    }
  }, [])
  return (
    <ScrollView scrollEnabled={false}>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            showsButtons={false}
            autoplay
            autoplayTimeout={2}
            showsPagination={false}
          >
            {bannerData.map((url) => (
              <Image
                key={url}
                style={styles.image}
                resizeMode='contain'
                source={{ uri: url }}
              />
            ))}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Banner

const styles = StyleSheet.create({
  container: {
    height: width * 0.5,
    flex: 1,
    backgroundColor: 'gainsboro',
  },
  swiper: {
    height: width * 0.5,
    width: width,
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    height: width / 2.25,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
})
