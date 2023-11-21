import React, {useEffect, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import GestureRecognizer from 'react-native-swipe-gestures';
import Text from '@components/common/Text';
import R from '@components/utils/R';
import Icon from '@components/common/Icon';
import TextInput from '@components/common/TextInput';
import FormScrollContainer from '@components/layout/FormScrollContainer';
import Image from '@components/common/Image';
import ScrollContainer from '@components/layout/ScrollContainer';

function CommentOnPostModal(props) {
  const {modalData} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [isBlur, setIsBlur] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentReply, setCommentReply] = useState(undefined);
  const [isEditComment, setIsEditComment] = useState(undefined);

  useEffect(() => {
    setModalVisible(!modalVisible);
    setComments(modalData?.comments?.length > 0 ? modalData?.comments : []);
  }, [props.isVisibleModal]);

  useEffect(() => {
    if (!isBlur) {
      setModalVisible(false);
      clearCommentReply();
    }
  }, [isBlur]);

  const onComment = () => {
    if (isEditComment) {
      const commentId = isEditComment?._id;
      const objectFound = comments?.find(({_id}) => _id === commentId);
      objectFound.comment = comment;

      setComments([...comments]);
    } else {
      if (commentReply) {
        const commentId = commentReply?._id;
        const objectFound = comments?.find(({_id}) => _id === commentId);
        objectFound.subComments.push({
          _id: uuid.v4(),
          postId: modalData?._id,
          commentId: commentId,
          comment: comment,
          user: {
            userId: '1234',
            name: 'John Test Doe',
            picture: R.image.coachImage(),
          },
          subComments: [],
        });
        setComments([...comments]);
        clearCommentReply();
      } else {
        setComments(prevState => [
          ...prevState,
          {
            _id: uuid.v4(),
            postId: modalData?._id,
            comment: comment,
            user: {
              userId: '1234',
              name: 'John Doe',
              picture: R.image.coachImage(),
            },
            subComments: [],
          },
        ]);
      }
    }

    setComment('');
  };

  const addCommentReply = data => {
    setCommentReply(data);
    setComment(data?.user?.name + ' ');
  };

  const clearCommentReply = () => {
    setComment('');
    setCommentReply(undefined);
    setIsEditComment(undefined);
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 10,
  };

  const editCommentReply = data => {
    setIsEditComment(data);
    setComment(data?.comment);
  };

  return (
    <GestureRecognizer
      onSwipeDown={() => setIsBlur(false)}
      config={config}
      style={styles.gestureContainer}>
      <Modal
        animationType={'slide'}
        transparent={true}
        visible={modalVisible}
        onShow={() => {
          setIsBlur(true);
        }}>
        <FormScrollContainer paddingBottom={0}>
          <SafeAreaView style={styles.modalView}>
            <View style={styles.notch} />
            <ScrollContainer
              nestedScrollEnabled={true}
              containerStyles={styles.subContainer}
              paddingBottom={30}
              contentContainerStyles={{
                rowGap: R.unit.scale(10),
              }}>
              {comments?.map(item => {
                return (
                  <View>
                    <View style={[R.styles.twoItemsRow, styles.commentRow]}>
                      <Image
                        customImage={R.image.coachImage()}
                        containerStyles={styles.image}
                      />
                      <View style={styles.commentMainRow}>
                        <View style={styles.commentTextRow}>
                          <Text
                            variant={'body2'}
                            font={'PoppinsRegular'}
                            color={R.color.black2}
                            align={'left'}
                            transform={'none'}>
                            {item?.user?.name}
                          </Text>
                          <Text
                            variant={'body3'}
                            font={'PoppinsRegular'}
                            color={R.color.black2}
                            align={'left'}
                            transform={'none'}>
                            {item?.comment}
                          </Text>
                        </View>
                        <View style={R.styles.twoItemsRow}>
                          <TouchableOpacity
                            activeOpacity={0.4}
                            style={styles.replyButton}
                            onPress={() => editCommentReply(item)}>
                            <Text
                              variant={'body4'}
                              font={'PoppinsSemiBold'}
                              color={R.color.black2}
                              align={'left'}
                              transform={'none'}>
                              Edit
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            activeOpacity={0.4}
                            style={styles.replyButton}
                            onPress={() => addCommentReply(item)}>
                            <Text
                              variant={'body4'}
                              font={'PoppinsSemiBold'}
                              color={R.color.black2}
                              align={'left'}
                              transform={'none'}>
                              Reply
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {/* SUB COMMENT ROW */}
                    {item?.subComments?.length > 0 && (
                      <>
                        {item?.subComments?.map(item => {
                          return (
                            <View
                              style={[
                                R.styles.twoItemsRow,
                                styles.subCommentRow,
                              ]}>
                              <Image
                                customImage={R.image.coachImage()}
                                containerStyles={styles.image}
                              />
                              <View
                                style={[
                                  styles.commentTextRow,
                                  styles.subCommentTextRow,
                                ]}>
                                <Text
                                  variant={'body2'}
                                  font={'PoppinsRegular'}
                                  color={R.color.black2}
                                  align={'left'}
                                  transform={'none'}>
                                  {item?.user?.name}
                                </Text>
                                <Text
                                  variant={'body3'}
                                  font={'PoppinsRegular'}
                                  color={R.color.black2}
                                  align={'left'}
                                  transform={'none'}>
                                  {item?.comment}
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </>
                    )}
                  </View>
                );
              })}
            </ScrollContainer>

            <View style={styles.footer}>
              {commentReply && (
                <View style={R.styles.twoItemsRow}>
                  <Text
                    variant={'body5'}
                    font={'PoppinsItalic'}
                    color={R.color.black1}
                    align={'left'}
                    style={{fontWeight: '600'}}
                    transform={'none'}>
                    Reply to {commentReply?.user?.name}
                  </Text>
                  <View style={styles.dot} />
                  <TouchableOpacity onPress={clearCommentReply}>
                    <Text
                      variant={'body5'}
                      font={'PoppinsItalic'}
                      color={R.color.black2}
                      align={'left'}
                      style={{fontWeight: 'bold'}}
                      transform={'none'}>
                      Cancel{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.textInputView}>
                <TextInput
                  secureText={false}
                  placeholder={'Write a comment...'}
                  onChangeText={data => {
                    setComment(data);
                  }}
                  color={R.color.black}
                  value={comment}
                  containerStyles={{flex: 1}}
                />
                <TouchableOpacity
                  onPress={onComment}
                  activeOpacity={0.5}
                  disabled={comment?.length === 0}>
                  <Icon
                    type={'MaterialCommunityIcons'}
                    name={'send'}
                    color={
                      comment?.length === 0
                        ? R.color.gray2
                        : R.color.primaryColor1
                    }
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </FormScrollContainer>
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
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: R.unit.height(1),
  },
  notch: {
    height: R.unit.scale(4),
    width: R.unit.scale(50),
    backgroundColor: R.color.gray3,
    borderRadius: R.unit.scale(10),
    marginTop: R.unit.scale(8),
  },
  image: {
    height: R.unit.scale(40),
    width: R.unit.scale(40),
    borderRadius: R.unit.scale(40),
  },
  commentMainRow: {
    flex: 1,
  },
  commentRow: {
    marginBottom: R.unit.scale(6),
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  commentTextRow: {
    backgroundColor: R.color.gray,
    paddingHorizontal: R.unit.scale(10),
    paddingVertical: R.unit.scale(8),
    borderRadius: R.unit.scale(13),
    alignSelf: 'flex-start',
  },
  subCommentTextRow: {
    flex: 1,
  },
  closeButton: {
    padding: R.unit.scale(5),
    alignSelf: 'flex-start',
    padding: R.unit.scale(16),
  },
  subContainer: {
    width: '100%',
    paddingHorizontal: R.unit.scale(8),
    paddingTop: R.unit.scale(10),
    // flex: 1,
    height: '70%',
  },

  replyButton: {
    marginLeft: R.unit.scale(10),
    alignSelf: 'flex-start',
  },
  subCommentRow: {
    marginBottom: R.unit.scale(6),
    width: '84%',
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
  },
  footer: {
    width: '100%',
    borderTopWidth: R.unit.scale(0.75),
    borderTopColor: R.color.gray2,
    padding: R.unit.scale(10),
  },
  dot: {
    height: R.unit.scale(4),
    width: R.unit.scale(4),
    backgroundColor: R.color.black2,
    borderRadius: R.unit.scale(4),
  },
  textInputView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: R.unit.scale(10),
    marginTop: R.unit.scale(6),
  },
});

export default CommentOnPostModal;
