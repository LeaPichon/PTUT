import React from 'react'
import { StyleSheet, Text } from 'react-native'

class Title extends React.Component {
    render() {
        return (
        <React.Fragment>
            <Text style={styles.titleText}>Projet Tutoré</Text>
            <Text style={styles.subtitleText}>Medhi E, Medhi L, Samil K, Léa P</Text>
        </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
      //fontFamily: Verdana,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    },

    subtitleText: {
      //fontFamily: Verdana,
      fontSize: 15,
      textAlign: 'center'
    }
  })

export default Title