import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput as TextInputc,
  Platform,
  StyleSheet,
} from 'react-native';
import Text from './Text';
import Icon from './Icon';
import R from '@components/utils/R';
import {EyeHideIcon} from '@components/utils/Svg';

const TextInput = props => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeText = text => {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };
  const {
    placeholder,
    height = 50,
    color = R.color.black2,
    inputHeight = 0,
    width = '100%',
    inputContainerStyles,
    containerStyles,
    inputStyles,
    gutterTop = 0,
    gutterBottom = 0,
    borderWidth = 0,
    borderColor = R.color.inputFieldBordercolor,
    backgroundColor = R.color.gray,
    placeHolderColor = R.color.gray2,
    multiline = false,
    numberOfLines,
    formErrorText,
    errorMTop = 8,
    errorMBottom = 0,

    //RIFGHT
    rightIconName,
    rightIconType,
    rightIconColor,
    rightIconStyles,
    customRightIcon,

    //LEFT ICON
    leftIcon,
    leftIconType,
    iconColor = R.color.mainColor,
    eyeColor = R.color.gray3,
    leftIconStyles,
    customLeftIcon,

    // ? FUNCTIONALITY
    title,
    titleColor = R.color.gray2,
    secureText = false,
    forwardedRef = forwardedRef,
    onSubmitEditing,
    returnKeyType,
    blurOnSubmit,
    keyboardType, //number-pad, numeric, phone-pad,
    onFocus,
    onBlur,
    maxLength = 200,
    errorColor = R.color.inputFieldErrorMessageColor,
  } = props;

  return (
    <View
      style={[
        gutterTop >= 0 && {
          marginTop: gutterTop,
        },
        gutterBottom >= 0 && {
          marginBottom: gutterBottom,
        },
        containerStyles,
      ]}>
      {title && (
        <Text
          variant={'body3'}
          font={'PoppinsRegular'}
          color={titleColor}
          align={'left'}
          gutterBottom={5}
          transform={'none'}>
          {title}
        </Text>
      )}

      <View
        style={[
          styles.fieldSet,
          {
            width: width,
            borderColor:
              formErrorText?.length > 0
                ? R.color.inputFieldErrorMessageColor
                : borderColor,
            borderWidth: borderWidth,
          },
          height && {
            height: R.unit.scale(height),
          },
          backgroundColor && {
            backgroundColor: backgroundColor,
          },
          props.alignItems && {
            alignItems: props.alignItems,
          },
          inputContainerStyles,
        ]}>
        {leftIcon || customLeftIcon ? (
          <View>
            {customLeftIcon ? (
              {customLeftIcon}
            ) : (
              <Icon
                name={leftIcon}
                type={leftIconType}
                color={iconColor}
                size={R.unit.scale(18)}
                iconStyles={[
                  {
                    paddingLeft: leftIcon && R.unit.scale(10),
                  },
                  leftIconStyles,
                ]}
              />
            )}
          </View>
        ) : null}
        <TextInputc
          style={[
            {
              color: color,
            },
            styles.inputBox,

            inputHeight && {
              height: R.unit.scale(inputHeight),
            },
            props.disable && {
              color: R.color.gray,
            },
            multiline && {
              paddingTop: R.unit.scale(16, 0.5),
            },
            inputStyles,
          ]}
          maxLength={maxLength}
          secureTextEntry={secureText && !showPassword}
          onChangeText={e => handleChangeText(e)}
          value={props.value || props.defaultValue}
          placeholder={placeholder}
          placeholderTextColor={placeHolderColor}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines || 1}
          editable={props.disable ? false : true}
          keyboardShouldPersistTaps="always"
          returnKeyType={returnKeyType}
          ref={forwardedRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          textAlignVertical={numberOfLines > 1 ? 'top' : 'top'}
        />
        {rightIconName || customRightIcon ? (
          <View>
            {customRightIcon ? (
              {customRightIcon}
            ) : (
              <Icon
                name={rightIconName}
                type={rightIconType}
                color={rightIconColor}
                size={R.unit.scale(18)}
                iconStyles={[
                  {
                    paddingRight: rightIconName && R.unit.scale(34),
                  },
                  rightIconStyles,
                ]}
              />
            )}
          </View>
        ) : null}
        {secureText && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
            style={styles.eyeIconView}>
            {showPassword ? (
              <Icon
                name={'eye'}
                type={'Ionicons'}
                color={eyeColor}
                size={R.unit.scale(18)}
              />
            ) : (
              <EyeHideIcon />
            )}
          </TouchableOpacity>
        )}
      </View>
      {formErrorText?.length > 0 && (
        <Text
          variant={'body4'}
          font={'PoppinsItalic'}
          gutterTop={R.unit.scale(errorMTop)}
          gutterBottom={R.unit.scale(errorMBottom)}
          color={errorColor}
          align={'left'}
          transform={'none'}>
          {formErrorText}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  fieldSet: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(5),
  },
  inputBox: {
    paddingHorizontal: R.unit.scale(12, 0.3),
    paddingVertical: Platform.OS === 'ios' ? 0 : R.unit.scale(9, 0.3),
    fontSize: R.unit.scale(13),
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    flex: 1,
    bottom: Platform.OS === 'android' ? R.unit.scale(-4) : null,
  },
  eyeIconView: {
    paddingHorizontal: R.unit.width(0.04),
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TextInput;
