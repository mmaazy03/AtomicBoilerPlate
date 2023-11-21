import {useRef} from 'react';
import R from '@components/utils/R';
import {Toast} from 'native-base';
import {StyleSheet, View} from 'react-native';
import Icon from './Icon';
import Text from './Text';
import {Popover, Box, Center, NativeBaseProvider} from 'native-base';
import Button from './Button';

const PopOverMenu = props => {
  const popOverRef = useRef();

  return (
    <View style={{backgroundColor: 'green', width: '90%', height: '100%'}}>
      <Popover
        onOpen={data => {}}
        defaultIsOpen={true}
        ref={popOverRef}
        trigger={triggerProps => {
          return (
            <Button
              value="Trigger"
              bgColor={R.color.primaryColor1}
              width={'100%'}
              size={'lg'}
              color={R.color.white}
              gutterBottom={16}
              loaderColor={R.color.white}
              onPress={() => triggerProps.onPress()}
              borderWidth={1}
            />
          );
        }}>
        <Popover.Content width="56">
          <Popover.Arrow />
          <Popover.CloseButton />

          <Popover.Header>Personal Details</Popover.Header>
          <Popover.Body>
            <Text>HELLO PARTYYU</Text>
          </Popover.Body>
          <Popover.Footer>
            <Button>Cancel</Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </View>
  );
};

export default PopOverMenu;
