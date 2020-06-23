import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import VolunteerContext from '../volunteer-context';
import UserContext from '../user-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Chat = () => {
  const {
    singleList,
    allMessagesVolunteer,
    setNewMessageVolunteer,
  } = useContext(VolunteerContext);

  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  const chatMessages = allMessagesVolunteer.map((chatMessage, i) => {
    console.log(chatMessage.split(': ')[0]);

    return (
      <View
        key={i}
        style={
          chatMessage.split(': ')[0] === singleList.userDetails.name
            ? styles.msgRight
            : styles.msgLeft
        }
      >
        <Text style={styles.msgText}>{chatMessage}</Text>
      </View>
    );
  });

  const submitChatMessage = () => {
    setNewMessageVolunteer(message);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
        <Text
          style={styles.title}
        >{`Chat about ${singleList.userDetails.name}'s groceries`}</Text>
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
    marginVertical: 10,
    alignSelf: 'center',
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

export default Chat;
