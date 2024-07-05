import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import R from '@components/utils/R';
import SearchBar from '@components/molecules/SearchBar';
import FlatList from '@components/organisms/FlatList';
import Stagger from '@components/molecules/Stagger';
import FixedContainer from '@components/templates/FixedContainer';
import ScreenBoiler from '@components/templates/ScreenBoiler';
import MessagesCard from '@components/templates/cards/MessagesCard';
import {chatsList} from '@components/constants';
import {useGetChatsListQuery, useChatSeenMutation} from '@store/services';
import debounce from '@components/utils/CustomHooks/debounce';
import {useTheme} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {switchTheme} from '@store/common/commonSlice';
import {TimerContext} from '../../../../../TimerContext';
import Text from '@components/atoms/Text';
import useTimer from '../../../../../useTimer';
import Button from '@components/atoms/Button';

const ChatsListScreen = props => {
  // console.log('Config', Config);
  const {navigation} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const common = useSelector(state => state.common);

  const [text, setText] = useState('');
  const [page, setPage] = useState(1);
  const [chats, setChats] = useState(chatsList);
  const [deleted, setDeleted] = useState(undefined);

  const {seconds, startTimer, stopTimer, resetTimer} =
    React.useContext(TimerContext);
  // const {seconds, start, stop, isRunning} = useTimer();

  // console.log('colors------', common.defaultTheme);

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

  const onPress = data => {
    dispatch(switchTheme(common.defaultTheme === 'light' ? 'dark' : 'light'));
  };

  const startTimerC = () => {
    startTimer();
  };

  const endTimeC = () => {
    stopTimer();
  };

  // const stopTimerRedux = () => {
  //   stop();
  // };

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

          <Text color={'black'} variant={'h2'}>
            {' '}
            TIMER : {seconds}
          </Text>

          <Button
            value="Resume Timer"
            bgColor={R.color.gray3}
            width={'45%'}
            size={'bsm'}
            color={R.color.white}
            gutterBottom={30}
            rippleColor={R.color.gray2}
            loaderColor={R.color.white}
            btnWrapperStyles={{alignSelf: 'flex-start'}}
            onPress={startTimerC}
            // onPress={stopTimerRedux}
          />
          <Button
            value="Pause Timer"
            bgColor={R.color.gray3}
            width={'45%'}
            size={'bsm'}
            color={R.color.white}
            gutterBottom={30}
            rippleColor={R.color.gray2}
            loaderColor={R.color.white}
            btnWrapperStyles={{alignSelf: 'flex-start'}}
            onPress={endTimeC}
            // onPress={stopTimerRedux}
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
