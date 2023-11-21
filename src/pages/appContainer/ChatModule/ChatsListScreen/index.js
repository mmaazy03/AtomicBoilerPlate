import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import R from '@components/utils/R';
import SearchBar from '@components/common/SearchBar';
import FlatList from '@components/common/FlatList';
import Stagger from '@components/common/Stagger';
import FixedContainer from '@components/layout/FixedContainer';
import ScreenBoiler from '@components/layout/ScreenBoiler';
import MessagesCard from '@components/view/cards/MessagesCard';
import {chatsList} from '@components/constants';
import {useGetChatsListQuery, useChatSeenMutation} from '@store/services';
import debounce from '@components/utils/CustomHooks/debounce';

const ChatsListScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [chats, setChats] = useState(chatsList);
  const [deleted, setDeleted] = useState(undefined);

  const {data} = useGetChatsListQuery({
    page: page,
    search: debounce(text, 1500),
  });
  const [chatSeen] = useChatSeenMutation();

  const readChat = item => {
    // chatSeen()
    //   .unwrap()
    //   .then(res => res)
    //   .catch(err => err);

    const objectFound = chatsList.find(({_id}) => _id === item?._id);
    objectFound.isSeen = true;
    setChats([...chats]);
    navigation.navigate('Chat');
  };

  const _renderList = ({item, index}) => {
    return (
      <MessagesCard
        item={item}
        index={index}
        navigation={navigation}
        onPress={() => readChat(item)}
        onDelete={data => setDeleted(data)}
        data={chatsList}
      />
    );
  };

  const onPress = data => {};

  return (
    <ScreenBoiler mainHeading={t('chat')} isBack={false}>
      <Stagger onPress={onPress} />
      <FixedContainer>
        <View style={[R.styles.contentView, {paddingHorizontal: 0}]}>
          <SearchBar
            placeholder={'Search Users'}
            onChange={data => {
              setText(data);
            }}
            value={text}
            containerStyles={{paddingHorizontal: R.unit.scale(10)}}
          />

          <FlatList
            listData={chatsList}
            renderList={_renderList}
            totalCount={10}
            emptyListHeading={'Chat so empty :('}
            emptyListText={'There are no new users available now for chat'}
            containerStyles={{paddingTop: 0}}
            contentContainerStyles={{
              rowGap: R.unit.scale(1),
              paddingHorizontal: 0,
            }}
          />
        </View>
      </FixedContainer>
    </ScreenBoiler>
  );
};
export default ChatsListScreen;
