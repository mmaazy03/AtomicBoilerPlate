import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import R from '@components/utils/R';
import Icon from './Icon';
import {Dropdown} from 'react-native-element-dropdown';

const DropDown = props => {
  const {
    placeholder = 'Select Category',
    formError,
    gutterTop = 0,
    gutterBottom = 0,
    errorMTop = 8,
    errorMBottom = 0,
    bgColor = R.color.white,
    borderColor = R.color.inputFieldBordercolor,
    height = 50,
    maxHeight = 200,
    width = '100%',
    containerStyles,
    inputContainerStyles,
    inputFieldStyles,
    color = R.color.black,
    placeholderColor = R.color.white,
    title,
    titleColor = R.color.white,
    //FUNCTIONS
    arrayData,
    value,
    defaultValue,
    disabled = false,
    search = false,
    loaderParentCall,
    schemaLabel = 'title',
    schemaValue = 'title',
    rightIconColor = R.color.white,
    activeColor = R.color.white,
  } = props;

  const [items, setItems] = useState(arrayData);
  const [selectedValue, setSelectedValue] = useState(value);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setItems(arrayData);
    setSelectedValue(value);
  }, [arrayData, value, defaultValue]);

  const displayList = props => {
    return (
      <View
        style={{
          padding: R.unit.scale(15),
        }}>
        <Text
          variant={'body3'}
          font={'PoppinsRegular'}
          color={R.color.black}
          align={'left'}
          transform={'none'}>
          {props[schemaLabel]}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[
        gutterTop >= 0 && {
          marginTop: gutterTop,
        },
        gutterBottom >= 0 && {
          marginBottom: gutterBottom,
        },
        {width: width},
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
      <Dropdown
        style={[
          styles.inputFieldLayout,
          {
            backgroundColor: bgColor,
          },
          borderColor && {
            borderColor: formError ? R.color.red : borderColor,
          },
          width && {
            width: width,
          },
          height && {
            height: R.unit.scale(50),
          },
          inputContainerStyles,
        ]}
        disable={disabled}
        containerStyle={styles.dropDownContainer}
        inputSearchStyle={{color: R.color.black}}
        activeColor={activeColor}
        selectedTextStyle={[
          styles.inputFieldText,
          {
            color: disabled ? R.color.gray : color,
          },
          inputFieldStyles,
        ]}
        placeholderStyle={{...styles.placeholderStyle, color: placeholderColor}}
        renderItem={displayList}
        data={items}
        search={search}
        maxHeight={R.unit.scale(maxHeight)}
        ListEmptyComponent={() => {
          return <View style={{height: R.unit.scale(300)}}></View>;
        }}
        labelField={schemaLabel}
        valueField={schemaValue}
        placeholder={placeholder}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        showsVerticalScrollIndicator={false}
        onChange={item => {
          setIsFocus(false);
          loaderParentCall(item);
        }}
        renderRightIcon={() => {
          return (
            <Icon
              name={!isFocus ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
              type={'MaterialIcons'}
              size={20}
              color={rightIconColor}
            />
          );
        }}
      />

      {formError?.length > 0 && (
        <Text
          variant={'body4'}
          font={'italic'}
          gutterTop={R.unit.scale(errorMTop)}
          gutterBottom={R.unit.scale(errorMBottom)}
          color={'red'}
          align={'left'}
          transform={'none'}>
          {formError}
        </Text>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  inputFieldLayout: {
    paddingVertical: R.unit.scale(22),
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(5),
    borderColor: R.color.white,
    paddingHorizontal: R.unit.scale(2, 0.6),
    // flex: 1,
  },
  inputFieldText: {
    color: R.color.white,
    paddingHorizontal: R.unit.scale(7, 0.3),
    fontFamily: 'Poppins-Medium',
    fontSize: R.unit.scale(14, 0.3),
    flex: 1,
  },
  dropDownContainer: {
    backgroundColor: R.color.white,
    color: R.color.black,
  },
  rowTextStyle: {
    color: R.color.mainColor,
    fontSize: R.unit.scale(12),
    fontFamily: 'Poppins-Regular',
  },
  iconView: {
    width: R.unit.tabSizeCalc(30, 50),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  placeholderStyle: {
    paddingHorizontal: R.unit.scale(7),
    fontSize: R.unit.scale(14, 0.3),
  },
});
