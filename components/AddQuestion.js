import React, { Component } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { getDecks } from "../utils/api";
import { AppLoading } from "expo";
import { white, gray } from "../utils/colors";
import { formatNumberCards } from "../utils/helpers";


class AddQuestion extends Component {
  state = {
    ready: false,
    decks: {}
  };

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState(() => ({ ready: true, decks: decks })));
  }

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    console.log(this.state.decks)

    return (
      <ScrollView style={styles.container}>
        {Object.keys(this.state.decks).map(deck => {
          const { title, questions } = this.state.decks[deck];
          return (
            <TouchableOpacity key={deck} style={styles.deck} onPress={() => this.props.navigation.navigate("Deck", { entryId: deck })
            }>
              <Text style={styles.deckText}>{title}</Text>
              <Text style={styles.cardNumber}>
                {questions ? formatNumberCards(questions) : null}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  deck: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    margin: 8,
    backgroundColor: gray,
    height: 140,
    borderRadius: 10,
  },
  deckText: {
    fontSize: 25,
    marginBottom: 8,
    color: white,
  },
  cardNumber: {
    fontSize: 14,
    color: white,
    marginBottom: 8,
  }
});

export default AddQuestion;
