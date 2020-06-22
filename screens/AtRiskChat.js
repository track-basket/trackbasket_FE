import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import UserContext from '../user-context';

const AtRiskChat = () => {
  const { allMessages, setNewMessage, user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  console.log(user.name);
  const chatMessages = allMessages.map((chatMessage, i) => {
    console.log(chatMessage.split(': ')[0]);

    return (
      <Text
        key={i}
        style={
          chatMessage.split(': ')[0] === user.name
            ? styles.msgLeft
            : styles.msgRight
        }
      >
        {chatMessage}
      </Text>
    );
  });

  const submitChatMessage = () => {
    setNewMessage(message);
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{`Chat with your volunteer shopper`}</Text>
        {chatMessages}

        <TextInput
          style={styles.textInput}
          value={message}
          onSubmitEditing={() => submitChatMessage()}
          autoCorrect={false}
          onChangeText={(chatMessage) => {
            setMessage(chatMessage);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
  },
  innerContainer: {
    alignItems: 'center',
    width: 400,
    marginTop: 100,
  },
  textInput: {
    width: 300,
    borderWidth: 2,
    height: 40,
    fontSize: 20,
  },
  title: {
    fontSize: 20,
  },
  msgLeft: {
    fontSize: 18,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  msgRight: {
    fontSize: 18,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});

export default AtRiskChat;
