import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useGetChatsListQuery} from '@store/services';

import R from '@components/utils/R';
import Text from '@components/atoms/Text';
import FixedContainer from '@components/templates/FixedContainer';
import ScreenBoiler from '@components/templates/ScreenBoiler';
import SearchBar from '@components/molecules/SearchBar';
import FlatList from '@components/organisms/FlatList';
import {members} from '@components/constants';
import {TimerContext} from '../../../../TimerContext';
import Button from '@components/atoms/Button';
import useTimer from '../../../../useTimer';

const CoachesScreen = props => {
  const {navigation} = props;
  // console.log('TIMER', TimerContext);
  const {seconds, startTimer, stopTimer, resetTimer} =
    React.useContext(TimerContext);
  const {data, isLoading, isFetching} = useGetChatsListQuery();
  // const {seconds, start, stop, isRunning, reset} = useTimer();

  // console.log('isRunning', isRunning);

  const [text, setText] = useState('');

  console.log('COACHES');

  // const _renderList = ({item}) => {
  //   return <CoachCard item={item} isSendConnection />;
  // };

  const startTimerC = () => {
    startTimer();
  };

  const endTimeC = () => {
    stopTimer();
  };

  const resetTimeC = () => {
    resetTimer();
  };

  // const startTimerRedux = () => {
  //   start();
  // };

  // const endTimerRedux = () => {
  //   stop();
  // };

  // const resetTimerRedux = () => {
  //   reset();
  // };

  return (
    <ScreenBoiler isSubHeader mainHeading={'List'} isBack={false}>
      <FixedContainer>
        <View style={R.styles.contentView}>
          <Text color={'black'} variant={'h2'}>
            {' '}
            TIMER : {seconds}
          </Text>
          <SearchBar
            placeholder={'Search'}
            onChange={data => {
              setText(data);
            }}
            value={text}
          />

          <Button
            value="Start Timer"
            bgColor={R.color.gray3}
            width={'45%'}
            size={'bsm'}
            color={R.color.white}
            gutterBottom={30}
            rippleColor={R.color.gray2}
            loaderColor={R.color.white}
            btnWrapperStyles={{alignSelf: 'flex-start'}}
            onPress={startTimerC}
            // onPress={startTimerRedux}
          />
          <Button
            value="End Timer"
            bgColor={R.color.gray3}
            width={'45%'}
            size={'bsm'}
            color={R.color.white}
            rippleColor={R.color.gray2}
            loaderColor={R.color.white}
            btnWrapperStyles={{alignSelf: 'flex-start'}}
            onPress={endTimeC}
            // onPress={endTimerRedux}
          />

          <Button
            value="Reset Timer"
            bgColor={R.color.gray3}
            width={'45%'}
            size={'bsm'}
            color={R.color.white}
            rippleColor={R.color.gray2}
            loaderColor={R.color.white}
            btnWrapperStyles={{alignSelf: 'flex-start'}}
            onPress={resetTimeC}
            // onPress={resetTimerRedux}
          />

          {/* <SkeletonLoader /> */}

          {/* <FlatList
            listData={members}
            renderList={_renderList}
            totalCount={10}
            noOfColumns={2}
          /> */}
        </View>
      </FixedContainer>
    </ScreenBoiler>
  );
};

export default CoachesScreen;
