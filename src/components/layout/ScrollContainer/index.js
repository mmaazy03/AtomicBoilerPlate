import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import R from '@components/utils/R';

function ScrollContainer(props) {
  const {
    contentContainerStyles,
    containerStyles,
    children,
    keyboardShouldPersistTaps = 'always',
    paddingBottom = 0,
    height = '80%',
    nestedScrollEnabled,
  } = props;

  return (
    <ScrollView
      style={[styles.mainLayout, containerStyles, {height: height}]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={nestedScrollEnabled}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      contentContainerStyle={[
        styles.contentContainer,
        contentContainerStyles,
        {paddingBottom: R.unit.scale(paddingBottom)},
      ]}>
      {children}
    </ScrollView>
  );
}
export default ScrollContainer;

const styles = StyleSheet.create({
  mainLayout: {
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
});
