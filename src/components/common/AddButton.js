import React from 'react';
import {TouchableOpacity, StyleSheet, Platform} from 'react-native';
import R from '@components/utils/R';
import Icon from './Icon';

const AddButton = props => {
  const {onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.addCompaintButton, R.styles.boxShadow]}>
      <Icon type={'Ionicons'} name={'add'} color={R.color.white} size={20} />
    </TouchableOpacity>
  );
};
export default AddButton;

const styles = StyleSheet.create({
  addCompaintButton: {
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? R.unit.height(R.unit.responsiveSize(0.79, 0.72, 1000))
        : R.unit.height(R.unit.responsiveSize(0.74, 0.8, 1000)),
    right: 20,
    backgroundColor: R.color.primaryColor1,
    zIndex: 9999,
    padding: R.unit.scale(13),
    borderRadius: R.unit.scale(12),
  },
});
