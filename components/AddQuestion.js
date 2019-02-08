import React, { Component } from "react";
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { addCardToDeck, getDecks } from "../utils/api";
import { AppLoading } from "expo";
import { white, gray, pink } from "../utils/colors";
import { formatNumberCards } from "../utils/helpers";


class AddQuestion extends Component {
  state = {
    ready: false,
    decks: {},
    answer: '',
    question: ''
  };

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState(() => ({ ready: true, decks: decks })));
  }

  submit = () => {
    const card = {question: this.state.question, answer: this.state.answer}
    console.log("add-question title:",this.props.navigation.state.params.entryId, card)
    const title = this.props.navigation.state.params.entryId
    addCardToDeck(title, card)
    .then(() => this.props.navigation.navigate('Deck', { entryId: this.props.navigation.state.params.entryId }))
    this.setState({ question: '', answer: '' })
  };

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    console.log("add-question", this.state.decks)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter a new question:
        </Text>
        <TextInput
          placeholder="Question"
          onChangeText={input => this.setState({ question: input })}
          value={this.state.question}
          style={styles.input}
        />
        <TextInput
          placeholder="Answer"
          onChangeText={input => this.setState({ answer: input })}
          value={this.state.answer}
          style={styles.input}
        />
        <TouchableOpacity style={styles.submit} disabled={this.state.answer === '' || this.state.question === ''} onPress={this.submit}>
            <Text style={styles.buttonText}>Add Question</Text>
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
    marginBottom: 18,
    marginTop: 80,
    height: 80,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    justifyContent: "center",
    alignSelf: "stretch",
    fontSize: 14,
    fontSize: 20,
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: 18,
    height: 60,
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

export default AddQuestion;
