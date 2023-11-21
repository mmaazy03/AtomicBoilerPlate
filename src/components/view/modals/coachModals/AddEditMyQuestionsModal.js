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
import TextInput from '@components/common/TextInput';
import Button from '@components/common/Button';
import FormValidation from '@components/utils/FormValidation';
import PopUp from '@components/common/PopUp';

function AddEditMyQuestionModal(props) {
  const {isEdit, modalData, onSuccess} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [textError, setTextError] = useState('');
  const [isBlur, setIsBlur] = useState(false);

  useEffect(() => {
    setModalVisible(!modalVisible);
    if (isEdit) setText(modalData?.title);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) setModalVisible(false);
  }, [isBlur]);

  const closeModal = () => {
    setIsBlur(false);
    setText('');
  };

  const onSubmit = () => {
    try {
      const formError = FormValidation({text});
      if (formError) {
        formError?.arr[0];
        setTextError(formError?.arr[0]);
        throw 'validation failed';
      } else {
        onSuccess({isEdit: isEdit, text: text, ...modalData});
        closeModal();
      }
    } catch (error) {
      // setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType={'slide'}
      transparent={true}
      visible={modalVisible}
      //   visible={true}
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
                <Text
                  variant={'h4'}
                  font={'UbuntuMedium'}
                  gutterBottom={20}
                  color={R.color.black}
                  align={'left'}
                  transform={'none'}>
                  Add Question
                </Text>
                <TextInput
                  secureText={false}
                  placeholder={'Type Question here...'}
                  onChangeText={data => {
                    setText(data);
                  }}
                  color={R.color.black}
                  value={text}
                  gutterBottom={12}
                  width={'100%'}
                  alignItems={'center'}
                  formErrorText={textError}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Button
                value={'Cancel'}
                bgColor={R.color.white}
                width={'30%'}
                size={'lg'}
                color={R.color.black2}
                onPress={closeModal}
              />
              <Button
                value={'Submit'}
                bgColor={R.color.primaryColor1}
                width={'40%'}
                size={'lg'}
                color={R.color.white}
                borderColor={R.color.primaryColor1}
                disabled={text.length === 0}
                loaderColor={R.color.white}
                btnWrapperStyles={{marginLeft: R.unit.scale(20)}}
                onPress={onSubmit}
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
    minHeight: '60%',
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
    marginBottom: R.unit.height(0.1),
  },
  subContainer: {
    width: '100%',
    paddingHorizontal: R.unit.scale(16),
  },
  footer: {
    width: '100%',
    borderTopWidth: R.unit.scale(0.75),
    borderTopColor: R.color.gray2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: R.unit.scale(16),
  },
});

export default AddEditMyQuestionModal;
