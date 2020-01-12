import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default ({ subreddit, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
  >
    <View style={styles.subreddit_container}>
      {/* Lien vers l'image (logo de reddit) */}
      <Image style={styles.image} source={require("../assets/reddit.png")} />
      <View style={styles.name_container}>
        {/* Nom du subreddit */}
        <Text style={styles.name}>{subreddit.name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
    flexWrap: "wrap",
    paddingRight: 5
  },
  subreddit_container: {
    height: 45,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 5
  }
});
