import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import R from '@components/utils/R';
import Text from '@components/common/Text';
import Icon from '@components/common/Icon';
import EmptyListError from './EmptyListError';
import Loader from './Loader';

function Tags(props) {
  const {
    data,
    onPress,
    containerStyles,
    contentContainerStyles,
    emptyListHeading = 'No employee found',
    emptyListText,
    isLoading,
    key = 'title',
    isTraining = false,
  } = props;

  return (
    <>
      {isLoading ? (
        <View
          style={{
            height: R.unit.height(0.4),
          }}>
          <Loader iosLoader color={R.color.mainColor} size={30} />
        </View>
      ) : data?.length === 0 ? (
        <View style={styles.emptyListView}>
          <EmptyListError heading={emptyListHeading} text={emptyListText} />
        </View>
      ) : (
        <ScrollView
          style={[
            {height: Platform.OS === 'ios' ? '50%' : '55%'},
            containerStyles,
          ]}
          contentContainerStyle={[
            styles.nameTagsContainer,
            contentContainerStyles,
          ]}>
          {data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => onPress(item)}
                style={[
                  R.styles.twoItemsRow,
                  styles.nameTag,
                  {
                    backgroundColor: item?.isChecked
                      ? R.color.primaryColor1
                      : R.color.gray2,
                    borderColor: item?.isChecked
                      ? R.color.primaryColor1
                      : R.color.black,
                  },
                ]}>
                <Text
                  variant={'body3'}
                  font={'PoppinsRegular'}
                  color={item?.isChecked ? R.color.white : R.color.black}
                  align={'left'}
                  transform={'none'}>
                  {item[key]}
                </Text>

                <Icon
                  name={item?.isChecked ? 'close' : 'add'}
                  type={'Ionicons'}
                  size={20}
                  color={item?.isChecked ? R.color.white : R.color.black}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </>
  );
}
export default Tags;

const styles = StyleSheet.create({
  nameTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: R.unit.scale(10),
    rowGap: R.unit.scale(10),
    width: '100%',
  },
  nameTag: {
    borderWidth: R.unit.scale(1),
    borderRadius: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(10),
    paddingVertical: R.unit.scale(5),
  },
  emptyListView: {
    height: '40%',
    justifyContent: 'center',
  },
});
