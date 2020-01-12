import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import { getSubredditsWithSearch } from '../data/API'

const KEY_TO_FILTER = '_fields[0]';

class Search extends React.Component {

    // Définit la variable searchTerm comme étant à réévaluer à chaque fois qu'elle est modifiée
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            subreddits: []
        }
    }

    // Fonction qui récupère les subreddits en fonction du texte tapé
    _loadSubreddits() {
        if (this.state.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            getSubredditsWithSearch(this.state.searchedText).then(data => {
                this.setState({ subreddits: data.results })
            })
        }
    }

    // Fonction qui réévalue la variable searchTerm
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
    
    // Fonction qui récupère les subreddits de l'API
    async componentDidMount() {
        const response = await fetch('http://134.209.90.92:3200/subreddit/', {method: 'GET'});
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        this.setState({
                    isLoading: false,
                    filteredItem: json
                }, function () {
        }).catch((error) => {
                console.error(error);
            });
    }

    render() {
        // Affiche  lorsque ça charge
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator/>
                </View>
            )
        }
        // Filtre des subreddits sur le paramètre défini dans la variable KEY_TO_FILTER (le nom), en fonction
        // du texte renseigné dans la variable searchTerm
        //const filteredSubreddits = 
        //filteredItem.filter(createFilter(this.state.searchTerm, KEY_TO_FILTER)),
        const filteredSubreddits = this.state.filteredItem
        //.filter(createFilter(this.state.searchTerm, KEY_TO_FILTER))
        console.log("Les subreddits :" + filteredSubreddits);
        return (
            <View>
                {/* Barre de recherche, bouton pour enlever le 1er subreddit et titre de la liste */}
                <SearchInput style={styles.textinput} placeholder='Nom du Subreddit' onChangeText={(term) => { this.searchUpdated(term) }}/>
                <Text style={styles.title}>Liste des Subreddits</Text>
                <FlatList
                    data={this.state.subreddits}
                    keyExtractor={(item) => item._fields[0].toString()}
                    renderItem={({item}) => <SubredditItem subreddit={item}/>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 20,
        height: 50,
        borderColor: '#ff4500',
        borderWidth: 1,
        paddingLeft: 5
    },
    title: {
        fontSize: 25,
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold'
    }
})

export default Search