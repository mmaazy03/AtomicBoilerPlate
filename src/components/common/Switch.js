import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Switch as SwitchC} from 'native-base';
import R from '@components/utils/R';

const Switch = props => {
  const {toggleValue} = props;
  const [isOn, setIsOn] = useState(false);

  const onToggle = () => {
    let value = !isOn;
    toggleValue(value);
    setIsOn(value);
  };

  return (
    <SwitchC
      size="sm"
      onTrackColor={R.color.primaryColor1}
      onThumbColor={R.color.primaryColor2}
      onChange={onToggle}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default Switch;
