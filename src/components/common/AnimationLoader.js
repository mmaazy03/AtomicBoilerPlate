import R from '@components/utils/R';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Loader from './Loader';

const AnimationLoader = props => {
  const {
    overlayColor = 'rgba(255,255,255,0.65)',
    containerStyles,
    iosLoader = false,
  } = props;
  return (
    <View
      style={{
        backgroundColor: overlayColor,
        ...styles.container,
        ...containerStyles,
      }}>
      <View style={styles.subContainer}>
        <Loader color={R.color.mainColor} size={15} iosLoader={iosLoader} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: R.unit.height(1),
    width: R.unit.width(1),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    height: R.unit.scale(300),
    width: R.unit.scale(300),
  },
});

export default AnimationLoader;
