import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {useDisclose, Stagger as StaggerC} from 'native-base';
import Icon from './Icon';
import R from '@components/utils/R';

const Stagger = props => {
  const {isOpen, onToggle} = useDisclose();

  const onTrigger = data => {
    onToggle();
    props.onPress(data);
  };
  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.optionsView}>
          <StaggerC
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: 'spring',
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}>
            <TouchableOpacity
              style={styles.singleIcon}
              onPress={() => onTrigger('single')}
              activeOpacity={0.8}>
              <Icon
                name={'person'}
                type={'Ionicons'}
                size={15}
                color={R.color.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.singleIcon,
                backgroundColor: R.color.primaryColor1,
              }}
              onPress={() => onTrigger('group')}
              activeOpacity={0.8}>
              <Icon
                name={'account-group'}
                type={'MaterialCommunityIcons'}
                size={18}
                color={R.color.white}
              />
            </TouchableOpacity>
          </StaggerC>
        </View>
      )}

      <TouchableOpacity
        onPress={onToggle}
        style={styles.addButton}
        activeOpacity={0.9}>
        <Icon type={'Ionicons'} name={'add'} color={R.color.white} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default Stagger;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 9999,
    bottom:
      Platform.OS === 'ios'
        ? R.unit.height(R.unit.responsiveSize(0.12, 0.2, 1000))
        : R.unit.height(R.unit.responsiveSize(0.12, 0.04, 1000)),
    right: 20,
    width: R.unit.scale(70),
    overflow: 'hidden',
    paddingRight: R.unit.scale(5),
    paddingVertical: R.unit.scale(10),
  },
  optionsView: {
    width: '100%',
    alignSelf: 'center',
    rowGap: 10,
    marginBottom: R.unit.scale(10),
  },
  addButton: {
    backgroundColor: R.color.primaryColor1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    height: R.unit.scale(50),
    width: R.unit.scale(49),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    borderRadius: R.unit.scale(50),
  },
  singleIcon: {
    backgroundColor: R.color.primaryColor2,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    height: R.unit.scale(50),
    width: R.unit.scale(49),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    borderRadius: R.unit.scale(50),
  },
});
