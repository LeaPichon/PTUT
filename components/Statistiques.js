import React from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Button } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import top5ByTotalLinks from '../data/top5byTotalLinks'

// Définition des données des subreddits pour les graphes
var labelsTotal = []
var linksTotal = []
const barTotal = {}

// Page des statistiques

class Statistiques extends React.Component {
  constructor() {
    super();
    this.state = {
      moyenne: '',
      min: '',
      max: '',
      total: []
    }
  }

  // Fonction qui permet de récupérer les statistiques depuis l'API
  componentDidMount() {
    // Permet de récupérer la moyenne
    fetch('http://134.209.90.92:3200/subreddit/link/average/', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        moyenne: json.payload
      });
    })
    .catch(error => {
      console.error(error);
    });

    // Permet de récupérer le min
    fetch('http://134.209.90.92:3200/subreddit/link/min/', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        min: json.payload,
      });
    })
    .catch(error => {
      console.error(error);
    });

    // Permet de récupérer le max
    fetch('http://134.209.90.92:3200/subreddit/link/max/', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        max: json.payload
      });
    })
    .catch(error => {
      console.error(error);
    });

    // Permet de récupérer le max MARCHE PAS ? 
    fetch('http://134.209.90.92:3200/subreddit/top5byTotalLinks', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
      this.setState({
        total: json.payload
      });
    })
    .catch(error => {
      console.error(error);
    });
  }


    render() {
        return (
            <React.Fragment>
              <ScrollView style={styles.main_container}>
                <View>
                  {console.log("subR: " + this.state.total)}
                  {/* Partie du bilan statistique */}

                  <View style={styles.box}>
                    <Text style={styles.title}>Bilan Statistique</Text>
                    <Text style={styles.subtitle}>Moyenne : {this.state.moyenne} liens par subreddit</Text>
                    <Text style={styles.subtitle}>Max : {this.state.max} </Text>
                    <Text style={styles.subtitle}>Min : {this.state.min} </Text>
                  </View>
                  <View style={styles.box}>
                    <Button color='#ff4500' title='Enlever le subreddit le plus lié' onPress={() => {}}/>
                  </View>

                  {/* Partie avec les graphes */}

                  <View style={styles.box}>
                    <Text style={styles.title}>Subreddits les plus liés</Text>

                    {/* Graphe pour montrer les subreddits les plus liés */}
                    <BarChart 
                      style={styles.chart}
                      data={this.state.barTotal}
                      width={Dimensions.get('window').width-10}
                      height={300}
                      verticalLabelRotation={30}
                      chartConfig={{
                        backgroundColor: '#336699',
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
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.title}>Subreddits avec le plus de liens entrant</Text>
                    
                    {/* Graphe pour montrer les subreddits avec le plus de liens entrant */}
                    <BarChart 
                      style={styles.chart}
                      data={barTotal}
                      width={Dimensions.get('window').width-10}
                      height={300}
                      verticalLabelRotation={30}
                      chartConfig={{
                        backgroundColor: '#336699',
                        backgroundGradientFrom: '#336699',
                        backgroundGradientFromOpacity: 100,
                        fillShadowGradient: '#F0F0F0',
                        fillShadowGradientOpacity: 100,
                        decimalPlaces: 0,
                        padding: 10,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                          borderRadius: 16,
                        }
                      }}
                    />
                    <Text style={styles.title}>Subreddits avec le plus de liens sortant</Text>
                    
                    {/* Graphe pour montrer les subreddits avec le plus de liens sortant */}
                    <BarChart 
                      style={styles.chart}
                      data={barTotal}
                      width={Dimensions.get('window').width-10}
                      height={300}
                      verticalLabelRotation={30}
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
        marginRight: 15,
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