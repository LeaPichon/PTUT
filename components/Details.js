import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import SubredditItem from "./SubredditItem";

// Page de détails d'un subreddit

export default ({ navigation }) => {
  const [linkedSubreddits, setLinkedSubreddits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subreddit, setSubreddit] = useState({});

  const name = navigation.getParam("subredditName");

  console.log(subreddit.incomingLinkCount)
  const { incomingLinkCount, outgoingLinkCount } = subreddit;

  // Récupération des subreddits depuis l'API
  const fetchSubreddit = async () => {
    setLoading(true);
    const response = await fetch(
      `http://134.209.90.92:3200/subreddit/?name=${name}`,
      { method: "GET" }
    );
    console.debug("fetching subreddit " + name);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    setSubreddit(json.payload[0]);

    // Récupération des subreddits liés
    const responseLinked = await fetch(
      `http://134.209.90.92:3200/subreddit/linkedTo?name=${name}`,
      { method: "GET" }
    );
    console.debug("fetching subreddits linked to " + name);
    if (!responseLinked.ok) {
      throw Error(responseLinked.statusText);
    }
    const jsonLinked = await responseLinked.json();
    setLinkedSubreddits(jsonLinked.payload);
    setLoading(false);
  };

  useEffect(() => {
    fetchSubreddit();
  }, [name]);

  return (
    <View style={styles.main_container}>
      <View style={styles.title_container}>
        {/* Source de l'image (logo de reddit) */}
        <Image
          style={styles.imageTop}
          source={require("../assets/reddit.png")}
        />
        {/* Récupération du nom du subreddit */}
        <Text style={styles.title}>{name}</Text>
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {!loading && !!Object.keys(subreddit).length && (
        <>
          {/* Partie de statistiques sur les liens du subreddit */}
          <View style={styles.content_container}>
            <Text style={styles.subtitle}>
              Nombre de liens entrant : {incomingLinkCount}
            </Text>
            <Text style={styles.subtitle}>
              Nombre de liens sortant : {outgoingLinkCount}
            </Text>
            <Text style={styles.subtitle}>
              Nombre de liens total : {incomingLinkCount + outgoingLinkCount}
            </Text>
          </View>

          {/* Liste des subreddits reliés à celui actif */}
          <View style={styles.content_container}>
            <Text style={styles.subtitle}>Subreddits liés : </Text>
            {linkedSubreddits && (
              <FlatList
                data={linkedSubreddits}
                keyExtractor={linkedSubreddit => linkedSubreddit.name}
                renderItem={({ item }) => (
                  <SubredditItem
                    subreddit={item}
                    onPress={() =>
                      navigation.navigate("Details", {
                        subredditName: item.name
                      })
                    }
                  />
                )}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title_container: {
    height: 45,
    marginLeft: 10,
    marginTop: 5,
    flexDirection: "row"
  },
  subreddit_container: {
    height: 45,
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 5
  },
  content_container: {
    marginTop: 10
  },
  imageTop: {
    width: 50,
    height: 50,
    margin: 5
  },
  image: {
    width: 30,
    height: 30,
    margin: 5
  },
  title: {
    fontSize: 25,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: "bold",
    flex: 2
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10,
    flexDirection: "column"
    //padding: 10
  },
  name: {
    fontSize: 18,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 5
  }
});
