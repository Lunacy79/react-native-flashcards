import React, { Component } from 'react'
import { View } from 'react-native'
import Home from './components/Home'
import AddQuestion from './components/AddQuestion'
import Deck from './components/Deck'
import AddDeck from './components/AddDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { purple, white } from './utils/colors'


const Tabs = TabNavigator({
  Home : {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home'
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck'
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: white,
    style: {
      height: 56,
      backgroundColor: purple,
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "Deck View",
      headerTintColor: white,
      headerTitleSize: {
        fontSize: 20
      },
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
})

export default class App extends Component {
  render() {
    return (
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
    )
  }
}