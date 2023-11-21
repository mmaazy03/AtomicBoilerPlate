import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import R from '@components/utils/R';
import Image from '@components/atoms/Image';
import Text from '@components/atoms/Text';
import moment from 'moment';
import FlatList from '@components/organisms/FlatList';
import ChatHeader from '@components/templates/ChatHeader';
import ChatFooter from '@components/templates/ChatFooter';

function ChatScreen(props) {
  const {navigation} = props;
  // const {item} = props.route.params;
  const flatListRef = useRef();
  const user = useSelector(state => state.user.user);
  const socket = useSelector(state => state.socket.socketRef);
  // const chatType = item?.type;
  const userId = '456';
  // const roomId = item?._id;
  const [page, setPage] = useState(1);
  // const {data, isLoading, isFetching} = useGetRoomMessagesQuery(
  //   {roomId: item?._id, page: page},
  //   {
  //     refetchOnMountOrArgChange: true,
  //   },
  // );
  // const [refreshUserChats] = useRefreshUserChatsMutation();

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([
    {
      _id: uuid.v4(),
      message: {
        user: {id: '123', photo: R.image.userPin()},
        text: 'Metro boomin',
      },
    },
    {
      _id: uuid.v4(),
      message: {user: {id: '123', photo: R.image.userPin()}, text: '21 savage'},
    },
  ]);
  const [chatWith, setChatWith] = useState(undefined);

  useEffect(() => {
    // if (socket !== null) {
    //   socket.emit('chatJoin', {
    //     id: userId,
    //     roomId: roomId,
    //   });
    //   socket.emit('mark-as-read', {
    //     id: userId,
    //     roomId: roomId,
    //   });
    // }
    // socket.on('msg', (msg, roomID) => {
    //   if (roomId === roomID) {
    //     setMessages(chats => [...chats, msg]);
    //     refreshUserChats();
    //   }
    // });
    // return () => {
    //   socket.off('msg');
    // };
  }, []);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarVisible: false,
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarVisible: true,
      });
  }, [navigation]);

  const sendChat = () => {
    const message = {
      text: text,
      user: {
        id: '456',
        firstName: '21 savage',
        lastName: 'poppin',
        photo: R.image.userPin(),
      },
    };
    const payload = {
      message: message,
      roomId: '120',
      from: '120',
    };
    setMessages(prevState => [...prevState, payload]);
    // socket.emit('msg', payload);
    if (flatListRef) {
      flatListRef?.current?.scrollToEnd({animated: true});
    }
    // refreshUserChats();
  };

  const _renderList = ({item}) => {
    const messageType = item?.message?.user?.id !== userId ? 'from' : 'to';
    return (
      <View style={styles.formView}>
        <View
          style={[
            styles.messageRow,
            {
              justifyContent: messageType === 'to' ? 'flex-end' : 'flex-start',
            },
          ]}>
          {messageType === 'from' && (
            <View style={styles.userAvatar}>
              <Image
                // imageSource={item?.message?.user?.photo}
                customImage={R.image.userPin()}
                resizeMode={'contain'}
              />
              <View style={styles.onlineStatus} />
            </View>
          )}

          <View
            style={[
              styles.messageBox,
              {
                borderBottomRightRadius: R.unit.scale(
                  messageType === 'to' ? 0 : 10,
                ),
                borderBottomLeftRadius: R.unit.scale(
                  messageType === 'to' ? 10 : 0,
                ),
                backgroundColor:
                  messageType === 'to' ? R.color.primaryColor3 : R.color.black2,
                marginLeft: R.unit.scale(messageType === 'to' ? 0 : 5),
                marginRight: R.unit.scale(messageType === 'to' ? 5 : 0),
                width: '50%',
              },
            ]}>
            <Text
              variant={'body3'}
              font={'PoppinsRegular'}
              color={R.color.blackShade2}
              align={messageType == 'to' ? 'left' : null}
              transform={'none'}>
              {item?.message?.text}
            </Text>
            <Text
              variant={'body5'}
              font={'PoppinsRegular'}
              color={R.color.blackShade2}
              align={messageType == 'to' ? 'right' : 'left'}
              transform={'none'}>
              {moment(item.createdAt).format('HH:mm a')}
            </Text>
          </View>

          {messageType === 'to' && (
            <View style={styles.userAvatar}>
              <Image customImage={R.image.userPin()} />
              <View style={styles.onlineStatus} />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : undefined}
      keyboardVerticalOffset={40}
      style={{flex: 1}}>
      {/* {isLoading || isFetching ? <AnimationLoader /> : null} */}
      <ChatHeader
        // name={
        //   chatType === 'one-to-one'
        //     ? `${chatWith?.userId?.firstName}  ${chatWith?.userId?.lastName}`
        //     : item?.title
        // }
        name={'Test'}
        // imageSource={{uri:R}}
        // isGroupChat={chatType !== 'one-to-one'}
      />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: R.color.white,
          flex: 1,
        }}>
        {messages.length > 0 ? (
          <FlatList
            listData={messages || []}
            // renderList={isLoading || isFetching ? null : _renderList}
            renderList={_renderList}
            pageNo={page}
            // isLoading={isLoading}
            // isFetching={isFetching}
            forwardRef={flatListRef}
            contentContainerStyles={{paddingBottom: 20}}
            onLayout={() => flatListRef.current.scrollToEnd()}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            emptyListHeading={'No message found'}
            emptyListText={'There are no new message available now'}
            refresh={data => {
              setPage(data);
            }}
            loadMore={updatedPage => setPage(updatedPage)}
          />
        ) : null}
      </ScrollView>
      <ChatFooter
        textChange={data => {
          setText(data);
        }}
        sendChat={sendChat}
      />
    </KeyboardAvoidingView>
  );
}
export default ChatScreen;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: R.color.white,
    marginVertical: R.unit.scale(10),
    borderRadius: R.unit.scale(5),
    shadowColor: '#e4a980',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.24,
    shadowRadius: 14.86,
    elevation: 16,
  },
  chatBox: {
    paddingHorizontal: R.unit.scale(12),
    paddingVertical: R.unit.scale(8),
    marginBottom: R.unit.scale(8),
    borderRadius: R.unit.scale(8),
    width: '85%',
  },
  formView: {
    marginTop: R.unit.scale(10),
    paddingHorizontal: R.unit.scale(10),
    width: '100%',
  },
  userAvatar: {
    width: R.unit.scale(50),
    height: R.unit.scale(50),
    borderRadius: R.unit.scale(40),
    borderColor: R.color.white,
    borderWidth: 1,
    alignSelf: 'flex-end',
  },
  onlineStatus: {
    width: R.unit.scale(10),
    height: R.unit.scale(10),
    position: 'absolute',
    right: 1,
    bottom: 0,
    borderRadius: R.unit.scale(20),
    borderWidth: R.unit.scale(1),
    borderColor: R.color.white,
  },
  messageRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  messageBox: {
    backgroundColor: R.color.primaryColor1,
    paddingHorizontal: R.unit.scale(16),
    borderTopRightRadius: R.unit.scale(10),
    borderTopLeftRadius: R.unit.scale(10),
    justifyContent: 'space-between',
    paddingVertical: R.unit.scale(2),
  },
});
