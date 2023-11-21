import R from '@components/utils/R';
import {Toast} from 'native-base';
import {StyleSheet, View} from 'react-native';
import Icon from './Icon';
import Text from './Text';

const PopUp = props => {
  const {
    heading = 'Oops! Something went wrong',
    type = 'success',
    visibilityTime = 3000,
    variant = 'top-accent', // solid, subtle, left-accent, top-accent
    placement = 'top',
  } = props;

  const popUpTypes = {
    danger: {
      bgColor: 'rgba(249, 55, 73,0.05)',
      textColor: 'rgba(249, 55, 73,0.8)',
      icon: 'close',
    },
    success: {
      bgColor: 'rgba(75, 181, 67,0.05)',
      textColor: 'rgba(75, 181, 67,0.8)',
      icon: 'md-checkmark',
    },
    info: {
      bgColor: 'rgba(255, 204, 0,0.05)',
      textColor: 'rgba(255, 204, 0,0.8)',
      icon: 'alert',
    },
  };

  Toast.show({
    title: heading,
    duration: visibilityTime,
    variant: variant,
    placement: placement,
    render: () => {
      return (
        <View style={styles.popUpContainer}>
          <View
            style={{
              backgroundColor: popUpTypes[type].textColor,
              ...styles.highlightedTab,
            }}
          />
          <View
            style={{
              ...R.styles.rowView,
              backgroundColor: popUpTypes[type].bgColor,
              ...styles.textView,
            }}>
            <View
              style={{
                backgroundColor: popUpTypes[type].textColor,
                ...styles.iconView,
              }}>
              <Icon
                type={'Ionicons'}
                name={popUpTypes[type].icon}
                color={R.color.white}
                size={15}
              />
            </View>
            <Text
              variant={'body4'}
              font={'PoppinsRegular'}
              color={popUpTypes[type].textColor}
              align={'left'}
              numberOfLines={5}
              style={{marginLeft: R.unit.scale(8), width: '80%'}}
              transform={'none'}>
              {heading}
            </Text>
          </View>
        </View>
      );
    },
  });
};

export default PopUp;

const styles = StyleSheet.create({
  popUpContainer: {
    width: R.unit.width(0.8),
    borderRadius: R.unit.scale(8),
    shadowColor: R.color.blackShade3,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: R.unit.scale(10),
    backgroundColor: R.color.white,
    overflow: 'hidden',
    // paddingVertical: 20,
  },
  highlightedTab: {
    width: '5%',
    height: '100%',
  },
  textView: {
    height: '100%',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: R.unit.scale(5),
    paddingVertical: R.unit.scale(15),
  },
  iconView: {
    borderRadius: R.unit.scale(80),
    paddingHorizontal: R.unit.scale(4),
    paddingVertical: R.unit.scale(3),
  },
});
