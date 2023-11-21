import React from 'react';
import {View, StyleSheet} from 'react-native';
import R from '@components/utils/R';

function FixedContainer(props) {
  const {containerStyles, children} = props;

  return <View style={[styles.mainLayout, containerStyles]}>{children}</View>;
}
export default FixedContainer;

const styles = StyleSheet.create({
  mainLayout: {
    width: '100%',
    height: '100%',
    // flex: 1,
    justifyContent: 'flex-start',
  },

  header: {
    width: R.unit.width(1),
    paddingTop: R.unit.scale(20),
    paddingHorizontal: R.unit.scale(20),
  },
});
