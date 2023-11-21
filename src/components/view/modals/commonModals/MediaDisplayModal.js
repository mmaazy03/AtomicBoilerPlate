import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import GestureRecognizer from 'react-native-swipe-gestures';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import Image from '@components/common/Image';

function MediaDisplayModal(props) {
  const {modalData} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    setModalVisible(!modalVisible);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) {
      setModalVisible(false);
    }
  }, [isBlur]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 10,
  };

  const closeModal = () => {
    setIsBlur(false);
  };

  const RenderMediaComponent = props => {
    const {item} = props;

    return (
      <>
        {item?.fileType === 'image' ? (
          <View style={[styles.imageView]}>
            <Image
              customImage={R.image.coachImage()}
              containerStyles={{width: '100%', height: '100%'}}
            />
          </View>
        ) : (
          <View style={[styles.videoView]}>
            {isPaused ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.playIcon}
                onPress={() => setIsPaused(false)}>
                <View style={styles.overlayColor} />
                <Icon
                  type={'Octicons'}
                  name={'play'}
                  color={R.color.primaryColor1}
                  size={35}
                  iconStyles={{zIndex: 99999}}
                />
                <Image
                  customImage={R.image.coachImage()}
                  containerStyles={styles.thumbNailImage}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setIsPaused(true)}
                activeOpacity={0.7}>
                <Video
                  source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
                  paused={isPaused}
                  repeat={false}
                  resizeMode={'cover'}
                  style={{width: '100%', height: '100%'}}
                  posterResizeMode={'stretch'}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </>
    );
  };

  return (
    <GestureRecognizer
      onSwipeDown={closeModal}
      config={config}
      style={styles.gestureContainer}>
      <Modal
        animationType={'slide'}
        visible={modalVisible}
        onShow={() => {
          setIsBlur(true);
        }}>
        <SafeAreaView style={styles.modalView}>
          <View style={styles.notch} />

          <TouchableOpacity
            style={styles.closeIcon}
            activeOpacity={0.6}
            onPress={closeModal}>
            <Icon
              type={'Ionicons'}
              name={'close'}
              color={R.color.white}
              size={20}
            />
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {modalData?.media?.map(item => {
              return <RenderMediaComponent item={item} />;
            })}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
  modalView: {
    backgroundColor: R.color.white,
    height: R.unit.height(1),
    alignItems: 'center',
  },
  notch: {
    height: R.unit.scale(4),
    width: R.unit.scale(50),
    backgroundColor: R.color.gray3,
    borderRadius: R.unit.scale(10),
    marginTop: R.unit.scale(8),
  },
  closeIcon: {
    alignSelf: 'flex-end',
    padding: R.unit.scale(8),
    backgroundColor: R.color.primaryColor1,
    borderRadius: R.unit.scale(39),
    position: 'absolute',
    zIndex: 999999,
    top: 70,
    right: 10,
  },

  imageView: {
    borderRadius: R.unit.scale(4),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray,
    width: R.unit.width(1),
    height: '100%',
  },
  videoView: {
    borderRadius: R.unit.scale(4),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.gray,
    width: R.unit.width(1),
    height: '100%',
  },
  playIcon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbNailImage: {
    width: '100%',
    height: '100%',
    zIndex: -1,
    position: 'absolute',
  },
  overlayColor: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: `rgba(0,0,0,0.4)`,
    width: '100%',
    height: '100%',
  },
});

export default MediaDisplayModal;
