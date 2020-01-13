import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList
} from "react-native";
import SearchInput from "react-native-search-filter";
import { getSubredditsWithSearch } from "../data/API";
import SubredditItem from "./SubredditItem";

const KEY_TO_FILTER = "_fields[0]";

class Search extends React.Component {
  // Définit la variable partialName comme étant à réévaluer à chaque fois qu'elle est modifiée
  // et la variable subreddits contient les subreddits recherchés
  constructor(props) {
    super(props);
    this.state = {
      partialName: "",
      subreddits: []
    };
  }

  // Fonction qui réévalue la variable partialName
  handleNameChange = partialName => {
    clearTimeout(this.state.apiCallTimer);
    const apiCallTimer = setTimeout(() => {
      this.fetchSubreddit(partialName);
    }, 500);

    this.setState({ partialName, apiCallTimer });
  };

  // Fonction qui récupère les subreddits en fonction du texte tapé
  fetchSubreddit = async partialName => {
    this.setState({ isLoading: true });
    const response = await fetch(
      `http://134.209.90.92:3200/subreddit/?contains=${partialName}`,
      { method: "GET" }
    );
    console.debug("fetching subreddits containing " + partialName);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    this.setState({
      isLoading: false,
      subreddits: json.payload
    });
  };

  render() {
    return (
      <View>
        {/* Barre de recherche, bouton pour enlever le 1er subreddit et titre de la liste */}
        <SearchInput
          style={styles.textinput}
          placeholder="Nom du Subreddit"
          onChangeText={this.handleNameChange}
        />
        <Text style={styles.title}>Liste des Subreddits</Text>

        {/*Affiche la liste des subreddits*/}
        {!this.state.isLoading && !!this.state.subreddits.length && (
          <FlatList
            data={this.state.subreddits}
            keyExtractor={subreddit => subreddit.name}
            renderItem={({ item }) => <SubredditItem subreddit={item} onPress={() => this.props.navigation.navigate("Details", { subredditName: item.name })} />}
          />
        )}

        {/*Affiche un loader quand on charge les données*/}
        {this.state.isLoading && (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    height: 50,
    borderColor: "#ff4500",
    borderWidth: 1,
    paddingLeft: 5
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold"
  }
});

export default Search;
