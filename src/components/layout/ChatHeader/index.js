import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Image from '@components/common/Image';
import navigationRef from '@navRef';

function ChatHeader(props) {
  const {name, imageSource, isGroupChat} = props;

  return (
    <View style={[styles.header, R.styles.twoItemsRow]}>
      <TouchableOpacity
        onPress={() => navigationRef.goBack()}
        activeOpacity={0.9}
        style={styles.backIcon}>
        <Icon
          type={'MaterialIcons'}
          name={'keyboard-arrow-left'}
          color={R.color.primaryColor1}
          size={30}
        />
      </TouchableOpacity>
      <View style={styles.profileImage}>
        {isGroupChat ? (
          <Icon
            name="group"
            type="FontAwesome"
            size={40}
            color={R.color.white}
          />
        ) : (
          <Image customImage={R.image.userPin()} resizeMode={'cover'} />
        )}
      </View>
      <Text
        variant={'body1'}
        font={'PoppinsSemiBold'}
        color={R.color.white}
        align={'left'}
        numberOfLines={2}
        style={{
          marginLeft: R.unit.scale(5),
          maxWidth: '70%',
        }}
        transform={'none'}>
        {name}
      </Text>
    </View>
  );
}
export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: R.unit.scale(12),
    paddingVertical: R.unit.scale(12),
    backgroundColor: R.color.primaryColor1,
  },
  profileImage: {
    width: R.unit.scale(55),
    height: R.unit.scale(55),
    borderRadius: R.unit.scale(10),
    marginLeft: R.unit.scale(20),
    justifyContent: 'center',
  },
  backIcon: {
    backgroundColor: R.color.white,
    height: R.unit.scale(30),
    width: R.unit.scale(30),
    borderRadius: R.unit.scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
