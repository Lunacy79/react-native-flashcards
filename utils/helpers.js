import React from "react";
import { Text } from "react-native";
import { Notifications, Permissions } from "expo";

export const formatNumberCards = questions => {
  if (questions.length > 1 || questions.length === 0) {
    return <Text>( {questions.length} cards )</Text>;
  } else {
    return <Text>( 1 card )</Text>;
  }
};


function getLocalNotification() {
  return {
    title: 'Your flashcards are waiting...!'
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();
            Notifications.scheduleLocalNotificationAsync(getLocalNotification(), { time: ((new Date()).getDate() + 1), repeat: 'day' });
            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}