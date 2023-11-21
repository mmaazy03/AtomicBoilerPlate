import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import R from '@components/utils/R';
import Icon from './Icon';

function CheckBox(props) {
  const {alreadySelected, onPress, id, disabled = false} = props;

  const checkedBox = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity
      onPress={checkedBox}
      activeOpacity={0.7}
      disabled={disabled}>
      {alreadySelected ? (
        <View style={styles.checkedBox}>
          <Icon
            type={'MaterialCommunityIcons'}
            name={'check'}
            color={R.color.white}
            size={15}
          />
        </View>
      ) : (
        <View style={styles.unCheckedBox} />
      )}
    </TouchableOpacity>
  );
}
export default CheckBox;

const styles = ScaledSheet.create({
  checkedBox: {
    backgroundColor: R.color.mainColor2,
    height: R.unit.scale(22),
    width: R.unit.scale(22),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: R.unit.scale(6),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.mainColor2,
  },
  unCheckedBox: {
    backgroundColor: 'white',
    height: R.unit.scale(22),
    width: R.unit.scale(22),
    borderRadius: R.unit.scale(6),
    borderColor: R.color.gray4,
    borderWidth: R.unit.scale(1),
  },
});
