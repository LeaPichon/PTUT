import React from 'react'
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native'
import data from '../data/subreddits'
import SubredditItem from './SubredditItem'

class Search extends React.Component {
    render() {
        return (
            <View>
                <TextInput style={styles.textinput} placeholder='Nom du Subreddit'/>
                <Button color= '#ff4500' title='Rechercher' onPress={() => this._loadSubreddits}/>
                <Text style={styles.title}>Liste des Subreddits</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item._fields.identity.high}
                    renderItem={({ item }) => <SubredditItem subreddit = {item}/>}
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