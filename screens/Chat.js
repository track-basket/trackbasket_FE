import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import VolunteerContext from '../volunteer-context';

const Chat = () => {
  const { singleList, allMessages, setNewMessageVolunteer } = useContext(
    VolunteerContext,
  );

  const [message, setMessage] = useState('');

  const chatMessages = allMessages.map((chatMessage, i) => {
    return <Text key={i}>{chatMessage}</Text>;
  });

  const submitChatMessage = () => {
    // socket.emit('chat message', volunteer.name + ': ' + message);
    setNewMessageVolunteer(message);
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
