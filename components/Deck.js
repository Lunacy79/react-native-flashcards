import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
        <TouchableOpacity style={styles.button1} onPress={() => this.props.navigation.navigate("AddQuestion", { entryId: deck.title })}>
          <Text style={styles.buttonText}>Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => this.props.navigation.navigate("Quiz", { entryId: deck })}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 25,
    color: '#000',
    marginTop: 80,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20
  },
  cardNumber: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 15,
    color: '#000',
    marginBottom: 80,
    marginLeft: 20,
    marginRight: 20
  },
  button1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#333',
    color: '#fff',
    height: 60,
    width: 200,
    marginBottom: 30,
    borderRadius: 10
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: green,
    color: '#fff',
    height: 60,
    width: 200,
    marginBottom: 30,
    borderRadius: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 15
  }
});


export default Deck;
