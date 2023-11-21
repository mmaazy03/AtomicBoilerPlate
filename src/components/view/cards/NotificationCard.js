import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import moment from 'moment';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Image from '@components/common/Image';
import {useNotificationSeenMutation} from '@store/services';

function NotificationCard(props) {
  const {item} = props;

  const [notificationSeen] = useNotificationSeenMutation();

  const seenNotification = () => {
    // notificationSeen()
    //   .unwrap()
    //   .then(res => {})
    //   .catch(err => {});
  };

  return (
    <TouchableOpacity
      style={[R.styles.twoItemsRow, R.styles.boxShadow, styles.cardLayout]}
      onPress={seenNotification}
      activeOpacity={0.7}>
      <Image
        customImage={R.image.coachImage()}
        containerStyles={styles.image}
      />
      <View style={styles.detailsView}>
        <View style={[R.styles.twoItemsRow, styles.notiTitle]}>
          <Text
            variant={'body3'}
            font={'PoppinsSemiBold'}
            color={R.color.primaryColor1}
            transform={'capitalize'}>
            John Doe{' '}
          </Text>
          <Text
            variant={'body3'}
            color={R.color.black}
            font={'PoppinsSemiBold'}
            transform={'none'}>
            sent a message
          </Text>
        </View>
        <Text
          variant={'body4'}
          font={'PoppinsRegular'}
          color={R.color.black2}
          align={'left'}
          transform={'capitalize'}>
          With 5 years of experience helping people like you, I am a fitness
          professional...
        </Text>
        <Text
          variant={'body5'}
          font={'PoppinsLight'}
          gutterTop={5}
          color={R.color.black2}
          align={'right'}
          transform={'capitalize'}>
          {moment().fromNow()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export default NotificationCard;

const styles = StyleSheet.create({
  cardLayout: {
    backgroundColor: R.color.white,
    borderRadius: R.unit.scale(8),
    paddingHorizontal: R.unit.scale(5),
    paddingVertical: R.unit.scale(8),
  },
  image: {
    height: R.unit.scale(60),
    width: R.unit.scale(60),
    borderRadius: R.unit.scale(30),
  },
  detailsView: {
    marginLeft: R.unit.scale(6),
    flex: 1,
  },
  notiTitle: {
    columnGap: 0,
  },
});
