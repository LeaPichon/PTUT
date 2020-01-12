import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Button,
  ActivityIndicator
} from "react-native";
import { BarChart } from "react-native-chart-kit";

// Page des statistiques

class Statistiques extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  // Fonction qui permet de récupérer les statistiques depuis l'API
  componentDidMount() {
    // Permet de récupérer la moyenne
    fetch("http://134.209.90.92:3200/subreddit/link/average/", {
      method: "GET"
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
    fetch("http://134.209.90.92:3200/subreddit/link/min/", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          min: json.payload
        });
      })
      .catch(error => {
        console.error(error);
      });

    // Permet de récupérer le max
    fetch("http://134.209.90.92:3200/subreddit/link/max/", {
      method: "GET"
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

    // Permet de récupérer le top 5 des subreddits par nombre total de liens
    fetch("http://134.209.90.92:3200/subreddit/top5byTotalLinks", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          total: {
            labels: json.payload.map(subreddit => subreddit.name),
            datasets: [
              {
                data: json.payload.map(
                  subreddit =>
                    subreddit.incomingLinkCount + subreddit.outgoingLinkCount
                )
              }
            ]
          }
        });
      })
      .catch(error => {
        console.error(error);
      });

    // Permet de récupérer le top 5 des subreddits par nombre de liens entrant
    fetch("http://134.209.90.92:3200/subreddit/top5byIncomingLinks", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          incoming: {
            labels: json.payload.map(subreddit => subreddit.name),
            datasets: [
              {
                data: json.payload.map(
                  subreddit =>
                    subreddit.incomingLinkCount
                )
              }
            ]
          }
        });
      })
      .catch(error => {
        console.error(error);
      });

    // Permet de récupérer le top 5 des subreddits par nombre de liens sortant
    fetch("http://134.209.90.92:3200/subreddit/top5byOutgoingLinks", {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          outgoing: {
            labels: json.payload.map(subreddit => subreddit.name),
            datasets: [
              {
                data: json.payload.map(
                  subreddit =>
                    subreddit.outgoingLinkCount
                )
              }
            ]
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { total } = this.state;
    const { incoming } = this.state;
    const { outgoing } = this.state;

    return (
      <React.Fragment>
        <ScrollView style={styles.main_container}>
          <View>
            {/* Partie du bilan statistique */}

            <View style={styles.box}>
              <Text style={styles.title}>Bilan Statistique</Text>
              <Text style={styles.subtitle}>
                Moyenne : {this.state.moyenne} liens par subreddit
              </Text>
              <Text style={styles.subtitle}>Max : {this.state.max} </Text>
              <Text style={styles.subtitle}>Min : {this.state.min} </Text>
            </View>
            <View style={styles.box}>
              <Button
                color="#ff4500"
                title="Enlever le subreddit le plus lié"
                onPress={() => {}}
              />
            </View>

            {/* Partie avec les graphes */}

            <View style={styles.box}>
              <Text style={styles.title}>Subreddits les plus liés</Text>

              {/* Graphe pour montrer les subreddits les plus liés */}
              {total ? (
                <BarChart
                  style={styles.chart}
                  data={total}
                  width={Dimensions.get("window").width - 10}
                  height={300}
                  verticalLabelRotation={30}
                  chartConfig={{
                    backgroundColor: "#336699",
                    backgroundGradientFrom: "#336699",
                    backgroundGradientFromOpacity: 100,
                    fillShadowGradient: "#f0F0F0",
                    fillShadowGradientOpacity: 100,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 0
                    }
                  }}
                />
              ) : (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
            </View>
            {/* TODO virer le false et faire les autre graphs*/}
              <View style={styles.box}>
                <Text style={styles.title}>
                  Subreddits avec le plus de liens entrant
                </Text>

                {/* Graphe pour montrer les subreddits avec le plus de liens entrant */}
                {incoming ? (
                <BarChart
                  style={styles.chart}
                  data={incoming}
                  width={Dimensions.get("window").width - 10}
                  height={300}
                  verticalLabelRotation={30}
                  chartConfig={{
                    backgroundColor: "#336699",
                    backgroundGradientFrom: "#336699",
                    backgroundGradientFromOpacity: 100,
                    fillShadowGradient: "#F0F0F0",
                    fillShadowGradientOpacity: 100,
                    decimalPlaces: 0,
                    padding: 10,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                />
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
                <Text style={styles.title}>
                  Subreddits avec le plus de liens sortant
                </Text>

                {/* Graphe pour montrer les subreddits avec le plus de liens sortant */}
                {outgoing ? (
                <BarChart
                  style={styles.chart}
                  data={outgoing}
                  width={Dimensions.get("window").width - 10}
                  height={300}
                  verticalLabelRotation={30}
                  chartConfig={{
                    backgroundColor: "#000000",
                    backgroundGradientFrom: "#336699",
                    backgroundGradientFromOpacity: 100,
                    fillShadowGradient: "#f0F0F0",
                    fillShadowGradientOpacity: 100,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                />
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },

  title: {
    fontSize: 25,
    marginLeft: 15,
    fontWeight: "bold"
  },

  subtitle: {
    fontSize: 20,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    flexDirection: "column"
  },

  info: {
    fontSize: 15,
    marginLeft: 15,
    flexDirection: "column"
  },

  chart: {
    backgroundColor: "#336699",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 7
  },

  box: {
    marginTop: 10
  }
});

export default Statistiques;
