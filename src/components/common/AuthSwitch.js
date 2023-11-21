import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import R from '@components/utils/R';
import Text from './Text';
import navigationRef from '@navRef';
import Icon from './Icon';

const AuthSwitch = props => {
  const {
    screen,
    text,
    linkText,
    textColor,
    iconColor = R.color.white,
    containerStyles,
    hoverStyles,
  } = props;

  const navigateScreen = () => {
    navigationRef.navigate(screen);
  };

  return (
    <View style={[styles.mainLayout, containerStyles]}>
      <Text
        variant={'body3'}
        font={'PoppinsRegular'}
        color={R.color.white}
        align={'center'}
        style={{marginRight: R.unit.scale(2)}}
        transform={'none'}>
        {text}
      </Text>
      <TouchableOpacity
        style={[styles.hoverLayout, hoverStyles]}
        onPress={navigateScreen}>
        <Text
          variant={'body3'}
          font={'PoppinsSemiBold'}
          color={textColor}
          align={'left'}
          transform={'none'}>
          {linkText}
        </Text>
        <Icon
          name={'arrow-top-right'}
          size={15}
          type={'MaterialCommunityIcons'}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};
export default AuthSwitch;
const styles = StyleSheet.create({
  mainLayout: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: R.unit.scale(16),
    flexDirection: 'row',
    columnGap: R.unit.scale(5),
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
  hoverLayout: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  svgView: {
    aspectRatio: 1,
    height: R.unit.height(0.03),
  },
});
