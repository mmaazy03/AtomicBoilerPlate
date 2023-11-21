import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import R from '@components/utils/R';
import Image from '@components/common/Image';
import Text from '@components/common/Text';
import moment from 'moment';

function MessagesCard(props) {
  const {item, index, onPress, data} = props;

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
            containerStyles={styles.profileImage}
          />

          <View style={styles.chatText}>
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

const styles = StyleSheet.create({
  cardLayout: {
    width: '100%',
    borderRadius: R.unit.scale(4),
    backgroundColor: R.color.white,
  },
  profileImage: {
    width: R.unit.scale(55),
    height: R.unit.scale(55),
    borderRadius: R.unit.scale(55),
  },
  chatText: {
    marginLeft: R.unit.scale(5),
    flex: 1,
  },
  divider: {
    width: '100%',
    height: R.unit.scale(1),
    backgroundColor: R.color.inputFieldBordercolor,
    marginVertical: R.unit.scale(0),
  },
});
