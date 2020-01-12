import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class SubredditItem extends React.Component {
    render() {
        return (
            <View style={styles.main_container}>
                <Text style={styles.title_text}>Nom du subreddit</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create ({
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

export default SubredditItem
