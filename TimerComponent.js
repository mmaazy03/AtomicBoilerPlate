import React from 'react';
import {View, Text, Button} from 'react-native';
import {TimerProvider, TimerContext} from './TimerContext';

const TimerComponent = () => {
  const {seconds, startTimer, stopTimer, resetTimer} =
    React.useContext(TimerContext);

  return (
    <View style={{padding: 20}}>
      <Text>Time: {seconds} seconds</Text>
      <Button title="Start Timer" onPress={startTimer} />
      <Button title="Stop Timer" onPress={stopTimer} />
      <Button title="Reset Timer" onPress={resetTimer} />
    </View>
  );
};

export default TimerComponent;
