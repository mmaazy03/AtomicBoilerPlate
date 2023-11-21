import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Text from './Text';
import R from '@components/utils/R';
import Loader from './Loader';

const Button = props => {
  const sizes = {
    xsm: R.unit.scale(30),
    sm: R.unit.scale(36),
    bsm: R.unit.scale(42),
    md: R.unit.scale(48),
    xmd: R.unit.scale(50),
    lg: R.unit.scale(56),
  };

  const {
    size,
    width,
    btnWrapperStyles,
    color = R.color.white,
    gutterTop = 0,
    gutterBottom = 0,
    rippleColor = R.color.mainColor2,
    borderRadius = 5,
    loader = false,
    borderColor = R.color.primaryColor1,
    bgColor = R.color.white,
    borderWidth = 0,
    textStyles,
    variant = 'body3',
    font = 'PoppinsRegular',
    disabledButtonBGColor = R.color.disabledButtonColor,
    disabledButtonTextColor = R.color.disabledButtonTextColor,
    //functionality
    onPress,
    disabled,
  } = props;

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          width: width,
          height: sizes[size],
          backgroundColor: disabled ? disabledButtonBGColor : bgColor,
          borderColor: disabled ? disabledButtonBGColor : borderColor,
          marginTop: R.unit.scale(gutterTop),
          marginBottom: R.unit.scale(gutterBottom),
          borderWidth: R.unit.scale(borderWidth),
        },
        btnWrapperStyles,
        props.justifyContent && {
          justifyContent: props.justifyContent,
        },
        borderRadius && {
          borderRadius: R.unit.scale(borderRadius),
        },
      ]}>
      <TouchableNativeFeedback
        delayPressIn={0.1}
        delayPressOut={0.1}
        delayLongPress={0.1}
        disabled={disabled}
        background={TouchableNativeFeedback.Ripple(rippleColor, true, 300)}
        onPress={onPress}>
        <View style={styles.buttonStyles}>
          <Text
            style={[
              styles.buttonText,
              {
                color: disabled ? disabledButtonTextColor : color,
              },
              textStyles,
            ]}
            variant={variant}
            font={font}>
            {!loader && props.value}
          </Text>
          {loader && <Loader color={R.color.white} />}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: R.unit.scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  buttonStyles: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});

export default Button;
