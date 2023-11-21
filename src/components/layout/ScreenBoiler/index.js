import R from '@components/utils/R';
import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {useColorMode} from 'native-base';
import SubHeaderComponent from './subHeader';

export default function ScreenBoiler(props) {
  const {
    navigation,
    children,
    headerProps,
    isSubHeader = true,
    mainHeading,
    isBack,
    statusBarColor = R.color.white,
  } = props;

  const theme = useColorMode();
  const colorMode = theme?.colorMode;

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar
        style={{flex: 0}}
        backgroundColor={R.color.white}
        barStyle={
          Platform.OS === 'ios'
            ? colorMode === 'light'
              ? 'dark-content'
              : 'light-content'
            : Platform.OS === 'android'
            ? 'dark-content'
            : 'light-content'
        }
      />

      {isSubHeader && (
        <SubHeaderComponent
          navigation={navigation}
          mainHeading={mainHeading}
          headerProps={headerProps}
          isBack={isBack}
        />
      )}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: R.unit.width(1),
    backgroundColor: R.color.white,
    alignItems: 'center',
  },
});
