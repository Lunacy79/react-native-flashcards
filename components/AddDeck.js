import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput} from "react-native";
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
        <Button
          style={styles.submit}
          onPress={this.submit}
          title="Add Deck"
        />
      </View>
    )
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
  input: {
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: 14,
    color: pink,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 18,
    height: 80,
    marginLeft: 20,
    marginRight: 20
  },
  submit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#eee',
    color: '#fff',
    height: 60,
    marginLeft: 20,
    marginRight: 20
  }
});


export default AddDeck;
