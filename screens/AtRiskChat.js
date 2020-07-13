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
import moment from 'moment';
import UserContext from '../user-context';
import { getConversation } from '../components/ApiCalls';

const AtRiskChat = () => {
  const { allMessages, setNewMessage, setAllMessages, cart, user } = useContext(
    UserContext,
  );
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    setAllMessages([]);
    getConversation(user.id, cart.volunteer_id).then((response) => {
      if (response.data.attributes.messages) {
        const sortedMessages = response.data.attributes.messages.sort(
          (a, b) => {
            return moment(a.timestamp) - moment(b.timestamp);
          },
        );
        setAllMessages(sortedMessages);
      }
    });
    return function cleanup() {
      setAllMessages([]);
      getConversation(user.id, cart.volunteer_id).then((response) => {
        if (response.data.attributes.messages) {
          setAllMessages(response.data.attributes.messages);
        }
      });
    };
  }, []);

  const showDate = (i) => {
    const show =
      i === 0 ||
      moment(allMessages[i].timestamp).format('MM/DD/YY') !==
        moment(allMessages[i - 1].timestamp).format('MM/DD/YY');
    return show;
  };

  const chatMessages = allMessages.map((chatMessage, i) => {
    return (
      <View
        key={i}
        style={
          chatMessage.author === 'at_risk_user'
            ? styles.msgRight
            : styles.msgLeft
        }
      >
        {showDate(i) && (
          <Text style={styles.date}>
            {moment(chatMessage.timestamp).format('dddd, MMMM D')}
          </Text>
        )}
        <View
          style={
            chatMessage.author === 'at_risk_user'
              ? styles.msgInnerRight
              : styles.msgInnerLeft
          }
        >
          <Text
            style={
              chatMessage.author === 'at_risk_user'
                ? styles.msgTextRight
                : styles.msgTextLeft
            }
          >
            {chatMessage.text}
          </Text>
          <Text
            style={
              chatMessage.author === 'at_risk_user'
                ? styles.msgTimeRight
                : styles.msgTimeLeft
            }
          >
            {moment(chatMessage.timestamp).format('h:mm a')}
          </Text>
        </View>
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
        {!!allMessages.length && (
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
        )}
        {!allMessages.length && (
          <View style={styles.noMessagesContainer}>
            <Text style={styles.noMessages}>No messages</Text>
          </View>
        )}
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
    alignSelf: 'center',
  },
  msgLeft: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  msgRight: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  msgInnerLeft: {
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  msgInnerRight: {
    backgroundColor: 'lightblue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  msgTextLeft: {
    fontSize: 18,
    textAlign: 'left',
  },
  msgTimeLeft: {
    fontSize: 12,
    textAlign: 'left',
  },
  msgTextRight: {
    fontSize: 18,
    textAlign: 'right',
  },
  msgTimeRight: {
    fontSize: 12,
    textAlign: 'right',
  },
  date: {
    paddingLeft: 10,
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 5,
  },
  noMessages: {
    fontSize: 18,
    color: 'gray',
  },
  noMessagesContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexGrow: 1,
    marginBottom: 40,
  },
});

export default AtRiskChat;
