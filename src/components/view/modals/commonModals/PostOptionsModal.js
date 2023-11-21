import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import PopUp from '@components/common/PopUp';
import navigationRef from '@navRef';

function PostOptionsModal(props) {
  const {modalData} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const closeModal = () => {
    setIsBlur(false);
  };

  const onSubmit = isEdit => {
    if (isEdit) {
      navigationRef.navigate('EditPost', {item: modalData});
    } else {
    }
    setIsBlur(false);
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      // visible={true}
      onRequestClose={closeModal}
      onShow={() => {
        setIsBlur(true);
      }}>
      <View style={styles.centeredView}>
        <TouchableOpacity
          onPress={closeModal}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></TouchableOpacity>
        <>
          <SafeAreaView style={styles.modalView}>
            <View style={styles.contentContainer}>
              <View style={styles.notch} />

              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.6}
                onPress={closeModal}>
                <Icon
                  type={'Ionicons'}
                  name={'close'}
                  color={R.color.blackShade4}
                  size={20}
                />
              </TouchableOpacity>

              <View style={styles.subContainer}>
                <TouchableOpacity
                  style={R.styles.twoItemsRow}
                  onPress={() => onSubmit(false)}>
                  <Icon
                    type={'Fontisto'}
                    name={'favorite'}
                    color={R.color.primaryColor1}
                    size={30}
                  />
                  <View style={styles.favRow}>
                    <Text
                      variant={'body2'}
                      font={'PoppinsRegular'}
                      color={R.color.black}
                      align={'left'}
                      transform={'none'}>
                      Fav this post
                    </Text>
                    <Text
                      variant={'body3'}
                      font={'PoppinsRegular'}
                      color={R.color.black}
                      align={'left'}
                      transform={'none'}>
                      Add this post to your favorites list
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={R.styles.twoItemsRow}
                  onPress={() => onSubmit(true)}>
                  <Icon
                    type={'FontAwesome'}
                    name={'edit'}
                    color={R.color.primaryColor1}
                    size={25}
                  />
                  <View style={styles.editRow}>
                    <Text
                      variant={'body2'}
                      font={'PoppinsRegular'}
                      color={R.color.black}
                      align={'left'}
                      transform={'none'}>
                      Edit this post
                    </Text>
                    <Text
                      variant={'body3'}
                      font={'PoppinsRegular'}
                      color={R.color.black}
                      align={'left'}
                      transform={'none'}>
                      Edit this post
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
  },
  notch: {
    height: R.unit.scale(4),
    width: R.unit.scale(50),
    backgroundColor: R.color.gray3,
    borderRadius: R.unit.scale(10),
    marginTop: R.unit.scale(8),
  },
  closeButton: {
    padding: R.unit.scale(5),
    alignSelf: 'flex-start',
    padding: R.unit.scale(16),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: R.unit.scale(20),
  },
  subContainer: {
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
    rowGap: R.unit.scale(30),
  },
  favRow: {flex: 1, marginLeft: R.unit.scale(4)},
  editRow: {flex: 1, marginLeft: R.unit.scale(10)},
});

export default PostOptionsModal;
