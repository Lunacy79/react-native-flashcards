import { AsyncStorage } from "react-native";

const FLASHCARD_KEY = "flashcards: decks";

const initialDecks = {
  "Maths": {
    title: "Maths",
    questions: [
      {
        question: "How much is 10 plus 25?",
        answer: "35"
      },
      {
        question: "How much is 10 minus 3?",
        answer: "7"
      },
      {
        question: "How much is 74 plus 34?",
        answer: "108"
      }
    ]
  },
  "Code": {
    title: "Chemistry",
    questions: [
      {
        question: "What does find() do in JavaScript?",
        answer: "Finds a value in an array."
      },
      {
        question: "What is the for .. in loop for?",
        answer: "Looping over an object."
      }
    ]
  }
};

export const getInitialDecks = () => {
  return initialDecks;
};

export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_KEY).then(results => {
    if (results) {
      console.log(JSON.parse(results))
      return JSON.parse(results);
    } else {
      AsyncStorage.setItem(FLASHCARD_KEY, JSON.stringify(initialDecks));
      return initialDecks;
    }
  });
}

export function getDeck(title) {
  return AsyncStorage.getItem(FLASHCARD_KEY).then(result => {
    const data = JSON.parse(result)
    console.log('deck-api:', data, data[title])
    return data[title]
  });
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    FLASHCARD_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  );
}
