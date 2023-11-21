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
import Button from '@components/common/Button';

function InfoModal(props) {
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
              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.6}
                onPress={closeModal}>
                <Icon
                  type={'Ionicons'}
                  name={'close'}
                  color={R.color.white}
                  size={20}
                />
              </TouchableOpacity>

              <View style={styles.subContainer}>
                <Text
                  variant={'h4'}
                  font={'UbuntuMedium'}
                  gutterBottom={20}
                  color={R.color.black}
                  align={'left'}
                  transform={'none'}>
                  {modalData?.title}
                </Text>
                <Text
                  variant={'body'}
                  font={'UbuntuMedium'}
                  gutterBottom={20}
                  color={R.color.black}
                  align={'left'}
                  transform={'none'}>
                  {modalData?.description}
                </Text>
              </View>
              <Button
                value="Ok"
                bgColor={R.color.primaryColor1}
                width={'45%'}
                size={'bsm'}
                color={R.color.white}
                rippleColor={R.color.shadedPrimaryColor1}
                loaderColor={R.color.white}
                btnWrapperStyles={{alignSelf: 'flex-start'}}
                onPress={closeModal}
              />
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(16),
  },
  modalView: {
    backgroundColor: R.color.white,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: R.unit.scale(10),
    paddingVertical: R.unit.scale(10),
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: R.unit.scale(8),
    backgroundColor: R.color.primaryColor1,
    borderRadius: R.unit.scale(39),
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: R.unit.scale(12),
  },
  subContainer: {
    width: '100%',
    paddingBottom: R.unit.scale(16),
  },
});

export default InfoModal;
