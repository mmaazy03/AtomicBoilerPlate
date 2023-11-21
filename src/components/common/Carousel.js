import React, {useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import R from '@components/utils/R';
import EmptyListError from './EmptyListError';

function Carousel(props) {
  const {
    data,
    scrollRef,
    renderItem,
    activeCarouselItem,
    pagingEnabled,
    paginationGap = 5,
    activeDotColor = R.color.primaryColor1,
    inActiveDotColor = R.color.gray3,
    activeDotSize = 7,
    inActiveDotSize = 4,
    renderItemWidth = 0.92,
    rowStyles,
    containerStyles,
    contentContainerStyles,
    emptyListHeading = 'There are no new upcoming events this month',
  } = props;

  const [activeItem, setActiveItem] = useState(0);

  const handleOnScroll = event => {
    let activeIndex = Math.ceil(
      event.nativeEvent.contentOffset.x / R.unit.width(renderItemWidth),
    );
    activeCarouselItem(activeIndex + 1);
    setActiveItem(activeIndex);
  };

  return (
    <>
      {data?.length === 0 && (
        <EmptyListError heading={emptyListHeading} isFooter={false} />
      )}
      <ScrollView
        style={[styles.horizontalScroll, containerStyles]}
        contentContainerStyle={[styles.scrollContent, contentContainerStyles]}
        horizontal={true}
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}>
        {data?.map((item, index) => {
          return (
            <View key={index}>
              {React.cloneElement(renderItem, {...item, index})}
            </View>
          );
        })}
      </ScrollView>

      {pagingEnabled && (
        <View
          style={{
            ...styles.paginationView,
            columnGap: R.unit.scale(paginationGap),
          }}>
          {data?.map((item, index) => {
            return (
              <View
                style={{
                  ...styles.dots,
                  backgroundColor:
                    activeItem === index ? activeDotColor : inActiveDotColor,
                  padding: R.unit.scale(
                    activeItem === index ? activeDotSize : inActiveDotSize,
                  ),
                }}
              />
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  horizontalScroll: {
    width: '100%',
    marginTop: R.unit.scale(16),
  },
  scrollContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    marginRight: R.unit.scale(80),
    paddingRight: R.unit.scale(5),
  },
  dots: {
    backgroundColor: R.color.mainColor,
    borderRadius: R.unit.scale(10),
    marginRight: R.unit.scale(2),
  },
  paginationView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: R.unit.scale(16),
  },
});

export default Carousel;
