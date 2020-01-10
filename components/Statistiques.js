import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native'
import { BarChart } from 'react-native-chart-kit'

// Définition des données exemples des subreddits
const barData = [0, 10, 15, 17, 25, 100, 150, 200, 250, 300]

const barData1 = { 
  labels: ['SubR 1', 'SubR 2', 'SubR 3', 'SubR 4', 'SubR 5'],
  datasets: [{ data: [300, 250, 200, 150, 100]}]
}
const barData2 = { 
  labels: ['SubR 1', 'SubR 2', 'SubR 3', 'SubR 4', 'SubR 5'],
  datasets: [{ data: [0, 10, 15, 17, 25]}]
}
const barData3 = { 
  labels: ['SubR 1', 'SubR 2', 'SubR 3', 'SubR 4', 'SubR 5'],
  datasets: [{ data: [300, 250, 200, 150, 100]}]
}
const barData4 = { 
  labels: ['SubR 1', 'SubR 2', 'SubR 3', 'SubR 4', 'SubR 5'],
  datasets: [{ data: [0, 10, 15, 17, 25]}]
}

// Page des statistiques

class Statistiques extends React.Component {
    render() {
        return (
            <React.Fragment>
              <ScrollView style={styles.main_container}>
                <View>

                  {/* Partie du bilan statistique */}

                  <View style={styles.box}>
                    <Text style={styles.title}>Bilan Statistique</Text>
                    <Text style={styles.subtitle}>Moyenne : [...] liens par subreddit</Text>
                    <Text style={styles.subtitle}>Max : [...]</Text>
                    <Text style={styles.subtitle}>Q1 : 25% des subreddits ont moins de [...] liens </Text>
                    <Text style={styles.subtitle}>Médiane : 50% des subreddits ont moins de [...] liens </Text>
                    <Text style={styles.subtitle}>Q3 : 25% des subreddits ont plus de [...] liens </Text>
                    <Text style={styles.subtitle}>Min : [...]</Text>
                  </View>

                  {/* Partie avec les graphes */}

                  <View style={styles.box}>
                    <Text style={styles.title}>Les plus ou moins liés</Text>
                    <Text style={styles.subtitle}>Subreddits les plus liés</Text>

                    {/* Graphe pour montrer les subreddits les plus liés */}
                    <BarChart 
                      style={styles.chart}
                      data={barData1}
                      width={Dimensions.get('window').width-10}
                      height={220}
                      yAxisLabel={'Liens : '}
                      chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#336699',
                        backgroundGradientFromOpacity: 100,
                        fillShadowGradient: '#f0F0F0',
                        fillShadowGradientOpacity: 100,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 0,
                        }
                      }}
                    />
                    <Text style={styles.subtitle}>Subreddits les moins liés</Text>
                    
                    {/* Graphe pour montrer les subreddits les moins liés */}
                    <BarChart 
                      style={styles.chart}
                      data={barData2}
                      width={Dimensions.get('window').width-10}
                      height={220}
                      yAxisLabel={'Liens : '}
                      chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#336699',
                        backgroundGradientFromOpacity: 100,
                        fillShadowGradient: '#f0F0F0',
                        fillShadowGradientOpacity: 100,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        }
                      }}
                    />
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.title}>Le nombre de liens</Text>
                    <Text style={styles.subtitle}>Subreddits avec le plus de liens entrant</Text>
                    
                    {/* Graphe pour montrer les subreddits avec le plus de liens entrant */}
                    <BarChart 
                      style={styles.chart}
                      data={barData3}
                      width={Dimensions.get('window').width-10}
                      height={220}
                      yAxisLabel={'Liens : '}
                      chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#336699',
                        backgroundGradientFromOpacity: 100,
                        fillShadowGradient: '#f0F0F0',
                        fillShadowGradientOpacity: 100,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        }
                      }}
                    />
                    <Text style={styles.subtitle}>Subreddits avec le plus de liens sortant</Text>
                    
                    {/* Graphe pour montrer les subreddits avec le plus de liens sortant */}
                    <BarChart 
                      style={styles.chart}
                      data={barData4}
                      width={Dimensions.get('window').width-10}
                      height={220}
                      yAxisLabel={'Liens : '}
                      chartConfig={{
                        backgroundColor: '#000000',
                        backgroundGradientFrom: '#336699',
                        backgroundGradientFromOpacity: 100,
                        fillShadowGradient: '#f0F0F0',
                        fillShadowGradientOpacity: 100,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        }
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
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
        marginTop: 10,
        flexDirection: 'column'
    },
    
    info: {
      fontSize: 15,
      marginLeft: 15,
      flexDirection: 'column'
  },

    chart: {
        backgroundColor: '#336699',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 7
    },

    box: {
      marginTop: 10
    }
})

export default Statistiques