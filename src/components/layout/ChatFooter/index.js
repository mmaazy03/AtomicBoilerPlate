import React, {useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import TextInput from '@components/common/TextInput';
import Icon from '@components/common/Icon';

function ChatFooter(props) {
  const inputRef = useRef();
  const {sendChat, textChange} = props;
  const [text, setText] = useState('');

  const onChange = value => {
    setText(value);
    textChange(value);
  };

  const sendPress = () => {
    if (inputRef) {
      inputRef?.current?.clear();
    }
    sendChat();
    setText('');
  };

  return (
    <View style={[R.styles.rowView, styles.inputTooBar, R.styles.boxShadow]}>
      <View style={{flex: 0.95}}>
        <TextInput
          secureText={false}
          placeholder={'Type a message...'}
          onChangeText={onChange}
          width={'100%'}
          placeholdercolor={'#9b9b9b'}
          color={R.color.blackLightShade}
          value={text}
          backgroundColor={'transparent'}
          borderRadius={8}
          borderWidth={0}
          multiline={true}
          fontSize={11}
          forwardedRef={inputRef}
          inputStyles={{paddingTop: 0}}
        />
      </View>

      <TouchableOpacity
        onPress={sendPress}
        activeOpacity={0.8}
        disabled={text.length === 0 ? true : false}>
        <Icon
          name={'send'}
          type={'FontAwesome'}
          size={30}
          color={R.color.primaryColor1}
        />
      </TouchableOpacity>
    </View>
  );
}
export default ChatFooter;

const styles = StyleSheet.create({
  inputTooBar: {
    backgroundColor: R.color.white,
    paddingHorizontal: R.unit.scale(12),
    paddingTop: R.unit.scale(5),
    marginBottom: R.unit.scale(20),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: R.unit.scale(6),
  },
});
