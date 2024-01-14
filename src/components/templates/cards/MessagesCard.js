import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import moment from 'moment';
import R from '@components/utils/R';
import Image from '@components/atoms/Image';
import Text from '@components/atoms/Text';

function MessagesCard(props) {
  const {colors} = useTheme();
  const {item, index, onPress, data} = props;

  const generalStyling = styles(colors);

  return (
    <TouchableNativeFeedback
      delayPressIn={0.1}
      delayPressOut={0.1}
      delayLongPress={0.1}
      onPress={() => onPress(item)}
      background={TouchableNativeFeedback.Ripple(R.color.gray, false, 300)}>
      <View style={styles.cardLayout}>
        <View
          style={[
            R.styles.twoItemsRow,
            {
              backgroundColor: item?.isSeen
                ? R.color.white
                : R.color.shadedPrimaryColor1,
              paddingVertical: R.unit.scale(10),
              paddingHorizontal: R.unit.scale(16),
            },
          ]}>
          <Image
            customImage={R.image.userPin()}
            containerStyles={generalStyling.profileImage}
          />

          <View style={generalStyling.chatText}>
            <Text
              variant={'body2'}
              font={'PoppinsSemiBold'}
              color={R.color.primaryColor1}
              numberOfLines={1}
              align={'left'}
              transform={'none'}>
              {item?.title}
            </Text>
            <View style={R.styles.rowView}>
              <Text
                variant={'body4'}
                font={'PoppinsRegular'}
                color={R.color.black}
                numberOfLines={1}
                style={{flex: 0.95}}
                align={'left'}
                transform={'none'}>
                {item?.lastMessage}
              </Text>
              <Text
                variant={'body4'}
                font={'PoppinsSemiBold'}
                color={R.color.black}
                align={'right'}
                transform={'none'}>
                {moment(item?.updatedAt).format('HH:mm')}
              </Text>
            </View>
          </View>
        </View>
        {index !== data?.length - 1 && <View style={styles.divider} />}
      </View>
    </TouchableNativeFeedback>
  );
}
export default MessagesCard;

const styles = colors => {
  console.log(colors, 'colors');
  return StyleSheet.create({
    cardLayout: {
      width: '100%',
      borderRadius: R.unit.scale(4),
    },
    profileImage: {
      width: R.unit.scale(55),
      height: R.unit.scale(55),
      borderRadius: R.unit.scale(55),
    },
    chatText: {
      marginLeft: R.unit.scale(5),
      flex: 1,
      backgroundColor: colors.background,
    },
    divider: {
      width: '100%',
      height: R.unit.scale(1),
      backgroundColor: R.color.inputFieldBordercolor,
      marginVertical: R.unit.scale(0),
    },
  });
};
