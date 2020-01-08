import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import { BarChart } from 'react-native-chart-kit'

const barData = { 
  labels: ['1', '2', '3', '4', '5'],
  datasets: [{ data: [300, 250, 200, 150, 100]}]
}


class Statistiques extends React.Component {
    render() {
        return (
            <React.Fragment>
              <View style={styles.main_container}>
                  <View>
                    <Text style={styles.title}>Bilan Statistique</Text>
                    <Text style={styles.subtitle}>Moyenne : [...] liens par subreddit</Text>
                    <Text style={styles.subtitle}>Quantiles :</Text>
                    <Text style={styles.chart}>[...graphe...]</Text>
                    <Text style={styles.subtitle}>Max : [...] liens par subreddit</Text>
                    <Text style={styles.subtitle}>Min : [...] liens par subreddit</Text>
                  </View>
                  <View>
                    <Text style={styles.title}>Les plus ou les moins liés</Text>
                    <Text style={styles.subtitle}>Subreddits les plus liés</Text>
                    
                    <Text style={styles.subtitle}>Subreddits les moins liés</Text>
                    <Text style={styles.chart}>[...graphe...]</Text>
                  </View>
                  <View>
                    <Text style={styles.title}>Le nombre de liens</Text>
                    <Text style={styles.subtitle}>Subreddits avec le plus de liens entrant</Text>
                    <Text style={styles.chart}>[...graphe...]</Text>
                    <Text style={styles.subtitle}>Subreddits avec le plus de liens sortant</Text>
                    <Text style={styles.chart}>[...graphe...]</Text>
                  </View>
              </View>
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        flex: 1,
        marginTop: 20
      },

    title: {
      fontSize: 25,
      marginLeft: 15,
      fontWeight: 'bold'
    },

    subtitle: {
        fontSize: 20,
        marginLeft: 15,
        flexDirection: 'column',
        //padding: 10
    },

    chart: {
        backgroundColor: '#ff4500',
        marginLeft: 15,
        marginRight: 15
    }
})

export default Statistiques