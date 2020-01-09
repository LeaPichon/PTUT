import React from 'react'
import { StyleSheet, View, Text, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import SearchInput, { createFilter } from 'react-native-search-filter';
import subreddits from '../data/subreddits'

const KEY_TO_FILTER = '_fields.properties.name';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }

    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }

    render() {
        const filteredSubreddits = subreddits.filter(createFilter(this.state.searchTerm, KEY_TO_FILTER))
        return (
            <View>
                <SearchInput style={styles.textinput} placeholder='Nom du Subreddit' onChangeText={(term) => { this.searchUpdated(term) }}/>
                <Button color='#ff4500' title='Enlever le subreddit le plus lié' onPress={() => {}}/>
                <Text style={styles.title}>Liste des Subreddits</Text>
                <ScrollView>
                    {filteredSubreddits.map(subreddit => {
                        return (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Details', { subreddit: subreddit })}>
                            <View style={styles.subreddit_container}>
                                <Image style={styles.image} source={require('../assets/reddit.png')}/>
                                <View style={styles.name_container}>
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