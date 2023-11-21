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

const CoachesScreen = props => {
  const {navigation} = props;

  const {data, isLoading, isFetching} = useGetChatsListQuery();

  const [text, setText] = useState('');

  // const _renderList = ({item}) => {
  //   return <CoachCard item={item} isSendConnection />;
  // };

  return (
    <ScreenBoiler isSubHeader mainHeading={'List'} isBack={false}>
      <FixedContainer>
        <View style={R.styles.contentView}>
          <SearchBar
            placeholder={'Search'}
            onChange={data => {
              setText(data);
            }}
            value={text}
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
