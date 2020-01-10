import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import subreddits from '../data/subreddits'

const KEY_TO_FILTER = '_fields.properties.name';

class Search extends React.Component {

    // Définit la variable searchTerm comme étant à réévaluer à chaque fois qu'elle est modifiée
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }

    }

    // Fonction qui réévalue la variable searchTerm
    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        // Filtre des subreddits sur le paramètre défini dans la variable KEY_TO_FILTER (le nom), en fonction
        // du texte renseigné dans la variable searchTerm
        const filteredSubreddits = subreddits.filter(createFilter(this.state.searchTerm, KEY_TO_FILTER))
        return (
            <View>
                {/* Barre de recherche, bouton pour enlever le 1er subreddit et titre de la liste */}
                <SearchInput style={styles.textinput} placeholder='Nom du Subreddit' onChangeText={(term) => { this.searchUpdated(term) }}/>
                <Button color='#ff4500' title='Enlever le subreddit le plus lié' onPress={() => {}}/>
                <Text style={styles.title}>Liste des Subreddits</Text>

                <ScrollView>
                    {/* Sert à filtrer la liste les subreddits affichés en fonction du nom tapé dans la barre de recherche */}
                    {filteredSubreddits.map(subreddit => {
                        return (
                        /* Lien vers les autres subreddits. TouchableOpacity permet de mettre en transparence 
                            le nom du subreddit lorsque que l'on clique dessus */
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { subreddit: subreddit })}>
                            <View style={styles.subreddit_container}>
                                {/* Lien vers l'image (logo de reddit) */}
                                <Image style={styles.image} source={require('../assets/reddit.png')}/>
                                <View style={styles.name_container}>
                                    {/* Nom du subreddit */}
                                    <Text style={styles.name}>{subreddit._fields.properties.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    })}
                </ScrollView>
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