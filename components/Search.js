import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, Button, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import { getSubreddits } from '../data/API'

const KEY_TO_FILTER = '_fields[0]';

class Search extends React.Component {

    // Définit la variable searchTerm comme étant à réévaluer à chaque fois qu'elle est modifiée
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            filteredItem: []
        }

    }

    _loadSubreddits() {
        getSubreddits('league').then(data => console.log(data))
    }

    // Fonction qui réévalue la variable searchTerm
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    
    
    // Fonction qui récupère les subreddits de l'API
    async componentDidMount() {
        const response = await fetch('http://134.209.90.92:3200/subreddit/', {method: 'GET',});
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        console.log("Réponse de l'API :" + response);
        this.setState({
                    isLoading: false,
                    filteredItem: json.records
                    //.filter(createFilter(this.state.searchTerm, KEY_TO_FILTER)),

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
        const filteredSubreddits = this.state.filteredItem.filter(createFilter(this.state.searchTerm, KEY_TO_FILTER))
        //console.log("Les subreddits :" + filteredSubreddits);
        return (
            <View>
                {/* Barre de recherche, bouton pour enlever le 1er subreddit et titre de la liste */}
                <SearchInput style={styles.textinput} placeholder='Nom du Subreddit' onChangeText={(term) => { this.searchUpdated(term) }}/>
                <Button color='#ff4500' title='Enlever le subreddit le plus lié' onPress={() => this._loadSubreddits()}/>
                <Text style={styles.title}>Liste des Subreddits</Text>
                <FlatList
                    data={filteredSubreddits}
                    keyExtractor={(item) => item._fields[0].toString()}
                    renderItem={({item}) => <View style={styles.subreddit_container}>
                                                {/* Lien vers l'image (logo de reddit) */}
                                                <Image style={styles.image} source={require('../assets/reddit.png')}/>
                                                <View style={styles.name_container}>
                                                    {/* Nom du subreddit */}
                                                    {/*console.log("test name : " + item._fields[0])*/}
                                                    <Text style={styles.name}>{item._fields[0]}</Text>
                                                </View>
                                            </View>}
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
    },
    image: {
        width: 30,
        height: 30,
        margin: 5
    },
    name_container: {
        flex: 1,
        margin: 5
    },
    name: {
        fontSize: 18,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    subreddit_container: {
        height: 45,
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 5
    }
})

export default Search