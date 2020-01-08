import React from 'react';
import Navigation from './navigation/Navigation'
import Title from './components/Title'
import { StyleSheet, View } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={styles.main_container}>
          <Title/>
          <Navigation/>
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create ({
  main_container: {
    flex: 1,
    marginTop: 40
  }
})
