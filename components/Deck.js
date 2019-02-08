import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { getDecks } from "../utils/api";
import { formatNumberCards } from "../utils/helpers";
import { green } from "../utils/colors"

class Deck extends Component {
  state = {
    ready: false,
    decks: {}
  };

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState(() => ({ 
        ready: true, 
        decks: decks 
      })));
  }

  render() {
    const decks = this.state.decks
    console.log('decks:', decks[this.props.navigation.state.params.entryId], this.props.navigation.state.params.entryId)
    const deck = decks[this.props.navigation.state.params.entryId]

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {deck && deck.title}
        </Text>
        <Text style={styles.cardNumber}>
          {deck && formatNumberCards(deck.questions)}
        </Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate("AddQuestion", { entryId: deck.title })
          }
          title="Add Question"
          style={styles.button1}
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate("Quiz", { entryId: deck && deck })
          }
          title="Start Quiz"
          style={styles.button2}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  title: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 25,
    color: '#000',
    marginBottom: 18,
    height: 80,
    marginLeft: 20,
    marginRight: 20
  },
  cardNumber: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 15,
    color: '#000',
    marginBottom: 18,
    height: 80,
    marginLeft: 20,
    marginRight: 20
  },
  button1: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: '#eee',
    color: '#fff',
    height: 60,
    width: 100
  },
  button2: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: green,
    color: '#fff',
    height: 60,
    width: 100
  },
});


export default Deck;
