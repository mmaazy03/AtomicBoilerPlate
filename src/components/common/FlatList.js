import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList as FlatListC,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import R from '@components/utils/R';
import EmptyListError from '@components/common/EmptyListError';
import Loader from './Loader';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const FlatList = props => {
  const {
    containerStyles,
    contentContainerStyles,
    emptyContainerStyles,
    emptyListHeading,
    emptyListText,
    emptyListFooter = false,
    renderList,
    listData,
    isLoading,
    isFetching,
    pageNo: pageNumber,
    refresh,
    loadMore,
    deleteId,
    onDeleteSuccess,
    forwardRef,
    paddingBottom = Platform.OS === 'ios' ? 160 : 140,
    noOfColumns = 1,
    onEndReachedThreshold = 0.001,
    totalCount,
    nestedScrollEnabled = false,
  } = props;

  const scrollRef = useRef();

  const [refreshing, setRefreshing] = useState(false);
  const [footerLoader, setFooterLoader] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [pageNo, setPageNo] = useState(pageNumber);
  const [data, setData] = useState([]);

  useEffect(() => {
    setPageNo(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    if (deleteId) {
      setIsDeleted(true);
    } else {
      setIsDeleted(false);
    }
  }, [deleteId]);

  useEffect(() => {
    if (!isDeleted) {
      if (!pageNo || pageNo === 1) {
        setData(listData);
        setFooterLoader(false);
        setPageNo(1);
      } else if (pageNo > 1) {
        setFooterLoader(false);

        setData(prevState => [...prevState, ...listData]);
      }
      setFooterLoader(false);
    } else {
      let updatedArray = data?.filter(item => item?._id !== deleteId);
      setData(updatedArray);
      setIsDeleted(false);
      onDeleteSuccess && onDeleteSuccess(undefined);
    }
    // }
  }, [listData]);

  useEffect(() => {
    if (!isFetching) {
      setFooterLoader(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (footerLoader) {
      if (scrollRef) {
        scrollRef?.current?.scrollToEnd({animated: true});
      }
    }
  }, [footerLoader]);

  const emptyListComponent = () => {
    return (
      <View style={[R.styles.emptyContainer, emptyContainerStyles]}>
        <EmptyListError
          heading={emptyListHeading}
          text={emptyListText}
          isFooter={emptyListFooter}
        />
      </View>
    );
  };

  const keyExtractor = item => item._id;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refresh(1);
    wait(1000).then(() => setRefreshing(false));
    setPageNo(1);
    // setData([]);
  }, []);

  const loadMoreData = () => {
    if (!isFetching) {
      if (totalCount > data?.length) {
        setFooterLoader(true);
        let updatedPage = pageNo + 1;
        loadMore(updatedPage);
      }
    }
  };

  const footer = () => {
    return (
      footerLoader && (
        <View style={styles.footerContainer}>
          <Loader iosLoader={true} size={30} color={R.color.mainColor} />
        </View>
      )
    );
  };

  return (
    <FlatListC
      data={data || []}
      // style={{backgroundColor: 'red', flexGrow: 0}}
      style={[styles.flatListContainer, containerStyles]}
      contentContainerStyle={[
        styles.flatListContentContainer,
        contentContainerStyles,
        {
          paddingBottom: R.unit.scale(paddingBottom),
        },
      ]}
      nestedScrollEnabled={nestedScrollEnabled}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //     progressBackgroundColor={R.color.mainColor}
      //     colors={[R.color.white]}
      //     tintColor={Platform.OS === 'ios' ? R.color.mainColor : R.color.white}
      //   />
      // }
      ref={forwardRef}
      // getItemLayout={getItemLayout}
      renderItem={renderList}
      // nestedScrollEnabled
      numColumns={noOfColumns}
      // onEndReachedThreshold={onEndReachedThreshold}
      // removeClippedSubViews={true}
      // extraData={data}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      // ListEmptyComponent={!isLoading && emptyListComponent}
      fadingEdgeLength={12}
      ListFooterComponent={footer}
      onContentSizeChange={props.onContentSizeChange}
      onLayout={props.onLayout}
      // onEndReached={({distanceFromEnd}) => {
      //   if (Platform.OS === 'ios') {
      //     !isLoading && loadMoreData();
      //   } else {
      //     if (Math.round(distanceFromEnd * -1) === 0) {
      //       !isLoading && loadMoreData();
      //     }
      //   }
      // }}
    />
  );
};
export default FlatList;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingTop: R.unit.scale(10),
    height: R.unit.height(0.8),
    flexGrow: 0,
  },
  flatListContentContainer: {
    justifyContent: 'flex-start',
    flexGrow: 1,
    paddingHorizontal: R.unit.scale(5),
  },
  footerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: R.unit.height(Platform.OS === 'ios' ? 0.15 : 0.1),
  },
});
