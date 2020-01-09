import React from 'react'
import { StyleSheet, Image, View, Text } from 'react-native'

class SubredditItem extends React.Component {
  render() {
    const subreddit = this.props.subreddit
    return (
      <View style={styles.main_container}>
        <Image style={styles.image} source={require('../assets/reddit.png')}/>
        <View style={styles.title_container}>
          <Text style={styles.title}>{subreddit._fields.properties.name}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  },
  title_container: {
    flex: 1,
    margin: 5
  },
  title: {
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  }
})

export default SubredditItem