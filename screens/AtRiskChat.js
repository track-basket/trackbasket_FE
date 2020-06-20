import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import UserContext from '../user-context';

const AtRiskChat = () => {
  const { allMessages, setNewMessage } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const chatMessages = allMessages.map((chatMessage, i) => {
    return <Text key={i}>{chatMessage}</Text>;
  });

  const submitChatMessage = () => {
    setNewMessage(message);
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
      <Text>{`Chat with your volunteer shopper`}</Text>
      {chatMessages}
    </View>
  );
};

export default AtRiskChat;
