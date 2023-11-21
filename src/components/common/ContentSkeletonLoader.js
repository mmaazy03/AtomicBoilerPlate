import React from 'react';
import {View} from 'react-native';
import R from '@components/utils/R';
import {Skeleton} from 'native-base';

function ContentSkeletonLoader({length = 8}) {
  return (
    <View style={{marginTop: R.unit.scale(10), rowGap: R.unit.scale(5)}}>
      <Skeleton h="40" startColor={'gray.100'} endColor={'gray.200'} w={160} />
      <Skeleton.Text
        startColor={'text.100'}
        endColor={'text.200'}
        w={160}
        style={{marginTop: 10}}
      />
    </View>
  );
}

export default ContentSkeletonLoader;
