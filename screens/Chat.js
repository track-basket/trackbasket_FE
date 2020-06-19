import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import VolunteerContext from '../volunteer-context';
import io from 'socket.io-client';
let socket;

const Chat = () => {
  const { singleList, volunteer } = useContext(VolunteerContext);

  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket = io('http://10.3.13.6:3000');
    socket.emit('joinRoom', singleList.id);
    socket.on('chat message', (msg) => {
      setAllMessages((allMessages) => [...allMessages, msg]);
    });
  }, []);

  const chatMessages = allMessages.map((chatMessage) => {
    return <Text key={chatMessage + Date.now()}>{chatMessage}</Text>;
  });

  const submitChatMessage = () => {
    socket.emit('chat message', volunteer.name + ': ' + message);

    setMessage('');
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderWidth: 2 }}
        value={message}
        onSubmitEditing={() => submitChatMessage()}
        autoCorrect={false}
        onChangeText={(chatMessage) => {
          setMessage(chatMessage);
        }}
      />
      <Text>{`Chat about ${singleList.userDetails.name}'s groceries`}</Text>
      {chatMessages}
    </View>
  );
};

export default Chat;
