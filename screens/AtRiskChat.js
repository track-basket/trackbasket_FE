import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import UserContext from '../user-context';

const AtRiskChat = () => {
  const { allMessages, setNewMessage, user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  const chatMessages = allMessages.map((chatMessage, i) => {
    return (
      <View
        key={i}
        style={
          chatMessage.split(': ')[0] === user.name
            ? styles.msgLeft
            : styles.msgRight
        }
      >
        <Text style={styles.msgText}>{chatMessage}</Text>
      </View>
    );
  });

  const submitChatMessage = () => {
    setNewMessage(message);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
        <Text style={styles.title}>{`Chat with your volunteer shopper`}</Text>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
          onLayout={() => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
        >
          <View style={styles.innerContainer}>{chatMessages}</View>
        </ScrollView>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onSubmitEditing={() => submitChatMessage()}
            autoCorrect={true}
            onChangeText={(chatMessage) => {
              setMessage(chatMessage);
            }}
            placeholder="Type your message"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    marginTop: 20,
    flex: 1,
  },
  textInput: {
    width: 350,
    borderWidth: 2,
    height: 40,
    fontSize: 20,
    padding: 5,
  },
  textContainer: {
    width: 400,
    marginBottom: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
  },
  msgLeft: {
    alignSelf: 'flex-start',
    marginTop: 20,
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  msgRight: {
    alignSelf: 'flex-end',
    marginTop: 20,
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  msgText: {
    fontSize: 18,
  },
});

export default AtRiskChat;
