import React, { Component } from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"
import { gray, white, red, green, blue } from "../utils/colors"
import { getDecks } from "../utils/api"

class Quiz extends Component {
  state = {
    ready: false,
    questionNumber: 0,
    showAnswer: false,
    correct: 0,
    incorrect: 0,
    decks: {}
  };

  componentDidMount() {
    getDecks()
      .then((decks) => this.setState(() => ({ ready: true, decks: decks })));
  }

  showAnswer = () =>
    this.state.showAnswer
      ? this.setState({ showAnswer: false })
      : this.setState({ showAnswer: true });

  correct = () => {
    this.setState({ correct: this.state.correct + 1 });
    this.incrementQuestionNumber();
  };

  incorrect = () => {
    this.setState({ incorrect: this.state.incorrect + 1 });
    this.incrementQuestionNumber();
  };

  incrementQuestionNumber = () => {
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showAnswer: false
    });
  };

  restart = () => {
    this.setState({
      questionNumber: 0,
      showAnswer: false,
      correct: 0,
      incorrect: 0
    });
  };

  render() {
    const decks = this.state.decks;
    console.log('decks-quiz:' , decks, this.props.navigation.state.params.entryId)
    const deck = this.props.navigation.state.params.entryId;
    const questionNumber = this.state.questionNumber;
    const number = this.state.questionNumber + 1;
    
    if (questionNumber === deck.questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.result}>
            You completed with {(this.state.correct / (this.state.incorrect + this.state.correct) * 100).toFixed(2)} %!
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.restart}>
            <Text style={styles.buttonText}>Start Again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Deck", { entryId: deck.title })}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.number}>
            Question {number} of {deck.questions.length}
          </Text>

          {this.state.showAnswer ? (
            <Text style={styles.text}>
              {deck.questions[questionNumber].answer}
            </Text>
          ) : (
            <Text style={styles.text}>
              {deck.questions[questionNumber].question}
            </Text>
          )}

          {this.state.showAnswer ? (
            <TouchableOpacity style={styles.answer} onPress={this.showAnswer}>
              <Text style={styles.answerText}>Show Question</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.answer} onPress={this.showAnswer}>
              <Text style={styles.answerText}>Show Answer</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.buttonGreen} onPress={this.correct}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRed} onPress={this.incorrect}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  number: {
    color: gray,
    fontSize: 15,
    marginBottom: 50,
    marginTop: 80
  },
  text: {
    fontSize: 25,
    color: '#000',
    marginTop: 0,
    textAlign: "center",
    marginBottom: 30
  },
  result: {
    fontSize: 25,
    marginTop: 80,
    color: '#000',
    marginTop: 0,
    textAlign: "center",
    marginBottom: 30
  },
  answer: {
    color: blue,
    backgroundColor: 'transparent',
    fontSize: 20,
    marginBottom: 50
  },
  answerText: {
    color: '#000',
    fontSize: 20,
    marginBottom: 50
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#333',
    color: '#fff',
    height: 60,
    width: 200,
    marginBottom: 30
  },
  buttonRed: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: red,
    color: '#fff',
    height: 60,
    width: 200,
    marginBottom: 30,
    borderRadius: 10
  },
  buttonGreen: {
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

export default Quiz
