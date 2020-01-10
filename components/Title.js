import React from 'react'
import { StyleSheet, Text } from 'react-native'

// Titre principal "Projet Tutoré" et sous-titre avec les noms des personnes
// du groupe. Présent sur toutes les pages
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
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center'
    },

    subtitleText: {
      fontSize: 15,
      textAlign: 'center'
    }
  })

export default Title