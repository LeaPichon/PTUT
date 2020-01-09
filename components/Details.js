import React from 'react'
import { StyleSheet, Image, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import subreddits from '../data/subreddits'

class Details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.title_container}>
          <Image style={styles.imageTop} source={require('../assets/reddit.png')}/>
          <Text style={styles.title}>{ this.props.navigation.getParam('subreddit')._fields.properties.name }</Text>
        </View>
        <View style={styles.content_container}>
          <Text style={styles.subtitle}>Nombre de liens entrant : [...]</Text>
          <Text style={styles.subtitle}>Nombre de liens sortant : [...]</Text>
          <Text style={styles.subtitle}>Nombre de liens total : [...]</Text>
        </View>
        <View style={styles.content_container}>
          <Text style={styles.subtitle}>Subreddits liés : </Text>
          <ScrollView>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { subreddit: subreddit })}>
              <View style={styles.subreddit_container}>
                  <Image style={styles.image} source={require('../assets/reddit.png')}/>
                  <View style={styles.name_container}>
                      <Text style={styles.name}>{this.props.navigation.getParam('subreddit')._fields.properties.name}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  title_container: {
    height: 45,
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row'
  },
  subreddit_container: {
    height: 45,
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 5
  },
  content_container: {
    marginTop: 10
  },
  imageTop: {
    width: 50,
    height: 50,
    margin: 5
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    flex: 2
  },
  subtitle: {
      fontSize: 20,
      marginLeft: 15,
      marginTop: 10,
      flexDirection: 'column',
      //padding: 10
  },
  name: {
      fontSize: 18,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
  }
})

export default Details