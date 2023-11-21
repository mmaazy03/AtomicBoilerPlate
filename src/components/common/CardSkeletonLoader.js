import React from 'react';
import {StyleSheet, View} from 'react-native';
import R from '@components/utils/R';
import {Skeleton} from 'native-base';

function CardSkeletonLoader() {
  return (
    <View style={styles.mainLayout}>
      <View style={R.styles.twoItemsRow}>
        <Skeleton
          startColor={'gray.100'}
          endColor={'gray.200'}
          h={'16'}
          w={'16'}
          style={{borderRadius: R.unit.scale(40)}}
        />
        <View style={{rowGap: 10, marginLeft: R.unit.scale(10)}}>
          <Skeleton
            startColor={'gray.100'}
            endColor={'gray.200'}
            w={230}
            h={2}
            style={{borderRadius: 10}}
          />
          <Skeleton
            startColor={'gray.100'}
            endColor={'gray.200'}
            w={230}
            h={2}
            style={{borderRadius: 10}}
          />
          <Skeleton
            startColor={'gray.100'}
            endColor={'gray.200'}
            w={230}
            h={2}
            style={{borderRadius: 10}}
          />
        </View>
      </View>
    </View>
  );
}

export default CardSkeletonLoader;

const styles = StyleSheet.create({
  mainLayout: {
    marginTop: R.unit.scale(10),
    rowGap: R.unit.scale(5),
    flexDirection: 'row',
    backgroundColor: R.color.white,
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray,
    width: '95%',
    padding: R.unit.scale(10),
    borderRadius: R.unit.scale(10),
    alignSelf: 'center',
  },
});
