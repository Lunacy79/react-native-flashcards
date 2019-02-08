import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { pink, gray, white } from "../utils/colors";
import { saveDeckTitle } from "../utils/api";

class AddDeck extends Component {
  state = {
    deckText: ''
  };

  submit = () => {
    const { deckText } = this.state;
    console.log('deck-addDeck:', deckText)
    saveDeckTitle(deckText)
    .then(() => this.props.navigation.navigate('Deck', { entryId: deckText }))
    this.setState({ deckText: '' });
  };


  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter a title for your new deck:
        </Text>
        <TextInput
          onChangeText={input => this.setState({ deckText: input })}
          value={this.state.deckText}
          style={styles.input}
        />
        <TouchableOpacity style={styles.submit} disabled={this.state.decktext === ''} onPress={this.submit}>
            <Text style={styles.buttonText}>Add Deck</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  title: {
    fontSize: 25,
    color: '#000',
    marginBottom: 18,
    marginTop: 80,
    height: 80,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    fontSize: 14,
    alignSelf: "stretch",
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 18,
    height: 60,
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 14
  },
  submit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#333',
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


export default AddDeck;
